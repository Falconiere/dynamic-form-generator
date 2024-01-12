import { services } from "@/backend";
import { question_options } from "@prisma/client";


export async function POST(request: Request ) {
  try {
    const body = await request.json() as question_options;
    const questionOption = await services.questionOptions.create(body);
    return new Response(JSON.stringify(questionOption), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}