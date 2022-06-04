-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'user',
ADD COLUMN     "twitter" TEXT;
