import { services } from "@/backend";

export async function PATCH(request: Request) {
  try {
    const payload = await request.json() as { id: string, order: number }[];
    const response = await services.questions.updateQuestionOrders(payload);
    
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}