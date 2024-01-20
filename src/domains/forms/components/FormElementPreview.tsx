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
import { IndividualResponse } from "@/backend/types/Responses";
import { useCallback, useMemo } from "react";

type FormElementPreviewProps = {
  question:
    | Question
    | IndividualResponse["response"]["form"]["questions"][number];
  answerOptions?: IndividualResponse["answer_options"];
  answerTexts?: IndividualResponse["answer_texts"];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  getFieldState?: UseFormGetFieldState<FieldValues>;
  isResponse?: boolean;
};

const FormElementPreview = ({
  question,
  answerOptions,
  answerTexts,
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
  } = question;

  const getTextResponse = useMemo(() => {
    return (
      answerTexts?.find(({ question_id }) => question_id === questionId)
        ?.answer ?? ""
    );
  }, [answerTexts, questionId]);

  const isOptionChecked = useCallback(
    (optionId: string) => {
      return !!answerOptions?.find(
        ({ question_id, question_option_id }) =>
          question_id === questionId && question_option_id === optionId
      );
    },
    [answerOptions, questionId]
  );

  const getOptionDefaultChecked = useMemo(() => {
    return question_options?.find(({ id }) => isOptionChecked(id))?.id ?? "";
  }, [question_options, isOptionChecked]);

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium">{title}</h2>
        <span className="text-sm text-gray-500">
          {required ? "(*)" : "(Optional)"}
        </span>
      </div>
      <div className="grid gap-2">
        {isResponse && (element_type === "long_text" || "short_text") ? (
          <span>{getTextResponse}</span>
        ) : null}

        {element_type === "short_text" && !isResponse ? (
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
        ) : null}

        {element_type === "long_text" && !isResponse ? (
          <Textarea
            defaultValue={getTextResponse}
            {...register(questionId, {
              required: {
                value: required,
                message: "This field is required",
              },
            })}
          />
        ) : null}

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
                  {...(isResponse
                    ? {
                        checked: getOptionDefaultChecked === id,
                      }
                    : undefined)}
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
                  checked={isResponse ? isOptionChecked(id) : undefined}
                  {...register(`${questionId}`, {
                    required: {
                      value: required,
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
