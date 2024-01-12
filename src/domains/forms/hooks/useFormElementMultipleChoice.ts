import {  Option, Question } from "@/backend/types/Form";
import { useState } from "react";
import { convertStringToSlug, isLabelValid } from "../utils";
import { useFormBuilderContext } from "../provider/FormBuilderProvider";

type UseFormElementMultipleChoice = {
  question: Question;
  inputAddRef: React.RefObject<HTMLInputElement>;
}
const useFormElementMultipleChoice = ({ question, inputAddRef}: UseFormElementMultipleChoice) => {
  const { handleOnQuestionChange } = useFormBuilderContext()
  const [editingOption, setEditingOption] = useState<Option | null>(null);
  const options = question?.question_options ?? [];
  

  const handleAddOption = () => {
    const currentLabel = inputAddRef.current?.value;
    if (
      typeof currentLabel === "string" &&
      isLabelValid({ currentLabel, options })
    ) {
      const option = {
        id: convertStringToSlug(currentLabel),
        label: currentLabel,
      };
      handleOnQuestionChange({
        question,
        option,
        action: "add",
      });
      inputAddRef.current!.value = "";
    }
  };

  const handleRemoveOption = (id: string) => {
    const option = options.find((option) => option.id === id);
    handleOnQuestionChange({
      question,
      option,
      action: "delete",
    });
  };

  const handleEditOption = (id: string) => {
    const option = options.find((option) => option.id === id);
    setEditingOption(option ?? null);
  };

  const handleUpdateOption = (newLabel: string) => {
    if (
      typeof newLabel === "string" &&
      isLabelValid({ currentLabel: newLabel, options })
    ) {
      const option = options.find((option) => option.id === editingOption?.id);
      handleOnQuestionChange({ question, action: "update",
        option: {
          ...option,
          label: newLabel,
        },
    });
    }
    setEditingOption(null);
  };

  return {
    options,
    editingOption,
    handleAddOption,
    handleRemoveOption,
    handleEditOption,
    handleUpdateOption,
  }
}

export { useFormElementMultipleChoice }