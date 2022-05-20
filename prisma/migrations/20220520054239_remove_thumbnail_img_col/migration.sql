/*
  Warnings:

  - You are about to drop the column `date` on the `Hackathon` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_image` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_image` on the `Story` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `Hackathon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Hackathon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hackathon" DROP COLUMN "date",
ADD COLUMN     "end_date" DATE NOT NULL,
ADD COLUMN     "start_date" DATE NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "thumbnail_image";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "thumbnail_image";
