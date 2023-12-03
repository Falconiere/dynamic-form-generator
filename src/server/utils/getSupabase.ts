import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSupabase = () => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  return supabase;
}

const getSupabaseUser = async () => {
  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser()
  return user;
}
export { getSupabase, getSupabaseUser }