import {  FormElementType, Question } from "@/server/types/Form";
import { isMultipleChoiceQuestion } from "@/server/utils/isMultipleChoiceQuestion";

type ConvertAnswers = {
  data: any;
  questions: Question[];
}
const convertAnswers = ({data, questions}: ConvertAnswers) => {
  const answers = Object.entries(data).map(([key, value]) => {
    const question = questions.find((question) => question.id === key);

    if (!question) return;

    const options = Array.isArray(value) ? value : [value];
    const response = question && isMultipleChoiceQuestion(question.element_type) ? options : value;
    return {
      question_id: key,
      response,
      element_type: question.element_type,
    };
  }) as Array<{
    question_id: string;
    response: string | string[];
    element_type: FormElementType;
  }>;
return answers;
}

export { convertAnswers }