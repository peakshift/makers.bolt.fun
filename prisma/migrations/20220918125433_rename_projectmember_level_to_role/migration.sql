/*
  Warnings:

  - You are about to drop the column `level` on the `ProjectMember` table. All the data in the column will be lost.
  - Added the required column `role` to the `ProjectMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectMember" DROP COLUMN "level",
ADD COLUMN     "role" TEXT NOT NULL;
