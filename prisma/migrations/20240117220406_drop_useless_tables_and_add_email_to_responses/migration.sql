/*
  Warnings:

  - You are about to drop the `user_responses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_email` to the `responses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."user_responses" DROP CONSTRAINT "user_responses_form_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_responses" DROP CONSTRAINT "user_responses_response_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_responses" DROP CONSTRAINT "user_responses_user_profile_id_fkey";

-- AlterTable
ALTER TABLE "public"."responses" ADD COLUMN     "user_email" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."user_responses";
