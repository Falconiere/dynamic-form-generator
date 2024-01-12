import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormElementQuestionType } from "./FormElementQuestionType";
import { FormElementQuestionInput } from "./FormElementQuestionInput";

import { GripHorizontal, Trash } from "lucide-react";
import { Question } from "@/server/types/Form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { useFormBuilderContext } from "../provider/FormBuilderProvider";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
type FormElementQuestionProps = {
  question: Question;
  onChange: (question: Question) => void;
  onDelete: () => void;
  canDelete?: boolean;
};

const FormElementQuestion = ({
  question,
  onChange,
  onDelete,
  canDelete,
  ...rest
}: FormElementQuestionProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { errors, handleOnQuestionChange } = useFormBuilderContext();
  const { element_type } = question;
  return (
    <Card className="relative pt-8" ref={setNodeRef} {...rest} style={style}>
      <CardContent className="grid gap-2">
        <span {...listeners} {...attributes}>
          <GripHorizontal className="w-8 h-8 cursor-move absolute left-[-10px] top-[-10px] bg-gray-200 rounded-full text-gray-600 p-2" />
        </span>
        <div className="flex w-full">
          <div className="grid w-full pr-4 gap-2">
            <Input
              type="text"
              placeholder="Question"
              name="question"
              value={question.title}
              onChange={(e) => {
                handleOnQuestionChange({
                  question: {
                    ...question,
                    title: e.target.value,
                  },
                });
              }}
              error={errors?.[question.id]}
            />
            <FormElementQuestionInput question={question} />
          </div>
          <div className="flex flex-col gap-2 border-l-[1px] h-full px-4">
            <FormElementQuestionType
              value={element_type}
              onChange={(value) =>
                handleOnQuestionChange({
                  question: {
                    ...question,
                    element_type: value,
                  },
                })
              }
            />
            <div className="flex items-center gap-2">
              <Switch
                id={question.id + "required"}
                checked={question.required}
                title="Required"
                onCheckedChange={() => {
                  handleOnQuestionChange({
                    question: {
                      ...question,
                      required: !question.required,
                    },
                  });
                }}
              />
              <Label htmlFor={question.id + "required"}>Required</Label>
            </div>
          </div>
        </div>
      </CardContent>
      {canDelete ? (
        <Trash
          className="w-8 h-8 cursor-pointer absolute right-[-10px] top-[-10px] bg-red-600 rounded-full text-white p-2"
          onClick={onDelete}
        />
      ) : null}
    </Card>
  );
};
FormElementQuestion.displayName = "FormElementQuestion";

export { FormElementQuestion };
