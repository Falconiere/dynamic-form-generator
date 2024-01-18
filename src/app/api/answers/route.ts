import { models } from "@/backend";
import { Answer } from "@/backend/types/Answers";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Answer;
    const response = await models.responses.create(payload)
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify(error),{
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}