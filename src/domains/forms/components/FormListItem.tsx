import { cn } from "@/utils/utils";
import { Form } from "@/backend/types/Form";
import { FormListItemMenu } from "./FormListItemMenu";
import { format } from "date-fns";
import { useLocaleCtx } from "@/providers/LocaleProvider";
import { LocalePath } from "@/locales/types";

type FormListItemProps = {
  form: Form;
  onChangeStatus: (form: Form, status: Form["status"]) => void;
  onEdit: () => void;
  onPreview: () => void;
};
const FormListItem = ({
  form,
  onChangeStatus,
  onEdit,
  onPreview,
}: FormListItemProps) => {
  const { t } = useLocaleCtx();
  const { id, title, status, created_at } = form;
  return (
    <tr
      className="grid grid-cols-[auto,200px,200px,50px] border-t-[1px] p-2 hover:bg-gray-100"
      key={id}
    >
      <td>{title}</td>
      <td
        className={cn("text-right capitalize font-semibold", {
          "text-green-800": status === "published",
          "text-yellow-500": status === "draft",
          "text-red-500": status === "archived",
        })}
      >
        {t(`forms.status.${status}` as LocalePath)}
      </td>
      <td className="text-right">
        {created_at ? format(new Date(created_at), "MMM dd yyyy") : null}
      </td>
      <td className="text-right">
        <FormListItemMenu
          onEdit={onEdit}
          onPreview={onPreview}
          onChangeStatus={(status) => onChangeStatus(form, status)}
          status={status}
        />
      </td>
    </tr>
  );
};

export { FormListItem };
