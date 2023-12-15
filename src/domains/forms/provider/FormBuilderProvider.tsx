import { createContext, useContext } from "react";
import { useFormBuilder } from "../hooks/useFormBuilder";
import { Form } from "@/server/types/Form";

type FormBuilderContextType = ReturnType<typeof useFormBuilder>;
const FormBuilderContext = createContext<FormBuilderContextType>({
  values: {
    title: "",
    description: "",
    questions: [],
  },
  errors: {},
  isSubmitting: false,
  handleOnSubmit: () => Promise.resolve(),
  handleOnQuestionChange: () => Promise.resolve(),
  handleOnHeaderChange: () => {},
  handleOnAddQuestion: () => Promise.resolve(),
  handleOnSortDragEnd: () => {},
  handleOnRemove: () => Promise.resolve(),
});

const useFormBuilderContext = () => useContext(FormBuilderContext);

type FormBuilderProviderProps = {
  children: React.ReactNode;
  defaultValue: Form;
};

const FormBuilderProvider = ({
  children,
  defaultValue,
}: FormBuilderProviderProps) => {
  const value = useFormBuilder({ defaultValue });
  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
};
export { FormBuilderProvider, useFormBuilderContext };
