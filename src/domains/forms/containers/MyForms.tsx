"use client";
import { Form } from "@/backend/types/Form";
import { useRouter } from "next/navigation";

import { FormListItem } from "../components/FormListItem";
import { clientApi } from "@/clientApi";
import { useLocaleCtx } from "@/providers/LocaleProvider";

type MyFormsProps = {
  forms?: Form[];
};

const MyForms = ({ forms }: MyFormsProps) => {
  const { t } = useLocaleCtx();
  const router = useRouter();
  const handleChangeStatus = async (form: Form, status: Form["status"]) => {
    if (!form.id) return;
    await clientApi.forms.update(form.id, {
      ...form,
      status,
    });
    router.refresh();
  };

  const isEmpty = !forms || forms.length === 0;

  if (isEmpty)
    return (
      <div className="grid gap-4 px-4 mt-4">
        <div className="bg-white w-full grid p-4 rounded-md shadow-md">
          <p className="text-center">{t("forms.notFound.published")}</p>
        </div>
      </div>
    );
  return (
    <div className="grid gap-4 px-4 mt-4">
      <table className="bg-white w-full grid p-4 rounded-md shadow-md">
        <thead>
          <tr className="grid grid-cols-[auto,200px,200px,50px] p-2">
            <th className="text-left">{t("title")}</th>
            <th className="text-right">{t("status")}</th>
            <th className="text-right">{t("createdAt")}</th>
          </tr>
        </thead>
        <tbody>
          {forms?.map((form) => (
            <FormListItem
              form={form}
              onChangeStatus={handleChangeStatus}
              onEdit={() => router.push(`/forms//edit/${form.id}`)}
              onPreview={() =>
                window.open(`/forms/preview/${form.id}`, "_blank")
              }
              key={form.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { MyForms };
