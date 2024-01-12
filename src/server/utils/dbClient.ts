import pg from 'pg'
import { SUPABASE_POSTGRES_URL } from '@/constants/constants'



const dbClient = async ()=> {
  const client = new pg.Client(SUPABASE_POSTGRES_URL)
  await client.connect()
  return client
}
export { dbClient }
