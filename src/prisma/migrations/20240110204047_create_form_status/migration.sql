-- CreateEnum
CREATE TYPE "public"."form_status" AS ENUM ('draft', 'published', 'archived');

-- AlterTable
ALTER TABLE "public"."forms" ADD COLUMN     "status" "public"."form_status" NOT NULL DEFAULT 'draft';
