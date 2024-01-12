import { http } from "@/lib/http";
import { Question } from "@/server/types/Form";

const create = async (payload:Question) => http.post("/api/questions", payload);
const update = async (id:string, payload:Partial<Question>) => http.patch(`/api/questions/${id}`, payload);
const getByID = async (id:string) => http.get(`/api/questions/${id}`);
const remove = async (id:string) => http.delete(`/api/questions/${id}`);
const updateQuestionOrders = async (payload: { id:string, order: number }[]) => http.patch(`/api/questions/order`, payload);
export {
  create,
  update,
  getByID,
  remove,
  updateQuestionOrders
}