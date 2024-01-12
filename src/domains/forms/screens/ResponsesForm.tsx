import { Form } from "@/backend/types/Form";
import { Summary } from "../containers/Summary";
import { FormTabs } from "../components/FormTabs";
import { formTabs } from "../contants/formTabs";
import {
  FormResponseTabsParams,
  formResponseTabs,
} from "../contants/formResponseTabs";
import { FormPaginateResponses } from "../components/FormPaginateResponses";
import { FormPreview } from "../containers/FormPreview";
import { IndividualResponse } from "@/backend/types/Responses";

type ResponsesFormProps = {
  responseTotals: Form["responseTotals"];
  individualResponse?: IndividualResponse | null;
  formId: string;
  count?: number | null;
  currentTab: FormResponseTabsParams["currentTab"];
  currentPage?: number;
};
const ResponsesForm = ({
  responseTotals,
  individualResponse,
  formId,
  count,
  currentTab,
  currentPage = 1,
}: ResponsesFormProps) => {
  return (
    <>
      <FormTabs links={formTabs(formId)} />
      <div>
        <FormTabs
          links={formResponseTabs({ formId, currentTab })}
          className="relative pb-0 gap-0 rounded-tl-md rounded-tr-md overflow-hidden border border-solid border-gray-200 border-l-0 border-r-0 border-t-0 z-10 mb-[-3px]"
          classNameLink="shadow-none rounded-none"
        />
        {currentTab === "summary" ? (
          <Summary responseTotals={responseTotals} formId={formId} />
        ) : null}
        {currentTab === "individual" ? (
          <>
            <FormPaginateResponses
              formId={formId}
              currentPage={currentPage}
              total={count ?? 0}
            />
            {individualResponse?.form ? (
              <FormPreview form={individualResponse.form} isResponse />
            ) : (
              <span>No individual response</span>
            )}
          </>
        ) : null}
      </div>
    </>
  );
};
export { ResponsesForm };
