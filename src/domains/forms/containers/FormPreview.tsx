"use client";
import { Form } from "@/server/types/Form";
import { FormElementPreview } from "../components/FormElementPreview";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { dbSaveResponse } from "@/server/utils/db";

type FormPreviewProps = {
  form?: Form;
};
const FormPreview = ({ form }: FormPreviewProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getFieldState,
  } = useForm();
  const onSubmit = handleSubmit(async (data: any) => {
    if (!form?.id) return;
    const answers = Object.entries(data).map(([key, value]) => ({
      question_id: key,
      response: { value },
    }));
    console.log({ answers });
    await dbSaveResponse({
      form_id: form.id,
      answers,
    });
  });
  return (
    <div className="grid gap-4 sm:p-8 p-2 rounded-md">
      <div className="bg-white p-4">
        <h1 className="text-4xl font-medium">{form?.title}</h1>
        <p className="text-gray-600 text-lg">{form?.description}</p>
      </div>
      <div className="bg-white p-4 rounded-md grid gap-4">
        {form?.questions.map((element) => (
          <FormElementPreview
            key={element.id}
            formElement={element}
            register={register}
            setValue={setValue}
            getFieldState={getFieldState}
            errors={errors}
          />
        ))}
      </div>
      <Button className="w-full" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export { FormPreview };
