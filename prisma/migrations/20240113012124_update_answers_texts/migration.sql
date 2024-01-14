/*
  Warnings:

  - You are about to drop the column `description` on the `answer_texts` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `answer_texts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."answer_texts" DROP COLUMN "description",
DROP COLUMN "label",
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
