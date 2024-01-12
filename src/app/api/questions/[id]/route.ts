import { services } from "@/backend";

import { questions } from "@prisma/client";

export async function PATCH(request: Request,  { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json() as Partial<questions>;
    
    const questionOption = await services.questions.update(id, body);
    return new Response(JSON.stringify(questionOption), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}

export async function DELETE(request: Request,  { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await services.questions.remove(id);
    return new Response(JSON.stringify({ 
      message:  "Question deleted successfully"
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}

