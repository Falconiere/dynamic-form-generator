import { PostgrestError } from "@supabase/supabase-js";
import { Form } from "./Form";

type FormResponse = Form | Form[] | PostgrestError | null
export type { FormResponse }