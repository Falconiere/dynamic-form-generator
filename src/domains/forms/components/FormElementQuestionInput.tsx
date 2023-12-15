import { Input } from "@/components/ui/input";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormCheckBoxes } from "./FormCheckBoxes";
import { FormElement, FormElementType } from "@/server/types/Form";
import { Textarea } from "@/components/ui/textarea";

type FormElementQuestionInputProps = {
  question: FormElement;
};

const inputs = ({
  question,
}: FormElementQuestionInputProps): Record<FormElementType, JSX.Element> => ({
  "short-text": (
    <Input
      type="text"
      placeholder="Question"
      name="question"
      value={question?.text}
      readOnly
    />
  ),
  "large-text": (
    <Textarea
      placeholder="Question"
      name="question"
      readOnly
      value={question?.text}
    />
  ),
  "multiple-choice": <FormRadioGroup question={question} />,
  checkboxes: <FormCheckBoxes question={question} />,
});

const FormElementQuestionInput = (props: FormElementQuestionInputProps) => {
  return (
    inputs(props)[props.question.element_type] ?? inputs(props)["short-text"]
  );
};
export { FormElementQuestionInput };
