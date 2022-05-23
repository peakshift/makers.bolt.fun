/*
  Warnings:

  - Added the required column `excerpt` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `excerpt` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "excerpt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "excerpt" TEXT NOT NULL;
