-- CreateTable
CREATE TABLE "TournamentOrganizer" (
    "tournament_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentOrganizer_pkey" PRIMARY KEY ("tournament_id","user_id")
);

-- AddForeignKey
ALTER TABLE "TournamentOrganizer" ADD CONSTRAINT "TournamentOrganizer_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentOrganizer" ADD CONSTRAINT "TournamentOrganizer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
