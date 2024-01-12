import { dbClient } from "@/server/utils/dbClient"

type Payload = {
  formId: string; 
  email: string;
}
const isFormAnswered = async ({formId, email}:Payload) => {
  const db = await dbClient()
  const data = await db.query("SELECT * FROM responses WHERE form_id = $1 AND email = $2", [formId, email])
  await db.end()
  return !!data?.rows?.[0]
}

export { isFormAnswered }