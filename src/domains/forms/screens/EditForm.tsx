import { DynamicForm } from "@/server/types/DynamicForm";
import { DynamicFormFields } from "../containers/DynamicFormFields";

type EditFormProps = {
  form: DynamicForm;
};
const EditForm = ({ form }: EditFormProps) => {
  return <DynamicFormFields form={form} />;
};

export { EditForm };
