import { FormPreview } from "@/domains/forms/containers/FormPreview";
import { fetchById } from "@/server/database/forms";
import { Form } from "@/server/types/Form";
import { dbFetchById } from "@/server/utils/db";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  try {
    const form = await dbFetchById<Form>(id);
    if (!form) return redirect("/not-found");
    return <FormPreview form={form} />;
  } catch (error) {
    return redirect("/not-found");
  }
};

export default Page;
