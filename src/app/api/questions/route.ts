import { models } from "@/backend";
import { questions } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as questions;
    const response = await models.questions.create(payload);
    console.log({response})
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}