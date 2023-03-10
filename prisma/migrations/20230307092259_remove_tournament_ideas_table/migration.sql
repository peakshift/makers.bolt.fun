/*
  Warnings:

  - You are about to drop the `TournamentIdea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TournamentIdea" DROP CONSTRAINT "TournamentIdea_story_id_fkey";

-- DropForeignKey
ALTER TABLE "TournamentIdea" DROP CONSTRAINT "TournamentIdea_tournament_id_fkey";

-- DropTable
DROP TABLE "TournamentIdea";
