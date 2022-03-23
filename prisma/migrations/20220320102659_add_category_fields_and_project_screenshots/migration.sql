-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "cover_image" TEXT,
ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "screenshots" TEXT[];

-- CreateTable
CREATE TABLE "Award" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
