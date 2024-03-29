import {  FormElementType, Question } from "@/backend/types/Form";
import { isMultipleChoiceQuestion } from "@/domains/forms/utils/isMultipleChoiceQuestion";

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
  }).filter(q=>!!q) as Array<{
    question_id: string;
    response: string | string[];
    element_type: FormElementType;
  }>;
return answers;
}

export { convertAnswers }