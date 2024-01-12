"use client";
import { FormHeader } from "../components/FormHeader";
import { FormBuilderQuestionList } from "./FormBuilderQuestionList";
import { useFormBuilderContext } from "../provider/FormBuilderProvider";

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
        questions={questions ?? []}
        onChange={(question) =>
          handleOnQuestionChange({
            question: question,
          })
        }
        onSortDragEnd={handleOnSortDragEnd}
        onDelete={handleOnRemove}
        onAddQuestion={handleOnAddQuestion}
      />
    </div>
  );
};

export { FormBuilder };
