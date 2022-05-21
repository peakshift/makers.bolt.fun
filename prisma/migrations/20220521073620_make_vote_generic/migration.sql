/*
  Warnings:

  - You are about to drop the column `project_id` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `item_id` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_type` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_project_id_fkey";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "project_id",
ADD COLUMN     "item_id" INTEGER NOT NULL,
ADD COLUMN     "item_type" TEXT NOT NULL;
