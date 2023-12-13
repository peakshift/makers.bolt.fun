-- AlterTable
ALTER TABLE "TournamentJudgingRound" ADD COLUMN     "scores_schema" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "TournamentJudgingRoundJudgeScore" ADD COLUMN     "internal_note" TEXT;
