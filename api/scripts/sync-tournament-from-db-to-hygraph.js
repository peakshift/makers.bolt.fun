const axios = require("axios");
const { prisma } = require("../prisma");

if (
  !process.env.HYGRAPH_CONTENT_API ||
  !process.env.HYGRAPH_MIGRATIONS_API_KEY
) {
  console.log(
    "Please set HYGRAPH_CONTENT_API and HYGRAPH_MIGRATIONS_API_KEY environment variables."
  );
  process.exit(1);
}

const mutation = `
mutation MyMutation(
  $slug: String = ""
  $title: String = ""
  $start_date: Date = "2023-11-01T00:00:00Z"
  $end_date: Date = "2023-11-01T00:00:00Z"
  $description: String = ""
  $thumbnail_image: AssetUpdateOneInlineInput = { connect: { id: "" } }
  $cover_image: AssetUpdateOneInlineInput = { connect: { id: "" } }
  $config: TournamentConfigUpdateOneInlineInput = {
    create: {
      registerationOpen: false
      mainFeedHashtag: ""
      projectsSubmissionOpen: false
      showFeed: false
    }
  }
  $events: TournamenteventsUnionUpdateManyInlineInput = {
    create: [
      {
        TournamentEvent: {
          data: {
            title: ""
            description: ""
            starts_at: "2023-11-01T00:00:00Z"
            ends_at: "2023-11-01T00:00:00Z"
            location: ""
            website: ""
            type: TwitterSpace
            image: {}
          }
        }
      }
    ]
  }
  $faqs: TournamentfaqsUnionUpdateManyInlineInput = {
    create: [{ Faq: { data: { question: "", answer: "" } } }]
  }
  $judges: TournamentjudgesUnionUpdateManyInlineInput = {
    create: [
      {
        Judge: {
          data: {
            name: ""
            shortBio: ""
            twitter: ""
            company: ""
            avatar: { connect: { id: "" } }
          }
        }
      }
    ]
  }
  $makersDeals: TournamentmakersDealsUnionUpdateManyInlineInput = {
    create: [{ MakersDeal: { data: { title: "", description: "", url: "" } } }]
  }
  $partnersList: TournamentpartnersListUnionUpdateManyInlineInput = {
    create: [
      {
        PartnersList: {
          data: {
            title: ""
            items: {
              create: { Partner: { title: "", isBigImage: false, url: "" } }
            }
          }
        }
      }
    ]
  }
  $schedule: TournamentscheduleUnionUpdateManyInlineInput = {
    create: [
      {
        ScheduleItem: {
          data: {
            title: ""
            time: "2023-11-01T00:00:00Z"
            location: Youtube
            timezone: UTC
            type: Hangout
            url: ""
          }
        }
      }
    ]
  }
) {
  updateTournament(
    data: {
      title: $title
      start_date: $start_date
      end_date: $end_date
      description: $description
      thumbnail_image: $thumbnail_image
      cover_image: $cover_image
      config: $config
      events: $events
      faqs: $faqs
      judges: $judges
      makersDeals: $makersDeals
      partnersList: $partnersList
      schedule: $schedule
    }
    where: { slug: $slug }
  ){
    id
  }
}`;

const clearRelationsMutation = `
mutation MyMutation(
    $slug: String = ""
    $config: TournamentConfigUpdateOneInlineInput  
    $events: TournamenteventsUnionUpdateManyInlineInput
    $faqs: TournamentfaqsUnionUpdateManyInlineInput
    $judges: TournamentjudgesUnionUpdateManyInlineInput
    $makersDeals: TournamentmakersDealsUnionUpdateManyInlineInput
    $partnersList: TournamentpartnersListUnionUpdateManyInlineInput
    $schedule: TournamentscheduleUnionUpdateManyInlineInput)
    {
        updateTournament(
            data: {
              config: $config
              events: $events
              faqs: $faqs
              judges: $judges
              makersDeals: $makersDeals
              partnersList: $partnersList
              schedule: $schedule
            }
            where: { slug: $slug }
          ){
            id
          } 
    }
`;

