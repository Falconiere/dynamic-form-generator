import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "@/backend/types/Form";
import {
  FieldErrors,
  FieldValues,
  UseFormGetFieldState,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

type FormElementPreviewProps = {
  formElement: Question;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  getFieldState?: UseFormGetFieldState<FieldValues>;
  isResponse?: boolean;
};

const FormElementPreview = ({
  formElement,
  register,
  errors,
  setValue,
  isResponse,
}: FormElementPreviewProps) => {
  const {
    element_type,
    required,
    title,
    question_options = [],
    id: questionId,
  } = formElement;

  const getTextResponse = () => {
    const response = formElement?.answer_texts?.find(
      ({ question_id }) => question_id === questionId
    )?.answer;

    return response?.length ? response : "-";
  };
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium">{title}</h2>
        <span className="text-sm text-gray-500">
          {required ? "(*)" : "(Optional)"}
        </span>
      </div>
      <div className="grid gap-2">
        {element_type === "short_text" && (
          <>
            {!isResponse ? (
              <Input
                type="text"
                {...register(questionId, {
                  required: {
                    value: required,
                    message: "This field is required",
                  },
                })}
                error={errors?.[questionId]?.message?.toString()}
              />
            ) : (
              getTextResponse()
            )}
          </>
        )}
        {element_type === "long_text" && (
          <>
            {!isResponse ? (
              <Textarea
                defaultValue={
                  formElement?.answer_texts?.find(
                    ({ question_id }) => question_id === questionId
                  )?.answer
                }
                {...register(questionId, {
                  required: {
                    value: required,
                    message: "This field is required",
                  },
                })}
              />
            ) : (
              getTextResponse()
            )}
          </>
        )}
        {element_type === "multiple_choice_radio" && (
          <RadioGroup
            className="grid gap-2"
            {...register(questionId, {
              required: {
                value: required,
                message: "This field is required",
              },
            })}
            onValueChange={(value) => setValue?.(questionId, value)}
          >
            {question_options?.map(({ id, label }) => (
              <div
                key={id}
                className="grid grid-cols-[max-content,auto] items-center gap-2"
              >
                <RadioGroupItem
                  value={id as string}
                  id={id}
                  checked={
                    !!formElement?.answer_options?.find(
                      ({ question_id, question_option_id }) =>
                        question_id === questionId && question_option_id === id
                    )
                  }
                  aria-readonly={isResponse}
                />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
            <span className="text-red-500">
              {errors?.[questionId]?.message?.toString()}
            </span>
          </RadioGroup>
        )}
        {element_type === "multiple_choice_checkbox" && (
          <div className="grid gap-2">
            {question_options?.map(({ id, label }) => (
              <div
                key={id}
                className="grid grid-cols-[max-content,auto] items-center gap-2"
              >
                <input
                  type="checkbox"
                  id={id}
                  value={id}
                  checked={
                    !!formElement?.answer_options?.find(
                      ({ question_id, question_option_id }) =>
                        question_id === questionId && question_option_id === id
                    )
                  }
                  {...register(`${questionId}`, {
                    required: {
                      value: required,
                      message: "This field is required",
                    },
                  })}
                  readOnly={isResponse}
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
