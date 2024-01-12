import { FormElementType } from "@/server/types/Form"
import { dbClient } from "@/server/utils/dbClient"
import { isResponseEmpty } from "@/server/utils/isResponseEmpty"
import { isFormAnswered } from "./isFormAnswered"

type Payload = {
  form_id: string
  answers: Array<{
    question_id: string
    response: string | string[]
    element_type: FormElementType
  }>
}

const saveFormResponse = async ({form_id, answers}: Payload) => {
  const db = await dbClient()
  // save a new response and get the id
  const response = await db.query("INSERT INTO responses (form_id) VALUES ($1) RETURNING id", [form_id])
  const response_id = response?.rows?.[0]?.id

  const multiple = answers.filter(({ element_type }) => element_type === "multiple-choice" || element_type === "checkboxes")
  const text = answers.filter(({ element_type }) => element_type === "short-text" || element_type === "large-text")
  
  const options = multiple.reduce((acc, { question_id, response }) => {
    const responses = Array.isArray(response) ? response : [response]
    responses.forEach((question_option_id) => {
      acc.push({ question_id, question_option_id })
    })
    return acc
  }, [] as Array<{
    question_id: string
    question_option_id: string
  }>)

  await Promise.all(
    options.map(({ question_id, question_option_id }) =>
      db.query(
        "INSERT INTO answer_options (question_id, question_option_id, response_id, form_id) VALUES ($1, $2, $3, $4)",
        [question_id, question_option_id, response_id, form_id]
      )
    )
  )

  await Promise.all(
    text.map(({ question_id, response:text }) =>
      db.query(
        "INSERT INTO answer_texts (question_id, response_id,form_id, text ) VALUES ($1, $2, $3, $4)",
        [question_id, response_id, form_id, text]
      )
    )
  )
 
  await Promise.all(
    answers?.filter(a=> !isResponseEmpty(a.response) ).map(({ question_id }) =>db.query(
      "INSERT INTO response_by_questions (question_id, response_id, form_id  ) VALUES ($1, $2, $3)",
        [question_id, response_id, form_id]
      )
    )
  )
  await db.end()
}

export { saveFormResponse }