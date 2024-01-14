import {  answer_texts } from "@prisma/client";
import { Model } from "../Model";

class AnswerTexts extends Model{

  async create(payload: Partial<answer_texts>) {
    const answers_options = this.client.answer_texts
    return await answers_options.create({
      data: payload as answer_texts
    })
  }
}

const answerTextsService = new AnswerTexts()
export { answerTextsService as AnswerTexts }