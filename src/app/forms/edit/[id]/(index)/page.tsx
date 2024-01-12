import { services } from "@/backend";
import { EditForm } from "@/domains/forms/screens/EditForm";
//import { fetchTotalResponsesByFormId } from "@/server/database/forms/fetchTotalResponsesByFormId";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  const [form] = await Promise.all([
    services.forms.findById(id),
    //fetchTotalResponsesByFormId(id),
  ]);
  try {
    if (!form) return redirect("/not-found");
    return (
      <EditForm
        defaultValue={{
          ...form,
          responseTotals: [],
        }}
      />
    );
  } catch (error) {
    return redirect("/not-found");
  }
};

export default Page;
