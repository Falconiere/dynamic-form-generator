import { models } from "@/backend"

export async function GET(request:Request) {
  try {
    const { searchParams } = new URL(request.url) 
    const formId = searchParams.get('form_id') as string
    const page = searchParams.get('page')
    const response = await models.responses.fetchByFormIdWithAnswers({formId, page: Number(page)})
    return new Response(JSON.stringify(response), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })  
  } catch (error) {
    return new Response(JSON.stringify({error}), {
      headers: {
        'content-type': 'application/json',
      },
      status: 500,
    })
  }
  
}