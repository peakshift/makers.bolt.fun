-- AlterTable
ALTER TABLE "TournamentProject" ADD COLUMN     "track_id" INTEGER;

-- CreateTable
CREATE TABLE "TournamentTrack" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "tournament_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentTrack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TournamentTrack" ADD CONSTRAINT "TournamentTrack_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentProject" ADD CONSTRAINT "TournamentProject_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "TournamentTrack"("id") ON DELETE SET NULL ON UPDATE CASCADE;
