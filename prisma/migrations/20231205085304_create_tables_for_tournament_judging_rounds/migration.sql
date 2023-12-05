-- CreateTable
CREATE TABLE "TournamentJudgingRound" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tournament_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentJudgingRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentJudgingRoundProject" (
    "round_id" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentJudgingRoundProject_pkey" PRIMARY KEY ("round_id","project_id")
);

-- CreateTable
CREATE TABLE "TournamentJudgingRoundJudge" (
    "id" SERIAL NOT NULL,
    "round_id" TEXT NOT NULL,
    "judge_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentJudgingRoundJudge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentJudgingRoundJudgeScore" (
    "id" SERIAL NOT NULL,
    "round_id" TEXT NOT NULL,
    "judge_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "scores" JSONB NOT NULL,

    CONSTRAINT "TournamentJudgingRoundJudgeScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TournamentJudgingRoundJudge_round_id_judge_id_key" ON "TournamentJudgingRoundJudge"("round_id", "judge_id");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentJudgingRoundJudgeScore_round_id_judge_id_project__key" ON "TournamentJudgingRoundJudgeScore"("round_id", "judge_id", "project_id");

-- AddForeignKey
ALTER TABLE "TournamentJudgingRound" ADD CONSTRAINT "TournamentJudgingRound_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentJudgingRoundProject" ADD CONSTRAINT "TournamentJudgingRoundProject_round_id_fkey" FOREIGN KEY ("round_id") REFERENCES "TournamentJudgingRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentJudgingRoundProject" ADD CONSTRAINT "TournamentJudgingRoundProject_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentJudgingRoundJudge" ADD CONSTRAINT "TournamentJudgingRoundJudge_round_id_fkey" FOREIGN KEY ("round_id") REFERENCES "TournamentJudgingRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentJudgingRoundJudge" ADD CONSTRAINT "TournamentJudgingRoundJudge_judge_id_fkey" FOREIGN KEY ("judge_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentJudgingRoundJudgeScore" ADD CONSTRAINT "TournamentJudgingRoundJudgeScore_round_id_fkey" FOREIGN KEY ("round_id") REFERENCES "TournamentJudgingRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentJudgingRoundJudgeScore" ADD CONSTRAINT "TournamentJudgingRoundJudgeScore_judge_id_fkey" FOREIGN KEY ("judge_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentJudgingRoundJudgeScore" ADD CONSTRAINT "TournamentJudgingRoundJudgeScore_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
