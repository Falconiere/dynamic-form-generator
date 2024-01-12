-- AlterTable
ALTER TABLE "public"."questions" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
