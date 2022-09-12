/*
  Warnings:

  - A unique constraint covering the columns `[image_id]` on the table `Award` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cover_image_id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cover_image_id]` on the table `Hackathon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[thumbnail_image_id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cover_image_id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cover_image_id]` on the table `Story` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatar_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Award" ADD COLUMN     "image_id" INTEGER;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "cover_image_id" INTEGER;

-- AlterTable
ALTER TABLE "Hackathon" ADD COLUMN     "cover_image_id" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "cover_image_id" INTEGER,
ADD COLUMN     "screenshots_ids" INTEGER[],
ADD COLUMN     "thumbnail_image_id" INTEGER;

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "body_image_ids" INTEGER[],
ADD COLUMN     "cover_image_id" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Award_image_id_key" ON "Award"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_cover_image_id_key" ON "Category"("cover_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "Hackathon_cover_image_id_key" ON "Hackathon"("cover_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_thumbnail_image_id_key" ON "Project"("thumbnail_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_cover_image_id_key" ON "Project"("cover_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "Story_cover_image_id_key" ON "Story"("cover_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatar_id_key" ON "User"("avatar_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_cover_image_id_fkey" FOREIGN KEY ("cover_image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_thumbnail_image_id_fkey" FOREIGN KEY ("thumbnail_image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_cover_image_id_fkey" FOREIGN KEY ("cover_image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_cover_image_id_fkey" FOREIGN KEY ("cover_image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hackathon" ADD CONSTRAINT "Hackathon_cover_image_id_fkey" FOREIGN KEY ("cover_image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
