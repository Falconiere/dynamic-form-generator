import { Model } from "../Model";
import { Answer } from "../types/Answers";
import { isMultipleChoiceQuestion } from "@/domains/forms/utils/isMultipleChoiceQuestion";

class Responses extends Model{
  async create(payload: Answer) {
    const { form_id, answers, user_email } = payload;
    const {id: response_id } = await this.client.responses.create({
      data:{
        form_id: form_id,
        user_email,
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

  async fetchByFormId(formId: string) {
    const response = await this.client.responses.findMany({
      where: {
        form_id: formId,
      },
      
    })
    return response;
  }

  async fetchByFormIdWithAnswers({formId, page}:{formId: string, page?:number}) {
    const count = await this.client.responses.count({
      where:{
        form_id: formId,
      },
    });

    const response = await this.client.responses.findFirstOrThrow({
      orderBy:{
        created_at: 'desc',
      },
      where:{
        form_id: formId,
      },
      include: {
        form: {
          select:{
            id: true,
            title: true,
            description: true,
            status: true,
            created_at: true,
            updated_at: true,
            questions:{
              orderBy:{
                order: 'asc',
              },
              select:{
                id: true,
                title: true,
                element_type: true,
                required: true,
                order: true,
                question_options: {
                  select: {
                    id: true,
                    label: true,
                  }
                },
              }
            }
          }
        },
      },
      skip: (page ?? 1) - 1,
      take: 1,
    })

    const questionIds = response.form.questions.map(question => question.id);
    const answer_options = await this.client.answer_options.findMany({
      where: {
        form_id: formId,
        response_id: response.id,
        question_id: {
          in: questionIds,
        }
      }
    })
    const answer_texts = await this.client.answer_texts.findMany({
      where: {
        form_id: formId,
        response_id: response.id,
        question_id: {
          in: questionIds,
        }
      }
    })
    return { count, response, answer_options, answer_texts }
  }
  async isUserAlreadyAnswered({form_id, user_email}: {form_id: string, user_email: string}) {
    const response = await this.client.responses.findFirst({
      where: {
        user_email,
        form_id,
      },
    })
    return !!response;
  }
}

const responsesService = new Responses()
export { responsesService as Responses }