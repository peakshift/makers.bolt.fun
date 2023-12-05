-- CreateTable
CREATE TABLE "NostrBadgeRequest" (
    "id" SERIAL NOT NULL,
    "badgeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "publicKeyToAward" TEXT NOT NULL,
    "isFullfilled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NostrBadgeRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NostrBadgeRequest_userId_badgeId_key" ON "NostrBadgeRequest"("userId", "badgeId");

-- AddForeignKey
ALTER TABLE "NostrBadgeRequest" ADD CONSTRAINT "NostrBadgeRequest_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NostrBadgeRequest" ADD CONSTRAINT "NostrBadgeRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
