import { question_options } from "@prisma/client"
import { getPrismaClient } from "../prisma"

class QuestionOptions {
  private readonly client = getPrismaClient()
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
      data: payload,
    })
  }
}

const questionOptionsService = new QuestionOptions()
export { questionOptionsService as QuestionOptions }