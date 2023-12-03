"use client";

import { FormHeader } from "../components/FormHeader";
import { useState } from "react";
import { FormQuestion } from "../components/FormQuestion";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { MultipleOption, QuestionType } from "@/server/types/DynamicForm";
import { http } from "@/lib/http";

// questions i want to have in this version of the form:
// - question
// - question type [text, multiple choice, checkbox]
// - question options

type QuestionItem = {
  id: string;
  questionType: QuestionType;
  question: string;
  text?: string;
  options?: MultipleOption;
};

type Form = {
  id?: string;
  title: string;
  description: string;
  questions: QuestionItem[];
};

type DynamicFormProps = {
  form?: Form;
};
const DynamicForm = ({ form }: DynamicFormProps) => {
  const [{ title, description, questions }, setForm] = useState<Form>(
    form ?? {
      title: "",
      description: "",
      questions: [],
    }
  );
  const handleAddQuestion = () => {
    const question: QuestionItem = {
      id: uuidv4(),
      questionType: "text",
      question: "",
    };
    setForm((prev) => ({ ...prev, questions: [...prev.questions, question] }));
  };

  const handleQuestionChange = (question: Partial<QuestionItem>) => {
    const index = questions.findIndex((q) => q.id === question.id);
    const newQuestions = [...questions];
    newQuestions[index] = question as QuestionItem;
    setForm((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleOnDelete = (id: string) => {
    const index = questions.findIndex((q) => q.id === id);
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setForm((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleSubmit = async () => {
    if (questions.length === 0) {
      return;
    }

    if (form?.id) {
      await http.patch(`/api/forms/${form.id}`, form);
      return;
    }
    await http.post("/api/forms", form);
  };

  return (
    <div className="grid gap-4">
      <FormHeader
        value={{
          title,
          description,
        }}
        onChange={(value) => {
          setForm((prev) => ({ ...prev, ...value }));
        }}
      />
      {questions?.map((question) => (
        <FormQuestion
          key={question.id}
          onChange={handleQuestionChange}
          question={question}
          onDelete={() => handleOnDelete(question.id)}
        />
      ))}
      <div>
        <Button onClick={handleAddQuestion} type="button">
          Add question
        </Button>
        <Button onClick={handleSubmit} type="button">
          Save
        </Button>
      </div>
    </div>
  );
};

export type { QuestionItem };
export { DynamicForm };
