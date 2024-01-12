-- DropForeignKey
ALTER TABLE "public"."forms" DROP CONSTRAINT "forms_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."forms" ADD COLUMN     "user_profilesId" UUID;

-- AddForeignKey
ALTER TABLE "public"."forms" ADD CONSTRAINT "forms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."forms" ADD CONSTRAINT "forms_user_profilesId_fkey" FOREIGN KEY ("user_profilesId") REFERENCES "public"."user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
