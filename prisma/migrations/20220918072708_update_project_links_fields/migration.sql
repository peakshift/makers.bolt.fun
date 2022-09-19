/*
  Warnings:

  - You are about to drop the column `is_official` on the `Capability` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Capability" DROP COLUMN "is_official";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "slack" TEXT,
ADD COLUMN     "telegram" TEXT,
ALTER COLUMN "discord" DROP NOT NULL,
ALTER COLUMN "discord" DROP DEFAULT,
ALTER COLUMN "github" DROP NOT NULL,
ALTER COLUMN "github" DROP DEFAULT,
ALTER COLUMN "twitter" DROP NOT NULL,
ALTER COLUMN "twitter" DROP DEFAULT;
