import { Form } from "@/server/types/Form";
import { FormPreview } from "../containers/FormPreview";

type PreviewFormProps = {
  form: Form;
};

const PreviewForm = ({ form }: PreviewFormProps) => (
  <div className="pt-4">
    <FormPreview form={form} />
  </div>
);
export { PreviewForm };
