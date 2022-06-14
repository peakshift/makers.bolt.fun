/*
  Warnings:

  - You are about to drop the column `topic_id` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `topic_id` on the `Story` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "topic_id";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "topic_id";
