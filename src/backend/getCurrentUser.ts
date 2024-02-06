import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { UserResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const getSupabase = () => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  return supabase;
}

const getCurrentUser = async (): Promise<UserResponse["data"]["user"]> => {
  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser()
  return user;
}

export { getCurrentUser }