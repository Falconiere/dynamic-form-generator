"use client";
import { FormHeader } from "../components/FormHeader";
import { useMemo, useState } from "react";
import { FormQuestion } from "../components/FormQuestion";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { Form, FormElement } from "@/server/types/Form";
import { useFormBuilder } from "../hooks/useFormBuilder";
import { FormDraggableArea } from "../components/FormDraggableArea";

type FormBuilderProps = {
  form?: Form;
};

const FormBuilder = ({ form }: FormBuilderProps) => {
  const { handleOnSubmit } = useFormBuilder();
  const [{ title, description, questions }, setForm] = useState<Form>(
    form ?? {
      title: "",
      description: "",
      questions: [
        {
          id: uuidv4(),
          elementType: "short-text",
          question: "",
        },
      ],
    }
  );
  const payload = useMemo(
    () => ({
      ...form,
      title,
      description,
      questions,
    }),
    [form, title, description, questions]
  );

  const handleQuestionChange = (question: Partial<FormElement>) => {
    const index = questions.findIndex((q) => q.id === question.id);
    const newQuestions = [...questions];
    newQuestions[index] = question as FormElement;
    setForm((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleOnDelete = (id: string) => {
    const index = questions.findIndex((q) => q.id === id);
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setForm((prev) => ({ ...prev, questions: newQuestions }));
  };

  return (
    <div className="grid gap-4">
      <h1 className="text-4xl font-medium">{form ? "Edit" : "Create"} form</h1>
      <FormHeader
        value={{
          title,
          description,
        }}
        onChange={(value) => {
          setForm((prev) => ({ ...prev, ...value }));
        }}
      />
      <div className="grid gap-4">
        {questions?.map((question) => (
          <FormQuestion
            key={question.id}
            onChange={handleQuestionChange}
            question={question}
            onDelete={() => handleOnDelete(question.id)}
            canDelete={questions.length > 1}
          />
        ))}
      </div>
      <FormDraggableArea
        onDropped={(elementType) => {
          const question: FormElement = {
            id: uuidv4(),
            elementType,
            question: "",
          };
          setForm((prev) => ({
            ...prev,
            questions: [...prev.questions, question],
          }));
        }}
      />
      <Button
        onClick={() => handleOnSubmit(payload)}
        type="button"
        variant="secondary"
      >
        Save
      </Button>
    </div>
  );
};

export { FormBuilder };
