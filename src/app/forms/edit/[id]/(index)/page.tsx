import { EditForm } from "@/domains/forms/screens/EditForm";
import { fetchById } from "@/server/database/forms";
import { fetchTotalResponsesByFormId } from "@/server/database/forms/fetchTotalResponsesByFormId";
import { Form } from "@/server/types/Form";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  const [form, responses] = await Promise.all([
    fetchById<Form>(id),
    fetchTotalResponsesByFormId(id),
  ]);
  console.log({ responses });
  try {
    if (!form) return redirect("/not-found");
    return (
      <EditForm
        defaultValue={{
          ...form,
          responseTotals: responses ?? {},
        }}
      />
    );
  } catch (error) {
    return redirect("/not-found");
  }
};

export default Page;
