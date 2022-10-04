-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "project_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