// Create a function to make the Axios request
async function updateTournamentMutation(variables, _mutation = mutation) {
  try {
    const response = await axios.post(
      process.env.HYGRAPH_CONTENT_API, // Replace with your GraphQL API endpoint
      {
        query: _mutation,
        variables: variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HYGRAPH_MIGRATIONS_API_KEY}`,
        },
      }
    );

    // Handle the response here
    console.log("GraphQL Response:", response.data);

    // Return the response data or handle it as needed
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error("GraphQL Error:", error);
    throw error;
  }
}

async function run() {
  const tournamentData = await prisma.tournament.findUniqueOrThrow({
    where: {
      slug: "legends-of-lightning-vol2",
    },
    include: {
      cover_image_rel: true,
      thumbnail_image_rel: true,
      events: {
        include: {
          image_rel: true,
        },
      },
      faqs: true,
      judges: {
        include: {
          avatar_rel: true,
        },
      },
    },
  });

  const clearOldRelationsMutationVariables = {
    slug: tournamentData.slug,
    config: {
      delete: true,
    },
    events: {
      delete: [],
    },
    faqs: {
      delete: [],
    },
    judges: {
      delete: [],
    },
    partnersList: {
      delete: [],
    },
    makersDeals: {
      delete: [],
    },
    schedule: {
      delete: [],
    },
  };

  //   await updateTournamentMutation(
  //     clearOldRelationsMutationVariables,
  //     clearRelationsMutation
  //   );

  const uploadedImages = {};

  const setUploadedImages = (key) => (value) => {
    if (key in uploadedImages) {
      uploadedImages[key].push(value);
    } else {
      uploadedImages[key] = [value];
    }
  };

  await Promise.all([
    uploadImageAssetToHygraph(tournamentData.cover_image_rel.url).then(
      setUploadedImages("cover_image")
    ),
    uploadImageAssetToHygraph(tournamentData.thumbnail_image_rel.url).then(
      setUploadedImages("thumbnail_image")
    ),
    ...tournamentData.events.map((event) =>
      uploadImageAssetToHygraph(event.image_rel.url).then(
        setUploadedImages("events")
      )
    ),
    ...tournamentData.judges.map((judge) =>
      uploadImageAssetToHygraph(judge.avatar_rel.url).then(
        setUploadedImages("judges")
      )
    ),
    ...(tournamentData.partners?.flatMap((partnersList) =>
      partnersList.items.map((partner) =>
        uploadImageAssetToHygraph(partner.image).then((img) => {
          if ("partners" in uploadedImages === false)
            uploadedImages.partners = {};

          uploadedImages.partners[partner.url] = img;
        })
      )
    ) ?? []),
  ]);

  const mutationVariables = {
    slug: tournamentData.slug,
    title: tournamentData.title,
    start_date: tournamentData.start_date,
    end_date: tournamentData.end_date,
    description: tournamentData.description,
    thumbnail_image: {
      connect: { id: uploadedImages.thumbnail_image[0].id },
    },
    cover_image: {
      connect: { id: uploadedImages.cover_image[0].id },
    },
    config: {
      create: {
        registerationOpen: tournamentData.config.registerationOpen ?? false,
        mainFeedHashtag: tournamentData.config.mainFeedHashtag ?? "",
        projectsSubmissionOpen:
          tournamentData.config.projectsSubmissionOpen ?? false,
        showFeed: tournamentData.config.showFeed ?? false,
      },
    },
    events: {
      create: tournamentData.events.map((event, idx) => {
        return {
          TournamentEvent: {
            data: {
              title: event.title,
              description: event.description,
              starts_at: event.starts_at,
              ends_at: event.ends_at,
              location: event.location,
              website: event.website,
              type: Object.entries(TournamentEventTypeEnum).find(
                (e) => e[1] === event.type
              )[0],
              image: { connect: { id: uploadedImages.events[idx].id } },
            },
          },
        };
      }),
    },
    faqs: {
      create: tournamentData.faqs.map((faq) => {
        return {
          Faq: {
            data: {
              question: faq.question,
              answer: faq.answer,
            },
          },
        };
      }),
    },
    judges: {
      create: tournamentData.judges.map((judge, idx) => {
        return {
          Judge: {
            data: {
              name: judge.name,
              shortBio: judge.shortBio,
              twitter: judge.twitter,
              company: judge.company,
              avatar: { connect: { id: uploadedImages.judges[idx].id } },
            },
          },
        };
      }),
    },
    partnersList: {
      create:
        tournamentData.partners?.map((partnersList) => {
          return {
            PartnersList: {
              data: {
                title: partnersList.title,
                items: {
                  create: partnersList.items.map((partner) => {
                    return {
                      Partner: {
                        title: partner.title ?? "",
                        isBigImage: partner.isBigImage,
                        url: partner.url,
                        image: {
                          connect: {
                            id: uploadedImages.partners[partner.url].id,
                          },
                        },
                      },
                    };
                  }),
                },
              },
            },
          };
        }) ?? [],
    },
    makersDeals: {
      create:
        tournamentData.makers_deals?.map((makersDeal) => {
          return {
            MakersDeal: {
              data: {
                title: makersDeal.title,
                description: makersDeal.description,
                url: makersDeal.url,
              },
            },
          };
        }) ?? [],
    },
    schedule: {
      create:
        tournamentData.schedule
          ?.flatMap((i) => i.events)
          .map((scheduleItem) => {
            return {
              ScheduleItem: {
                data: {
                  title: scheduleItem.title,
                  time: scheduleItem.time,
                  location: scheduleItem.location,
                  timezone: scheduleItem.timezone,
                  type: scheduleItem.type,
                  url: scheduleItem.url,
                },
              },
            };
          }) ?? [],
    },
  };

  await updateTournamentMutation(mutationVariables);
}

run();

async function uploadImageAssetToHygraph(imgUrl) {
  if (!imgUrl) {
    return null;
  }

  return axios
    .post(
      `${process.env.HYGRAPH_CONTENT_API}/upload`,
      `url=${encodeURIComponent(imgUrl)}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${process.env.HYGRAPH_MIGRATIONS_API_KEY}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log("ERROR Uploading image to Hygraph. Image URL: ", imgUrl);
      return {
        filename: "600x400",
        mimetype: "image/svg+xml",
        size: 3273,
        width: 0,
        height: 0,
        url: "https://media.graphassets.com/UiVvjrgMRPK0NYiJ29hR",
        id: "clnbrg08s2ffc0bw33zkiw6cz",
      }; // default image
    });
}

const TournamentEventTypeEnum = {
  TwitterSpace: 0,
  Workshop: 1,
  IRLMeetup: 2,
  OnlineMeetup: 3,
};
