/*
  Warnings:

  - A unique constraint covering the columns `[form_id,user_email]` on the table `responses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "responses_form_id_user_email_key" ON "public"."responses"("form_id", "user_email");
