import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = () => createClientComponentClient();
const getCurrentUser = async () => {
  const {data}  = await supabase().auth.getUser();
  if(!data.user?.id){
    throw new Error("User not found")
  }
  return data.user
}

export { getCurrentUser, supabase }