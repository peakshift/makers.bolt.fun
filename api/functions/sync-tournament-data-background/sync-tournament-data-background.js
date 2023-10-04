const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const CONSTS = require("../../utils/consts");
const { prisma } = require("../../prisma");
const cacheService = require("../../services/cache.service");
const { verifyWebhookSignature } = require("@hygraph/utils");
const { default: axios } = require("axios");
const env = require("../../utils/consts");
const { async } = require("q");

const syncTournamentData = async (req, res) => {
  const body = req.body;
  const signature = req.headers["gcms-signature"];

  const secret = CONSTS.HYGRAPH_WEBHOOKS_SECRET;

  if (!secret) return res.status(500).send("Hygraph Webhooks Secret not set");

  const isValid = verifyWebhookSignature({ body, signature, secret });

  if (!isValid) return res.status(401).send("Unauthorized Access");

  // make sure it's the update operation on the Tournament Model
  if (body.operation !== "publish" || body.data.__typename !== "Tournament")
    return res
      .status(400)
      .send(
        "__typename has to be 'Tournament' & operation has to be 'publish'"
      );

  const currentTournamentData = await prisma.tournament.findFirst({
    where: {
      slug: body.data.slug,
    },
    include: {
      cover_image_rel: true,
      thumbnail_image_rel: true,
      judges: true,
      events: true,
      faqs: true,
      tracks: true,
    },
  });

  if (!currentTournamentData) {
    return res.status(404).send("Tournament not found");
  }

  try {
    const cleanupJobs = [];

    // extract new data from req.body
    const { title, description, start_date, end_date, location, website } =
      body.data;

    // create assets map
    const assets_ids = extractAssetIds(body.data);
    const assets = await requestAssetsData(assets_ids);
    const assetsMap = assets.reduce((acc, asset) => {
      acc[asset.id] = asset;
      return acc;
    }, {});

    // create hosted images map
    const providerIdToHostedImageMap = await prisma.hostedImage
      .findMany({
        where: {
          provider_image_id: {
            in: assets_ids,
          },
        },
      })
      .then((images) => {
        return images.reduce((acc, image) => {
          acc[image.provider_image_id] = image;
          return acc;
        }, {});
      });

    const assetsToBeCreated = assets_ids
      .filter((id) => {
        return !providerIdToHostedImageMap[id];
      })
      .map((id) => {
        return {
          provider_image_id: id,
          url: assetsMap[id].url,
          filename: "default.png",
          provider: "external",
          is_used: true,
        };
      });

    await prisma.hostedImage
      .createMany({
        data: assetsToBeCreated,
      })
      .then(async () => {
        const newlyCreatedHostedImages = await prisma.hostedImage.findMany({
          where: {
            provider_image_id: {
              in: assetsToBeCreated.map((image) => image.provider_image_id),
            },
          },
        });

        newlyCreatedHostedImages.forEach((image) => {
          providerIdToHostedImageMap[image.provider_image_id] = image;
        });
      });

    const config = {
      registerationOpen: body.data.config?.registerationOpen ?? false,
      projectsSubmissionOpen: body.data.config?.projectsSubmissionOpen ?? false,
      ideasRootNostrEventId: body.data.config?.ideasRootNostrEventId,
      showFeed: body.data.config?.showFeed,
      mainFeedHashtag: body.data.config?.mainFeedHashtag,
      feedFilters: body.data.config?.feedFilters ?? [],
    };

    const contacts = body.data.contacts?.map((contact) => ({
      type: contact.type,
      url: contact.url,
    }));

    const scheduleMap = body.data.schedule
      ?.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
        return timeA - timeB;
      })
      .reduce((acc, entry) => {
        const date = new Date(entry.time);
        const day = new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
        }).format(date);

        if (!acc[day]) {
          acc[day] = [];
        }

        acc[day].push(entry);

        return acc;
      }, {});

    const schedule = Object.keys(scheduleMap).map((key) => ({
      date: key,
      events: scheduleMap[key].map((event) => ({
        title: event.title,
        time: event.time,
        timezone: event.timezone,
        type: event.type,
        location: event.location,
        url: event.url,
      })),
    }));

    const partners = body.data.partnersList?.map((list) => ({
      title: list.title, // e.g. "Sponsors"
      items: list.items.map((item) => ({
        title: item.title,
        image: assetsMap[item.image.id].url,
        url: item.url,
        isBigImage: item.isBigImage,
      })),
    }));

    const makers_deals = body.data.makersDeals?.map((deal) => ({
      title: deal.title,
      description: deal.description,
      url: deal.url,
    }));

    // const prizes = body.data.prizes.map((prize) => ({
    //   title: prize.title,
    //   description: prize.description,
    //   image: prize.image,
    //   positions: prize.positions.map((position) => ({
    //     position: position.position,
    //     reward: position.reward,
    //     project: position.project, // optional
    //   })),
    //   additional_prizes: prize.additional_prizes.map((additional_prize) => ({
    //     text: additional_prize.text,
    //     url: additional_prize.url,
    //   })),
    // }));

    let updatedCoverImage = undefined;

    if (body.data.cover_image?.id)
      updatedCoverImage = providerIdToHostedImageMap[body.data.cover_image.id];

    let updatedThumbnailImage = undefined;

    if (body.data.thumbnail_image?.id)
      updatedThumbnailImage =
        providerIdToHostedImageMap[body.data.thumbnail_image.id];

    const { id } = await prisma.tournament.update({
      where: {
        slug: body.data.slug,
      },
      data: {
        title,
        description,
        cover_image_rel: updatedCoverImage
          ? {
              connect: {
                id: updatedCoverImage.id,
              },
            }
          : undefined,
        thumbnail_image_rel: updatedThumbnailImage
          ? {
              connect: {
                id: updatedThumbnailImage.id,
              },
            }
          : undefined,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        // location,
        // website,
        judges: {
          deleteMany: {},
          createMany: {
            data: body.data.judges.map((j) => ({
              name: j.name,
              avatar: providerIdToHostedImageMap[j.avatar.id].url,
              avatar_id: providerIdToHostedImageMap[j.avatar.id].id,
              twitter: j.twitter,
              company: j.company,
            })),
          },
        },
        events: {
          createMany: {
            data: body.data.events.map((e) => ({
              title: e.title,
              description: e.description,
              starts_at: e.starts_at,
              ends_at: e.ends_at,
              location: e.location,
              website: e.website,
              type: e.type,
              image: providerIdToHostedImageMap[e.image.id].url,
              image_rel: {
                connect: {
                  id: providerIdToHostedImageMap[e.image.id].id,
                },
              },
            })),
          },
        },
        config,
        schedule,
        contacts,
        partners,
        makers_deals,
        // prizes,
      },
    });

    cleanupJobs.push(cacheService.invalidateTournamentById(id));

    // do any post-cleanup
    await Promise.all(cleanupJobs);

    return res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/sync-tournament-data-background", syncTournamentData);
} else {
  const router = express.Router();
  router.post("/sync-tournament-data-background", syncTournamentData);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};

function extractAssetIds(data) {
  const assetIds = [];

  function traverse(obj) {
    if (obj && typeof obj === "object") {
      if (Array.isArray(obj)) {
        obj.forEach((item) => traverse(item));
      } else if (obj.__typename === "Asset" && obj.id) {
        assetIds.push(obj.id);
      } else {
        for (const key in obj) {
          traverse(obj[key]);
        }
      }
    }
  }

  traverse(data);

  return assetIds;
}

function requestAssetsData(assets_ids) {
  const query = `
  query MyQuery {
    assets(
      where: { id_in: [${assets_ids.map((id) => `"${id}"`).join(", ")}] }
    ) {
      url(transformation: { document: { output: { format: jpg } } })
      id
      mimeType
    }
  }
`;

  return axios
    .post(env.HYGRAPH_READ_API, {
      query: query,
    })
    .then((response) => response.data.data.assets)
    .catch((error) => {
      console.error(error);
    });
}
