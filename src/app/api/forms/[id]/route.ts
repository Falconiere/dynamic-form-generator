import { services } from "@/backend";
import { getCurrentUser } from "@/backend/getCurrentUser";
import { forms } from "@prisma/client";

export async function PATCH(request: Request,  { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    const id = params.id;
    const body = await request.json() as Partial<forms>;
    const questionOption = await services.forms.update(id, {
      ...body,
      user_id: user.id,
    });
    return new Response(JSON.stringify(questionOption), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}
