import { FormElement, Option } from "@/server/types/Form";
import { useState } from "react";
import { convertStringToSlug, isLabelValid } from "../utils";
import { useFormBuilderContext } from "../provider/FormBuilderProvider";

type UseFormElementMultipleChoice = {
  question: FormElement;
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
      const questionUpdate = {
        ...question,
        question_options: [...options, option],
      };
      handleOnQuestionChange({
        question: questionUpdate,
        option,
        action: "add",
      });
      inputAddRef.current!.value = "";
    }
  };

  const handleRemoveOption = (id: string) => {
    const option = options.find((option) => option.id !== id);
    const questionUpdate = {
      ...question,
      question_options: options.filter((option) => option.id !== id),
    };
    handleOnQuestionChange({
      question: questionUpdate,
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
      const newQuestion_question_options = options.map((option) => {
        if (option.id === editingOption?.id) {
          return {
            ...option,
            label: newLabel,
          };
        }
        return option;
      });

      const option = newQuestion_question_options.find(
        (o) => o.id === editingOption?.id
      );
      const questionUpdate = {
        ...question,
        question_options: newQuestion_question_options,
      };
      handleOnQuestionChange({ question: questionUpdate, option, action: "update" });
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