/*
  Warnings:

  - You are about to drop the `TournamentPrize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TournamentPrize" DROP CONSTRAINT "TournamentPrize_image_id_fkey";

-- DropForeignKey
ALTER TABLE "TournamentPrize" DROP CONSTRAINT "TournamentPrize_tournament_id_fkey";

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "prizes" JSONB;

-- DropTable
DROP TABLE "TournamentPrize";
