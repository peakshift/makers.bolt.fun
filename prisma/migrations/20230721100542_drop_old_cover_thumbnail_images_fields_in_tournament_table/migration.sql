/*
  Warnings:

  - You are about to drop the column `cover_image` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_image` on the `Tournament` table. All the data in the column will be lost.
  - Made the column `slug` on table `Tournament` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "cover_image",
DROP COLUMN "thumbnail_image",
ALTER COLUMN "slug" SET NOT NULL;
