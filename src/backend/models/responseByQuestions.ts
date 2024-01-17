import { response_by_questions } from "@prisma/client";
import { Model } from "../Model";
import { SummaryResponse } from "../types/Responses";

class ResponseByQuestions extends Model{

  async create(payload: response_by_questions) {
    const answers_options = this.client.response_by_questions
    return await answers_options.create({
      data: payload
    })
  }

  async findByFormId(form_id: string): Promise<SummaryResponse[]> {
    const response_by_questions = this.client.response_by_questions
     const countByQuestion = await response_by_questions.groupBy({
      by: 'question_id',
      where: {
        form_id,
      },
      _count: true
    })
    const questionIds = countByQuestion.map(question => question.question_id)
    const countByQuestionOption = await this.client.answer_options.groupBy({
      by: ['question_option_id'],
      where: {
        form_id,
        question_id: {
          in: questionIds
        },
      },
      _count: true
    })

    const questions = await this.client.questions.findMany({
      where: {
        form_id,
        id: {
          in: questionIds
        }
      },
      orderBy: {
        order: 'asc'
      },
      include: {
        question_options: {
          select: {
            id: true,
            label: true,
            description: true,
          }
        }
      },
    })
    return questions.map(question => ({
      ...question,
      question_options: question.question_options?.map(option => ({
        ...option,
        count: countByQuestionOption
        .find(count => count.question_option_id === option.id)?._count ?? 0
      })),
      totalOfResponses: countByQuestion
        .find(count => count.question_id === question.id)?._count ?? 0
    }))
  }
}

const responseByQuestionsService = new ResponseByQuestions()
export { responseByQuestionsService as ResponseByQuestions }