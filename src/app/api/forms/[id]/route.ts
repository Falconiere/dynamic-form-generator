import { models } from "@/backend";

import { forms } from "@prisma/client";

export async function PATCH(request: Request,  { params }: { params: { id: string } }) {
  try {
    
    const user = await models.userProfiles.get()

    if (!user) {
      return new Response(JSON.stringify({
        message: "You must be logged in to update a form"
      }), {
        headers: { "Content-Type": "application/json" },
        status: 401
      });
    }
    const id = params.id;
    
    const body = await request.json() as Partial<forms>;
    const questionOption = await models.forms.update(id, {
      ...body,
      user_profile_id: user.id,
    });
    return new Response(JSON.stringify(questionOption), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}
