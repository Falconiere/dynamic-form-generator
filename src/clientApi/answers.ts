import { Answer } from "@/backend/types/Answers";
import { http } from "@/utils/http";

const create = async (payload:Answer) => http.post("/api/answers", payload);
export {
  create,
}