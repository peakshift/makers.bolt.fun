/*
  Warnings:

  - You are about to drop the column `github` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "github",
DROP COLUMN "website";

-- CreateTable
CREATE TABLE "TagLink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tag_id" INTEGER,

    CONSTRAINT "TagLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TagLink" ADD CONSTRAINT "TagLink_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
