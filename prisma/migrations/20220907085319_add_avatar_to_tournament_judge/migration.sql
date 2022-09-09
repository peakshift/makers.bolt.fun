/*
  Warnings:

  - Added the required column `avatar` to the `TournamentJudge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TournamentJudge" ADD COLUMN     "avatar" TEXT NOT NULL;
