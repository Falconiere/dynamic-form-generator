"use server"
import { SUPABASE_POSTGRES_URL } from "@/constants/constants"
import pg from "pg"

const dbClient = async ()=> {
  const client = new pg.Client(SUPABASE_POSTGRES_URL)
  await client.connect()
  return client
}

const dbFetchById = async <T>(id: string):Promise<T> => {
  const db = await dbClient()
  const data = await db.query("SELECT * FROM forms WHERE id = $1 AND  status = $2", [id,"published"])
  await db.end()
  return data?.rows?.[0]
};

type Payload = {
  form_id: string
  answers: Array<{
    question_id: string
    response: any
  }>
}

const dbSaveResponse = async ({ form_id, answers }: Payload):Promise<void> => {
  const db = await dbClient()
   await Promise.all(
    answers.map(({ question_id, response }) => 
     db.query("INSERT INTO responses (form_id, question_id, response) VALUES ($1, $2, $3)", [form_id, question_id, response])
  ))
  await db.end()
}

export { dbFetchById, dbSaveResponse }