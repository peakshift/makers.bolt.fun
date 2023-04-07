-- CreateTable
CREATE TABLE "FoundersClubInvitation" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoundersClubInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoundersClubMember" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "FoundersClubMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoundersClubMember_user_id_key" ON "FoundersClubMember"("user_id");

-- AddForeignKey
ALTER TABLE "FoundersClubMember" ADD CONSTRAINT "FoundersClubMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
