import { services } from "@/backend";
import { getCurrentUser } from "@/backend/getCurrentUser";
import { forms } from "@prisma/client";



export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if(!user?.id) throw new Error("User not found");
    const payload = await request.json() as forms;
    const response = await services.forms.create({
      ...payload,
      user_id: user?.id
    });
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}