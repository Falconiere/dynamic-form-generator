import { Input } from "@/components/ui/input";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormCheckBoxes } from "./FormCheckBoxes";
import { FormElementType, Question } from "@/server/types/Form";
import { Textarea } from "@/components/ui/textarea";

type FormElementQuestionInputProps = {
  question: Question & { answer?: string };
};

const inputs = ({
  question,
}: FormElementQuestionInputProps): Record<FormElementType, JSX.Element> => ({
  short_text: (
    <Input
      type="text"
      placeholder="Question"
      name="question"
      value={question?.answer}
      readOnly
    />
  ),
  long_text: (
    <Textarea
      placeholder="Question"
      name="question"
      readOnly
      value={question?.answer}
    />
  ),
  multiple_choice_radio: <FormRadioGroup question={question} />,
  multiple_choice_checkbox: <FormCheckBoxes question={question} />,
});

const FormElementQuestionInput = (props: FormElementQuestionInputProps) => {
  return (
    inputs(props)[props.question.element_type] ?? inputs(props)["short_text"]
  );
};
export { FormElementQuestionInput };
