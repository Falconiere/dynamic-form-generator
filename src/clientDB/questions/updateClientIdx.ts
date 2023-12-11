import { supabase } from "../clientSupabase";

type UpdateClientIdx = Array<{id: string, client_idx: number}>;
const updateClientIdx = async (payload:UpdateClientIdx) => {
  await Promise.all(payload.map(async (item) => {
    const { error, data } = await supabase()
    .from("questions")
    .update({
      client_idx: item.client_idx
    })
    .eq("id", item.id)
    if(error) {
      throw error;
    }
    return data;
  }));
}

export { updateClientIdx }