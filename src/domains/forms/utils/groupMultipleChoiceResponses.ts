import { Form, MultipleOption, Option } from "@/server/types/Form";

type MultipleChoiceResponses = {
  [key: string]: {
    questionText: string;
    totalOfResponses: number;
    labels: string[];
    totalByLabel: Record<string, { label:string, count:number}>;
  };
};




const groupMultipleChoiceResponses = (answers?:Form["answers"])=> { 
  const filtered = answers?.filter(
    (answer) => answer.question.element_type === "multiple-choice"
  );
  return filtered?.reduce((acc, answer) => {
  const questionID = answer.question_id;
  const response = answer.response.value as string;

  if (!acc[questionID]) {
    const questionText = answer.question.question_text;
    const options = answer.question.options;
    const totalByLabel = options?.reduce((acc, {id, label}) => {
      return {
        ...acc,
        [id]: {
          label: label,
          count: 0,
        },
      };
    }, {} as Record<string, { label: string; count: number }>) ?? {};

    if(totalByLabel[response]) {
      totalByLabel[response].count += 1;
    }

    return {
      ...acc,
      [questionID]: {
        totalOfResponses: 1,
        questionText,
        labels: options?.map((option) => option.label) ?? [],
        totalByLabel  
      },
    };
  }
  const currentCount = acc[questionID].totalOfResponses;
  const currentTotalByLabel = acc[questionID].totalByLabel;

  if(currentTotalByLabel[response]) {
    currentTotalByLabel[response].count += 1;
  }

  return {
    ...acc,
    [questionID]: {
      ...acc[questionID],
      totalOfResponses: currentCount + 1,
      totalByLabel: currentTotalByLabel
    },
  };
}, {} as MultipleChoiceResponses);
}

export {groupMultipleChoiceResponses}
