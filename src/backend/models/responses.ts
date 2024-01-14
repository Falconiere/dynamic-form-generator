import { Model } from "../Model";
import { Answer } from "../types/Answers";
import { isMultipleChoiceQuestion } from "@/domains/forms/utils/isMultipleChoiceQuestion";

class Responses extends Model{
  async create(payload: Answer) {
    const { form_id, answers } = payload;
    const {id: response_id } = await this.client.responses.create({
      data:{
        form_id: form_id,
      }
    });
    const answersForOptions = answers.
    filter(answer => isMultipleChoiceQuestion(answer.element_type))
    .reduce((acc, answer) => {
      const { question_id, response } = answer;
      const responseOptions = Array.isArray(response) ? response : [response];
      return [...acc, ...responseOptions.map(id => ({
        response_id,
        question_id,
        form_id,
        question_option_id: id,
      }))]
    }, [] as Array<{
      response_id: string,
      question_id: string,
      form_id: string,
      question_option_id: string,
    }>)

    const answersForOptionsText = answers
    .filter(answer => !isMultipleChoiceQuestion(answer.element_type))
    .map(answer => ({
      response_id,
      question_id: answer.question_id,
      form_id,
      answer: answer.response as string,
    }))

    const answersForOptionsTransaction = answersForOptions
    .map(answer => this.client.answer_options.create({
      data: answer
    }))

    const answersForOptionsTextTransaction = answersForOptionsText
    .map(answer => this.client.answer_texts.create({
      data: answer
    }))

    const answersForResponseByQuestion = answers
    .map(answer => this.client.response_by_questions.create({
      data: {
        response_id,
        question_id: answer.question_id,
        form_id,
      }
    }))

    return await this.client.$transaction([
      ...answersForResponseByQuestion,
      ...answersForOptionsTransaction,
      ...answersForOptionsTextTransaction
    ])
  }
}

const responsesService = new Responses()
export { responsesService as Responses }