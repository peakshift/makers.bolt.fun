/*
  Warnings:

  - You are about to drop the column `isProcessed` on the `UserAction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAction" DROP COLUMN "isProcessed",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
