import { prisma } from "../../prisma";

const getUserByPubKey = async (pubKey: string) => {
  if (!pubKey) return null;
  const userKey = await prisma.userKey.findUnique({
    where: {
      key: pubKey,
    },
    select: {
      user: true,
    },
  });
  return userKey?.user ?? null;
};

const getUserById = async (id?: number | null) => {
  if (!id) return null;
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      userKeys: true,
    },
  });
};

export { getUserByPubKey, getUserById };
