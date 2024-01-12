/*
  Warnings:

  - You are about to drop the column `user_id` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_responses` table. All the data in the column will be lost.
  - Added the required column `user_profile_id` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_profile_id` to the `user_responses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."forms" DROP CONSTRAINT "forms_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_responses" DROP CONSTRAINT "user_responses_user_id_fkey";

-- DropIndex
DROP INDEX "public"."forms_user_id_idx";

-- DropIndex
DROP INDEX "public"."user_responses_user_id_idx";

-- AlterTable
ALTER TABLE "public"."forms" DROP COLUMN "user_id",
ADD COLUMN     "user_profile_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."user_responses" DROP COLUMN "user_id",
ADD COLUMN     "user_profile_id" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "forms_user_profile_id_idx" ON "public"."forms"("user_profile_id");

-- CreateIndex
CREATE INDEX "user_responses_user_profile_id_idx" ON "public"."user_responses"("user_profile_id");

-- AddForeignKey
ALTER TABLE "public"."forms" ADD CONSTRAINT "forms_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."user_responses" ADD CONSTRAINT "user_responses_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
