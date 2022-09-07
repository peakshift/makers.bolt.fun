-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail_image" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "location" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "votes_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentPrize" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tournament_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentPrize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentJudge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "twitter" TEXT,
    "tournament_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentJudge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentFAQ" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "tournament_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentEvent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "location" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "tournament_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentParticipant" (
    "tournament_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentParticipant_pkey" PRIMARY KEY ("tournament_id","user_id")
);

-- CreateTable
CREATE TABLE "TournamentProject" (
    "tournament_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentProject_pkey" PRIMARY KEY ("tournament_id","project_id")
);

-- AddForeignKey
ALTER TABLE "TournamentPrize" ADD CONSTRAINT "TournamentPrize_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentJudge" ADD CONSTRAINT "TournamentJudge_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentFAQ" ADD CONSTRAINT "TournamentFAQ_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentEvent" ADD CONSTRAINT "TournamentEvent_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentParticipant" ADD CONSTRAINT "TournamentParticipant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentParticipant" ADD CONSTRAINT "TournamentParticipant_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentProject" ADD CONSTRAINT "TournamentProject_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentProject" ADD CONSTRAINT "TournamentProject_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
