"use client";
import { FormHeader } from "../components/FormHeader";
import { FormDraggableArea } from "../components/FormDraggableArea";
import { FormBuilderQuestionList } from "./FormBuilderQuestionList";
import { useFormBuilderContext } from "../provider/FormBuilderProvider";
import { cn } from "@/lib/utils";

const FormBuilder = () => {
  const {
    handleOnQuestionChange,
    handleOnHeaderChange,
    handleOnAddQuestion,
    handleOnSortDragEnd,
    handleOnRemove,
    values,
  } = useFormBuilderContext();
  const { title, description, questions, status } = values;

  return (
    <div className="grid gap-4">
      <FormHeader
        value={{
          title,
          description,
        }}
        status={status}
        onChange={handleOnHeaderChange}
      />
      <FormBuilderQuestionList
        questions={questions}
        onChange={(question) =>
          handleOnQuestionChange({
            question: question,
          })
        }
        onDelete={handleOnRemove}
        onDragEnd={handleOnSortDragEnd}
      />
      <FormDraggableArea
        onDropped={(element_type) => handleOnAddQuestion({ element_type })}
      />
    </div>
  );
};

export { FormBuilder };
