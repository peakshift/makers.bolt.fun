-- CreateTable
CREATE TABLE "TournamentIdea" (
    "tournament_id" INTEGER NOT NULL,
    "story_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentIdea_pkey" PRIMARY KEY ("tournament_id","story_id")
);

-- AddForeignKey
ALTER TABLE "TournamentIdea" ADD CONSTRAINT "TournamentIdea_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentIdea" ADD CONSTRAINT "TournamentIdea_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
