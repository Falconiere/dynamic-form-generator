import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSupabase = () => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  return supabase;
}

const getCurrentUser = async () => {
  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser()
  if(!user?.id) throw new Error("User not found")
  return user;
}

export { getCurrentUser }