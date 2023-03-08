-- CreateTable
CREATE TABLE "UserNostrKey" (
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'New Nostr PubKey',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,

    CONSTRAINT "UserNostrKey_pkey" PRIMARY KEY ("key")
);

-- AddForeignKey
ALTER TABLE "UserNostrKey" ADD CONSTRAINT "UserNostrKey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
