import { models } from "@/backend";
import { forms } from "@prisma/client";
import { revalidatePath } from "next/cache";


export async function POST(request: Request) {
  try {
    const profile = await models.userProfiles.get()
    if (!profile) {
      return new Response(JSON.stringify({
        message: "You must be logged in to create a form"
      }), {
        headers: { "Content-Type": "application/json" },
        status: 401
      });
    }
    const payload = await request.json() as forms;
    const response = await models.forms.create({
      ...payload,
      user_profile_id: profile?.id
    });
    revalidatePath("/forms");
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}