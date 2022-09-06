-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "cover_image_id" INTEGER,
ADD COLUMN     "screenshots_ids" INTEGER[],
ADD COLUMN     "thumbnail_image_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_thumbnail_image_id_fkey" FOREIGN KEY ("thumbnail_image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_cover_image_id_fkey" FOREIGN KEY ("cover_image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
