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
ALTER TABLE "Story" ADD COLUMN     "cover_image_id" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar_id" INTEGER;

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
