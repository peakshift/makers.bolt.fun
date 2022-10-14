-- CreateIndex
CREATE INDEX "HostedImage_provider_image_id_idx" ON "HostedImage" USING HASH ("provider_image_id");

-- CreateIndex
CREATE INDEX "Project_hashtag_idx" ON "Project" USING HASH ("hashtag");
