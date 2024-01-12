/*
  Warnings:

  - You are about to drop the column `user_profilesId` on the `forms` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."forms" DROP CONSTRAINT "forms_user_profilesId_fkey";

-- AlterTable
ALTER TABLE "public"."forms" DROP COLUMN "user_profilesId";

-- CreateIndex
CREATE INDEX "forms_user_id_idx" ON "public"."forms"("user_id");
