import { Input } from "@/components/ui/input";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormCheckBoxes } from "./FormCheckBoxes";
import { FormElement, FormElementType } from "@/server/types/Form";
import { Textarea } from "@/components/ui/textarea";

type FormQuestionInputProps = {
  question: FormElement;
  onChange: (question: Partial<FormElement>) => void;
};

const inputs = ({
  question,
  onChange,
}: FormQuestionInputProps): Record<FormElementType, JSX.Element> => ({
  "short-text": (
    <Input
      type="text"
      placeholder="Question"
      name="question"
      value={question?.text}
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

const FormQuestionInput = (props: FormQuestionInputProps) => {
  return inputs(props)[props.question.elementType];
};
export { FormQuestionInput };
