import { dbClient } from "@/server/utils/dbClient"
const fetchAnonFormById = async (id:string) => {
  const db = await dbClient()
  const data = await db.query("SELECT * FROM forms WHERE id = $1 AND  status = $2", [id,"published"])
  await db.end()
  return data?.rows?.[0]
}

export { fetchAnonFormById }