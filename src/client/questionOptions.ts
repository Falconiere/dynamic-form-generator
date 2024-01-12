import { http } from "@/lib/http";
import { Option } from "@/server/types/Form";

const create = async (payload:Option):Promise<Option> => http.post("/api/questions/options", payload);
const update = async (id:string, payload:Partial<Option>):Promise<Option> => http.patch(`/api/questions/options/${id}`, payload);
const getByID = async (id:string):Promise<Option> => http.get(`/api/questions/options/${id}`);
const remove = async (id:string):Promise<void> => http.delete(`/api/questions/options/${id}`);

export {
  create,
  update,
  getByID,
  remove,
}