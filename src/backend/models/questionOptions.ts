import { question_options } from "@prisma/client"
import { Model } from "../Model"

class QuestionOptions extends Model {
  async create(payload: question_options) {
    return await this.client.question_options.create({
      data: payload,
    })
  }
  async remove(id: string) {
    return await this.client.question_options.delete({
      where: {
        id,
      },
    })
  }

  async update(id:string, payload: Partial<question_options>) {
    return await this.client.question_options.update({
      where: {
        id,
      },
      data: {
        ...payload,
        updated_at: new Date()
      },
    })
  }
}

const questionOptionsService = new QuestionOptions()
export { questionOptionsService as QuestionOptions }