import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormQuestionType } from "./FormQuestionType";
import { FormQuestionInput } from "./FormQuestionInput";

import { QuestionItem } from "../containers/DynamicForm";
import { Trash } from "lucide-react";

type FormQuestionProps = {
  question: QuestionItem;
  onChange: (question: Partial<QuestionItem>) => void;
  onDelete: () => void;
};

const FormQuestion = ({ question, onChange, onDelete }: FormQuestionProps) => {
  const { questionType } = question;
  return (
    <Card className="relative">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>
          <Input
            type="text"
            placeholder="Question"
            name="question"
            value={question.question}
            onChange={(e) => {
              onChange({
                ...question,
                question: e.target.value,
              });
            }}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 items-start justify-between">
        <FormQuestionInput question={question} onChange={onChange} />
        <FormQuestionType
          value={questionType}
          onChange={(value) =>
            onChange({
              ...question,
              questionType: value,
            })
          }
        />
      </CardContent>
      <Trash
        className="w-8 h-8 cursor-pointer absolute right-[-10px] top-[-10px] bg-red-600 rounded-full text-white p-2"
        onClick={onDelete}
      />
    </Card>
  );
};

export { FormQuestion };
