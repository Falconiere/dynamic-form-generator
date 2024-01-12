import { forms, questions } from "@prisma/client"
import { getPrismaClient } from "../prisma"
import { services } from ".."

class Forms {
  private readonly client = getPrismaClient()
  
  async create(payload: forms) {
    const forms = this.client.forms
    const form  = await forms.create({
      data: payload,
    })
    const defaultQuestion = {
      form_id: form.id,
      title: "What is your name?",
      order: 0,
      element_type:"short_text",
      required: true,
    } as questions

    await services.questions.create(defaultQuestion)
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
            question_options: true
            
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
}

const formsService = new Forms()
export { formsService as Forms }