import { models } from "@/backend";
import { FormResponseTabsParams } from "@/domains/forms/contants/formResponseTabs";
import { ResponsesForm } from "@/domains/forms/screens/ResponsesForm";

type PageProps = {
  params: { id: string };
  searchParams?: {
    tab?: FormResponseTabsParams["currentTab"];
    page?: string;
  };
};
const Page = async ({ params, searchParams }: PageProps) => {
  const { id } = params;
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  const tab = searchParams?.tab ?? "summary";

  const [summary, individualResponse] = await Promise.all([
    models.responseByQuestions.findByFormId(id),
    models.responses.fetchByFormIdWithAnswers({ formId: id, page }),
  ]);

  return (
    <ResponsesForm
      summary={summary}
      individualResponse={individualResponse}
      formId={id}
      currentTab={tab}
      currentPage={page}
    />
  );
};

export default Page;
