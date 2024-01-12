import { http } from "@/utils/http";
import { Form } from "@/backend/types/Form";

const create = async (payload:Form) => http.post("/api/forms", payload);
const update = async (id:string, payload:Partial<Form>) => http.patch(`/api/forms/${id}`, payload);
const getByID = async (id:string) => http.get(`/api/forms/${id}`);

export {
  create,
  update,
  getByID,
}