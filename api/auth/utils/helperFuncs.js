const { prisma } = require("../../prisma");
const jose = require("jose");
const { JWT_SECRET } = require("../../utils/consts");
const env = require("../../utils/consts");
const { generatePrivateKey, getPublicKey } = require("../../utils/nostr-tools");

const getUserByPubKey = (pubKey) => {
  if (!pubKey) return null;
  return prisma.userKey
    .findUnique({
      where: {
        key: pubKey,
      },
    })
    .user();
};

const getUserById = (id) => {
  if (!id) return null;
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const generateAuthToken = (userId, userPubkey) => {
  const hour = 3600000;
  const maxAge = 30 * 24 * hour;

  return (
    new jose.SignJWT({ pubKey: userPubkey, userId })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(maxAge)
      //TODO: Set audience, issuer
      .sign(Buffer.from(JWT_SECRET, "utf-8"))
  );
};

const getAuthCookieConfig = () => {
  const cookieConfig = env.FUNCTIONS_URL.startsWith(
    "https://master--boltfun.netlify.app"
  )
    ? {
        maxAge: 3600000 * 24 * 30,
        secure: true,
        httpOnly: true,
        domain: `.bolt.fun`,
      }
    : {
        maxAge: 3600000 * 24 * 30,
        secure: true,
        httpOnly: true,
        sameSite: "none",
      };
  return cookieConfig;
};

const createNewUser = async (pubKey) => {
  const nostr_prv_key = generatePrivateKey();
  const nostr_pub_key = getPublicKey(nostr_prv_key);

  const seed = pubKey ?? nostr_pub_key;

  const avatar = await prisma.hostedImage.create({
    data: {
      filename: "avatar.svg",
      provider: "external",
      is_used: true,
      url: `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`,
      provider_image_id: "",
    },
  });

  return prisma.user.create({
    data: {
      pubKey: pubKey,
      name: seed,
      avatar_id: avatar.id,
      nostr_prv_key,
      nostr_pub_key,
      userNostrKeys: {
        create: {
          key: nostr_pub_key,
          is_default_generated_key: true,
        },
      },
    },
    select: {
      id: true,
    },
  });
};

module.exports = {
  getUserByPubKey,
  getUserById,
  generateAuthToken,
  getAuthCookieConfig,
  createNewUser,
};
