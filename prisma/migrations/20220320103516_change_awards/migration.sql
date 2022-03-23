/*
  Warnings:

  - You are about to drop the column `cover_image` on the `Award` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Award` table. All the data in the column will be lost.
  - Added the required column `image` to the `Award` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Award` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Award" DROP COLUMN "cover_image",
DROP COLUMN "icon",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
