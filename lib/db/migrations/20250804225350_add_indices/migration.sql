-- CreateIndex
CREATE INDEX "Account_number_idx" ON "Account"("number");

-- CreateIndex
CREATE INDEX "Chat_user_id_idx" ON "Chat"("user_id");

-- CreateIndex
CREATE INDEX "Message_chat_id_idx" ON "Message"("chat_id");

-- CreateIndex
CREATE INDEX "Message_user_id_idx" ON "Message"("user_id");

-- CreateIndex
CREATE INDEX "Stream_chat_id_idx" ON "Stream"("chat_id");
