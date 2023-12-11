import { Form } from "@/server/types/Form";
import { FormBuilder } from "../containers/FormBuilder";
import { FormLayout } from "@/layouts/FormLayout";

type EditFormProps = {
  defaultValue: Form;
};
const EditForm = ({ defaultValue }: EditFormProps) => {
  return (
    <FormLayout defaultValue={defaultValue}>
      <FormBuilder />
    </FormLayout>
  );
};

export { EditForm };
