import { Form } from "@/server/types/Form";

type CheckboxesResponses = {
  [key: string]: {
    questionText: string;
    totalOfResponses: number;
    labels: string[];
    totalByLabel: Record<string, { label:string, count:number}>;
  };
};


const groupCheckboxesResponses = (answers:Form["answers"]) =>{
  const filtered = answers?.filter(
    (answer) => answer.question.element_type === "checkboxes"
  );

  return filtered?.reduce((acc, answer) => {
    const questionID = answer.question_id;
    const response = answer.response.value as string[];
    const options = answer.question.options;
    if(!acc?.[questionID]){
      const labels = options?.map((option) => option.label) ?? [];
      const totalByLabel = options?.reduce((acc, {id, label}) => {
        return {
          ...acc,
          [id]: {
            label: label,
            count: response.includes(id) ? 1 : 0,
          },
        };
      }, {} as Record<string, { label: string; count: number }>) ?? {};

      return {
        ...acc,
        [questionID]: {
          totalOfResponses: 1,
          labels,
          questionText: answer.question.question_text,
          totalByLabel
        }
      }
    }
    const currentCount = acc[questionID].totalOfResponses;
    const currentTotalByLabel = acc[questionID].totalByLabel;
    const totalByLabel = options?.reduce((acc, {id, label}) => {
      return {
        ...acc,
        [id]: {
          label: label,
          count: response.includes(id) ? currentTotalByLabel[id].count + 1 : currentTotalByLabel[id].count,
        },
      };
    }, {} as Record<string, { label: string; count: number }>) ?? {};

    return {
      ...acc,
      [questionID]: {
        ...acc[questionID],
        totalOfResponses: currentCount + 1,
        totalByLabel
      }
    }
  },{} as CheckboxesResponses)
}
export { groupCheckboxesResponses }