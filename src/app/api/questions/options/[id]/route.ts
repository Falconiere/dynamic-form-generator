import { services } from "@/backend";
import { question_options } from "@prisma/client";

export async function DELETE(request: Request,  { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await services.questionOptions.remove(id);
    return new Response(JSON.stringify({ 
      message:  "Question option deleted successfully"
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}

export async function PATCH(request: Request,  { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json() as Partial<question_options>;
    const questionOption = await services.questionOptions.update(id, body);
    return new Response(JSON.stringify(questionOption), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}
