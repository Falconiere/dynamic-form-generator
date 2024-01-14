import { forms, questions } from "@prisma/client"
import { Model } from "../Model"
import { models } from ".."

class Forms extends Model {
  async create(payload: forms) {
    const forms = this.client.forms
    const form  = await forms.create({
      data:payload
    })
    
    const defaultQuestion = {
      form_id: form.id,
      title: "What is your name?",
      order: 0,
      element_type:"short_text",
      required: true,
    } as questions

    await models.questions.create(defaultQuestion)
    return await this.findById(form.id)
  }
  
  async findById(id: string) {
    return await this.client.forms.findFirst({
      where: {
        id,
      },
      include: {
        questions: {
          orderBy: {
            order: "asc",
          },
          include: {
            question_options: {
              orderBy: {
                created_at: "asc",
              }
            }
          },
        }
      }
    })
  }
  async update(id: string, payload: Partial<forms>) {
    const forms = this.client.forms
    return await forms.update({
      where: {
        id,
      },
      data: payload,
    })
  }

  async fetchAll() {
    return await this.client.forms.findMany({
      include: {
        questions: {
          orderBy: {
            order: "asc",
          },
          include: {
            question_options: {
              orderBy: {
                created_at: "asc",
              }
            }
          },
        }
      }
    })
  
  }
}

const formsService = new Forms()
export { formsService as Forms }