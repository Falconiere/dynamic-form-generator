import { PostgrestError } from "@supabase/supabase-js";
import { DynamicForm } from "./DynamicForm";

type FormResponse = DynamicForm | DynamicForm[] | PostgrestError | null
export type { FormResponse }