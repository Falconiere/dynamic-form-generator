import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
const getSupabase = () => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  return supabase;
}

const getCurrentUser = async () => {
  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser()
  return user;
}

const supabase = async ()=>{
  const client = getSupabase()
  const user = await getCurrentUser();
  return {
    client,
    user
  }
}

export { supabase }