"use client";
import { Form } from "@/backend/types/Form";
import { FormElementPreview } from "../components/FormElementPreview";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { convertAnswers } from "../utils/convertAnswers";
import { clientApi } from "@/clientApi";

type FormPreviewProps = {
  form?: Form;
  isResponse?: boolean;
};

const FormPreview = ({ form, isResponse }: FormPreviewProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getFieldState,
  } = useForm();

  const onSubmit = handleSubmit(async (data: any) => {
    if (!form?.id) return;

    const answers = convertAnswers({
      questions: form.questions ?? [],
      data,
    });

    const response = await clientApi.answers.create({
      form_id: form.id,
      answers,
    });
    console.log({ response });
    // const isAnswered = await isFormAnswered({
    //   formId: form.id,
    //   email: data.email,
    // });
  });

  const questions = form?.questions ?? [];

  return (
    <div className="grid gap-4 rounded-md">
      <div className="bg-white p-4">
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
      </div>
      <div className="bg-white p-4">
        <h1 className="text-4xl font-medium">{form?.title}</h1>
        <p className="text-gray-600 text-lg">{form?.description}</p>
      </div>
      <div className="bg-white p-4 rounded-md grid gap-4">
        {questions
          .sort((a, b) => a.order - b.order)
          .map((element) => (
            <FormElementPreview
              key={element.id}
              formElement={element}
              register={register}
              setValue={setValue}
              getFieldState={getFieldState}
              errors={errors}
              isResponse={isResponse}
            />
          ))}
      </div>
      {!isResponse ? (
        <Button className="w-full" onClick={onSubmit} disabled={isSubmitting}>
          {!isSubmitting ? "Submit" : "Submitting..."}
        </Button>
      ) : null}
    </div>
  );
};

export { FormPreview };
