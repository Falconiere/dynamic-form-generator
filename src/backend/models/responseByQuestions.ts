import { response_by_questions } from "@prisma/client";
import { Model } from "../Model";

class ResponseByQuestions extends Model{

  async create(payload: response_by_questions) {
    const answers_options = this.client.response_by_questions
    return await answers_options.create({
      data: payload
    })
  }
}

const responseByQuestionsService = new ResponseByQuestions()
export { responseByQuestionsService as ResponseByQuestions }