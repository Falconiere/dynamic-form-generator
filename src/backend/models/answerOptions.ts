import { answer_options } from "@prisma/client";
import { Model } from "../Model";

class AnswerOptions extends Model{

  async create(payload: Partial<answer_options>) {
    const answers_options = this.client.answer_options
    return await answers_options.create({
      data: payload as answer_options
    })
  }
}

const answerOptionsService = new AnswerOptions()
export { answerOptionsService as AnswerOptions }