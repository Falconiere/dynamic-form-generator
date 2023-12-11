import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormElementQuestionType } from "./FormElementQuestionType";
import { FormElementQuestionInput } from "./FormElementQuestionInput";

import { GripHorizontal, Trash } from "lucide-react";
import { FormElement } from "@/server/types/Form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import { DraggableChildrenFn } from "react-beautiful-dnd";
import { useFormBuilderContext } from "../provider/FormBuilderProvider";

type FormElementQuestionProps = {
  question: FormElement;
  onChange: (question: FormElement) => void;
  onDelete: () => void;
  canDelete?: boolean;
  dragHandleProps?: DraggableChildrenFn;
  draggableProps?: DraggableChildrenFn;
};

const FormElementQuestion = forwardRef<
  HTMLDivElement,
  FormElementQuestionProps
>(
  (
    { question, onChange, onDelete, canDelete, draggableProps, ...rest },
    ref
  ) => {
    const { errors } = useFormBuilderContext();
    const { element_type } = question;
    return (
      <Card className="relative pt-8" ref={ref} {...rest}>
        <CardContent className="grid gap-2">
          <span {...draggableProps}>
            <GripHorizontal className="w-8 h-8 cursor-move absolute left-[-10px] top-[-10px] bg-gray-200 rounded-full text-gray-600 p-2" />
          </span>
          <div className="flex w-full">
            <div className="grid w-full pr-4 gap-2">
              <Input
                type="text"
                placeholder="Question"
                name="question"
                value={question.question_text}
                onChange={(e) => {
                  onChange({
                    ...question,
                    question_text: e.target.value,
                  });
                }}
                error={errors?.[question.id]}
              />
              <FormElementQuestionInput
                question={question}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-2 border-l-[1px] h-full px-4">
              <FormElementQuestionType
                value={element_type}
                onChange={(value) =>
                  onChange({
                    ...question,
                    element_type: value,
                  })
                }
              />
              <div className="flex items-center gap-2">
                <Switch
                  id={question.id + "required"}
                  checked={question.is_required}
                  title="Required"
                  onCheckedChange={() => {
                    onChange({
                      ...question,
                      is_required: !question.is_required,
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
  }
);
FormElementQuestion.displayName = "FormElementQuestion";

export { FormElementQuestion };
