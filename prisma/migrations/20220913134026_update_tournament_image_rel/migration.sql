/*
  Warnings:

  - A unique constraint covering the columns `[thumbnail_image_id]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cover_image_id]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[image_id]` on the table `TournamentEvent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatar_id]` on the table `TournamentJudge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[image_id]` on the table `TournamentPrize` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "cover_image_id" INTEGER,
ADD COLUMN     "thumbnail_image_id" INTEGER;

-- AlterTable
ALTER TABLE "TournamentEvent" ADD COLUMN     "image_id" INTEGER;

-- AlterTable
ALTER TABLE "TournamentJudge" ADD COLUMN     "avatar_id" INTEGER;

-- AlterTable
ALTER TABLE "TournamentPrize" ADD COLUMN     "image_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_thumbnail_image_id_key" ON "Tournament"("thumbnail_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_cover_image_id_key" ON "Tournament"("cover_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentEvent_image_id_key" ON "TournamentEvent"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentJudge_avatar_id_key" ON "TournamentJudge"("avatar_id");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentPrize_image_id_key" ON "TournamentPrize"("image_id");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_thumbnail_image_id_fkey" FOREIGN KEY ("thumbnail_image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_cover_image_id_fkey" FOREIGN KEY ("cover_image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentPrize" ADD CONSTRAINT "TournamentPrize_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentJudge" ADD CONSTRAINT "TournamentJudge_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentEvent" ADD CONSTRAINT "TournamentEvent_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
