import { Form } from "@/server/types/Form";
import { FormBuilder } from "../containers/FormBuilder";

type EditFormProps = {
  form: Form;
};
const EditForm = ({ form }: EditFormProps) => {
  return <FormBuilder form={form} />;
};

export { EditForm };
