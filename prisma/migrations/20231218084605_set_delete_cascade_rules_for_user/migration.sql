-- DropForeignKey
ALTER TABLE "FoundersClubMember" DROP CONSTRAINT "FoundersClubMember_user_id_fkey";

-- DropForeignKey
ALTER TABLE "NostrBadgeRequest" DROP CONSTRAINT "NostrBadgeRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "TournamentJudgingRoundJudge" DROP CONSTRAINT "TournamentJudgingRoundJudge_judge_id_fkey";

-- DropForeignKey
ALTER TABLE "TournamentJudgingRoundJudgeScore" DROP CONSTRAINT "TournamentJudgingRoundJudgeScore_judge_id_fkey";

-- DropForeignKey
ALTER TABLE "TournamentOrganizer" DROP CONSTRAINT "TournamentOrganizer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TournamentParticipant" DROP CONSTRAINT "TournamentParticipant_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAction" DROP CONSTRAINT "UserAction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserBadge" DROP CONSTRAINT "UserBadge_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserBadgeProgress" DROP CONSTRAINT "UserBadgeProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserEmail" DROP CONSTRAINT "UserEmail_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserKey" DROP CONSTRAINT "UserKey_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserNostrKey" DROP CONSTRAINT "UserNostrKey_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnWorkRoles" DROP CONSTRAINT "UsersOnWorkRoles_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserKey" ADD CONSTRAINT "UserKey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNostrKey" ADD CONSTRAINT "UserNostrKey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEmail" ADD CONSTRAINT "UserEmail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnWorkRoles" ADD CONSTRAINT "UsersOnWorkRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentParticipant" ADD CONSTRAINT "TournamentParticipant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundersClubMember" ADD CONSTRAINT "FoundersClubMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadgeProgress" ADD CONSTRAINT "UserBadgeProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NostrBadgeRequest" ADD CONSTRAINT "NostrBadgeRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentJudgingRoundJudge" ADD CONSTRAINT "TournamentJudgingRoundJudge_judge_id_fkey" FOREIGN KEY ("judge_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentJudgingRoundJudgeScore" ADD CONSTRAINT "TournamentJudgingRoundJudgeScore_judge_id_fkey" FOREIGN KEY ("judge_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentOrganizer" ADD CONSTRAINT "TournamentOrganizer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
