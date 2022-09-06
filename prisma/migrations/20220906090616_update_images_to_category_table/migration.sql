-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "cover_image_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_cover_image_id_fkey" FOREIGN KEY ("cover_image_id") REFERENCES "HostedImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
