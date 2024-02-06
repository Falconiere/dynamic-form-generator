"use client";
import { Form } from "@/backend/types/Form";
import { FormElementPreview } from "../components/FormElementPreview";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { convertAnswers } from "../utils/convertAnswers";
import { clientApi } from "@/clientApi";
import { IndividualResponse } from "@/backend/types/Responses";
import { FormFinalMessageDialog } from "../components/FormFinalMessageDialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type FormPreviewProps = {
  form?: Form;
  individualResponse?: IndividualResponse;
  isResponse?: boolean;
};

const FormPreview = ({
  form,
  individualResponse,
  isResponse,
}: FormPreviewProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getFieldState,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      if (!form?.id) return;
      const user_email = data.email;
      const answers = convertAnswers({
        questions: form.questions ?? [],
        data,
      });
      const response = await clientApi.answers.create({
        form_id: form.id,
        user_email,
        answers,
      });
      if (!response.success) {
        throw new Error("Something went wrong");
      }
      setIsModalOpen(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    }
  });

  const questions =
    form?.questions ?? individualResponse?.response?.form?.questions ?? [];
  const answerOptions = individualResponse?.answer_options ?? [];
  const answerTexts = individualResponse?.answer_texts ?? [];

  return (
    <>
      <div className="grid gap-4 rounded-md">
        <div className="bg-white p-4">
          {!isResponse ? (
            <Input
              label="Email (*)"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid",
                },
              })}
              error={
                typeof errors?.email?.message === "string"
                  ? errors?.email?.message
                  : undefined
              }
            />
          ) : (
            <p>
              <strong>Answers from:</strong>{" "}
              {individualResponse?.response?.user_email}
            </p>
          )}
        </div>
        {!isResponse ? (
          <div className="bg-white p-4">
            <h1 className="text-4xl font-medium">{form?.title}</h1>
            <p className="text-gray-600 text-lg">{form?.description}</p>
          </div>
        ) : null}
        <div className="bg-white p-4 rounded-md grid gap-4">
          {questions.map((question) => (
            <FormElementPreview
              key={question.id}
              question={question}
              register={register}
              setValue={setValue}
              getFieldState={getFieldState}
              errors={errors}
              isResponse={isResponse}
              answerOptions={answerOptions}
              answerTexts={answerTexts}
            />
          ))}
        </div>
        {!isResponse ? (
          <Button className="w-full" onClick={onSubmit} disabled={isSubmitting}>
            {!isSubmitting ? "Submit" : "Submitting..."}
          </Button>
        ) : null}
      </div>
      <FormFinalMessageDialog
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      />
    </>
  );
};

export { FormPreview };
