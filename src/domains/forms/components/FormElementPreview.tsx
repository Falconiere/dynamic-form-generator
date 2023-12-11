import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FormElement } from "@/server/types/Form";
import {
  FieldErrors,
  FieldValues,
  UseFormGetFieldState,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

type FormElementPreviewProps = {
  formElement: FormElement;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  getFieldState?: UseFormGetFieldState<FieldValues>;
};

const FormElementPreview = ({
  formElement,
  register,
  errors,
  setValue,
}: FormElementPreviewProps) => {
  const {
    element_type,
    is_required,
    question_text,
    options = [],
    id: questionId,
  } = formElement;
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium">{question_text}</h2>
        <span className="text-sm text-gray-500">
          {is_required ? "(*)" : "(Optional)"}
        </span>
      </div>
      <div className="grid gap-2">
        {element_type === "short-text" && (
          <Input
            type="text"
            {...register(questionId, {
              required: {
                value: is_required,
                message: "This field is required",
              },
            })}
            error={errors?.[questionId]?.message?.toString()}
          />
        )}
        {element_type === "large-text" && (
          <Textarea
            {...register(questionId, {
              required: {
                value: is_required,
                message: "This field is required",
              },
            })}
          />
        )}
        {element_type === "multiple-choice" && (
          <RadioGroup
            className="grid gap-2"
            {...register(questionId, {
              required: {
                value: is_required,
                message: "This field is required",
              },
            })}
            onValueChange={(value) => setValue?.(questionId, value)}
          >
            {options?.map(({ id, label }) => (
              <div
                key={id}
                className="grid grid-cols-[max-content,auto] items-center gap-2"
              >
                <RadioGroupItem value={id} id={id} />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
            <span className="text-red-500">
              {errors?.[questionId]?.message?.toString()}
            </span>
          </RadioGroup>
        )}
        {element_type === "checkboxes" && (
          <div className="grid gap-2">
            {options?.map(({ id, label }) => (
              <div
                key={id}
                className="grid grid-cols-[max-content,auto] items-center gap-2"
              >
                <input
                  type="checkbox"
                  id={id}
                  value={id}
                  {...register(`${questionId}`, {
                    required: {
                      value: is_required,
                      message: "This field is required",
                    },
                  })}
                />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
            <span className="text-red-500">
              {errors?.[questionId]?.message?.toString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export { FormElementPreview };
