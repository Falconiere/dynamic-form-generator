import {  questions } from "@prisma/client"
import { getPrismaClient } from "../prisma"

class Questions {
  private readonly client = getPrismaClient()
  async create(payload: questions) {
    return await this.client.questions.create({
      data: payload,
    })
  }
  async update(id:string, payload: Partial<questions>) {
    return await this.client.questions.update({
      where: {
        id,
      },
      data: payload,
    })
  }

  async updateQuestionOrders(payload: { id:string, order: number }[]) {
    const updates = payload.map((question) => {
      return this.client.questions.update({
        where: {
          id: question.id,
        },
        data: {
          order: question.order,
        },
      })
    })
    return await this.client.$transaction(updates)
  }
  async remove(id: string) {
    return await this.client.questions.delete({
      where: {
        id,
      },
    })
  }
}
const questionsService = new Questions()
export { questionsService as Questions }