-- CreateTable
CREATE TABLE "public"."questions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "form_id" UUID NOT NULL,
    "element_type" "public"."form_element_type" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."question_options" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "question_id" UUID NOT NULL,

    CONSTRAINT "question_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."answer_options" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "question_id" UUID NOT NULL,
    "question_option_id" UUID NOT NULL,
    "form_id" UUID NOT NULL,
    "response_id" UUID NOT NULL,

    CONSTRAINT "answer_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."answer_texts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "question_id" UUID NOT NULL,
    "form_id" UUID NOT NULL,
    "response_id" UUID NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "answer_texts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."responses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "form_id" UUID NOT NULL,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."response_by_questions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "question_id" UUID NOT NULL,
    "response_id" UUID NOT NULL,
    "form_id" UUID NOT NULL,

    CONSTRAINT "response_by_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_responses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "form_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "response_id" UUID NOT NULL,

    CONSTRAINT "user_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "questions_form_id_idx" ON "public"."questions"("form_id");

-- CreateIndex
CREATE INDEX "question_options_question_id_idx" ON "public"."question_options"("question_id");

-- CreateIndex
CREATE INDEX "answer_options_question_option_id_idx" ON "public"."answer_options"("question_option_id");

-- CreateIndex
CREATE INDEX "answer_options_question_id_idx" ON "public"."answer_options"("question_id");

-- CreateIndex
CREATE INDEX "answer_options_form_id_idx" ON "public"."answer_options"("form_id");

-- CreateIndex
CREATE INDEX "answer_options_response_id_idx" ON "public"."answer_options"("response_id");

-- CreateIndex
CREATE INDEX "answer_texts_question_id_idx" ON "public"."answer_texts"("question_id");

-- CreateIndex
CREATE INDEX "answer_texts_form_id_idx" ON "public"."answer_texts"("form_id");

-- CreateIndex
CREATE INDEX "answer_texts_response_id_idx" ON "public"."answer_texts"("response_id");

-- CreateIndex
CREATE INDEX "responses_form_id_idx" ON "public"."responses"("form_id");

-- CreateIndex
CREATE INDEX "response_by_questions_response_id_idx" ON "public"."response_by_questions"("response_id");

-- CreateIndex
CREATE INDEX "response_by_questions_question_id_idx" ON "public"."response_by_questions"("question_id");

-- CreateIndex
CREATE INDEX "response_by_questions_form_id_idx" ON "public"."response_by_questions"("form_id");

-- CreateIndex
CREATE INDEX "user_responses_form_id_idx" ON "public"."user_responses"("form_id");

-- CreateIndex
CREATE INDEX "user_responses_user_id_idx" ON "public"."user_responses"("user_id");

-- CreateIndex
CREATE INDEX "user_responses_response_id_idx" ON "public"."user_responses"("response_id");

-- AddForeignKey
ALTER TABLE "public"."questions" ADD CONSTRAINT "questions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."question_options" ADD CONSTRAINT "question_options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."answer_options" ADD CONSTRAINT "answer_options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."answer_options" ADD CONSTRAINT "answer_options_question_option_id_fkey" FOREIGN KEY ("question_option_id") REFERENCES "public"."question_options"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."answer_options" ADD CONSTRAINT "answer_options_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."answer_options" ADD CONSTRAINT "answer_options_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "public"."responses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."answer_texts" ADD CONSTRAINT "answer_texts_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."answer_texts" ADD CONSTRAINT "answer_texts_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."answer_texts" ADD CONSTRAINT "answer_texts_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "public"."responses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."responses" ADD CONSTRAINT "responses_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."response_by_questions" ADD CONSTRAINT "response_by_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."response_by_questions" ADD CONSTRAINT "response_by_questions_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "public"."responses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."response_by_questions" ADD CONSTRAINT "response_by_questions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."user_responses" ADD CONSTRAINT "user_responses_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."user_responses" ADD CONSTRAINT "user_responses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."user_responses" ADD CONSTRAINT "user_responses_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "public"."responses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
