-- CreateTable
CREATE TABLE "UserActionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserActionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAction" (
    "id" SERIAL NOT NULL,
    "actionTypeId" INTEGER NOT NULL,
    "actionPayload" JSONB NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isProcessed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "badgeDefinitionNostrEventId" TEXT,
    "incrementsNeeded" INTEGER NOT NULL DEFAULT 1,
    "incrementOnActionId" INTEGER,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadgeProgress" (
    "badgeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserBadgeProgress_pkey" PRIMARY KEY ("userId","badgeId")
);

-- CreateTable
CREATE TABLE "UserBadge" (
    "badgeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "badgeAwardNostrEventId" TEXT,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("userId","badgeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserActionType_name_key" ON "UserActionType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_slug_key" ON "Badge"("slug");

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_actionTypeId_fkey" FOREIGN KEY ("actionTypeId") REFERENCES "UserActionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_incrementOnActionId_fkey" FOREIGN KEY ("incrementOnActionId") REFERENCES "UserActionType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadgeProgress" ADD CONSTRAINT "UserBadgeProgress_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadgeProgress" ADD CONSTRAINT "UserBadgeProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
