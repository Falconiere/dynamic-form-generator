-- CreateEnum
CREATE TYPE "public"."langs" AS ENUM ('en', 'pt');

-- AlterTable
ALTER TABLE "public"."user_profiles" ADD COLUMN     "lang" "public"."langs" DEFAULT 'en';
