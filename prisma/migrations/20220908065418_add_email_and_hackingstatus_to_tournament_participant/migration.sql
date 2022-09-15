/*
  Warnings:

  - Added the required column `email` to the `TournamentParticipant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hacking_status` to the `TournamentParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TournamentParticipant" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hacking_status" INTEGER NOT NULL;
