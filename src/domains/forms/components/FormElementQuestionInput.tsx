import { Input } from "@/components/ui/input";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormCheckBoxes } from "./FormCheckBoxes";
import { FormElement, FormElementType } from "@/server/types/Form";
import { Textarea } from "@/components/ui/textarea";

type FormElementQuestionInputProps = {
  question: FormElement;
  onChange: (question: FormElement) => void;
};

const inputs = ({
  question,
  onChange,
}: FormElementQuestionInputProps): Record<FormElementType, JSX.Element> => ({
  "short-text": (
    <Input
      type="text"
      placeholder="Question"
      name="question"
      value={question?.text}
      readOnly
      onChange={(e) => {
        onChange({
          ...question,
          text: e.target.value,
        });
      }}
    />
  ),
  "large-text": (
    <Textarea
      placeholder="Question"
      name="question"
      readOnly
      value={question?.text}
      onChange={(e) => {
        onChange({
          ...question,
          text: e.target.value,
        });
      }}
    />
  ),
  "multiple-choice": <FormRadioGroup question={question} onChange={onChange} />,
  checkboxes: <FormCheckBoxes question={question} onChange={onChange} />,
});

const FormElementQuestionInput = (props: FormElementQuestionInputProps) => {
  return (
    inputs(props)[props.question.element_type] ?? inputs(props)["short-text"]
  );
};
export { FormElementQuestionInput };
