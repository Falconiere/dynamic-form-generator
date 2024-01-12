import { cn } from "@/lib/utils";
import { Form } from "@/server/types/Form";
import { FormListItemMenu } from "./FormListItemMenu";
import { format } from "date-fns";
import { forms } from "@prisma/client";

type FormListItemProps = {
  form: forms;
  onChangeStatus: (form: forms, status: Form["status"]) => void;
  onEdit: () => void;
  onPreview: () => void;
};
const FormListItem = ({
  form,
  onChangeStatus,
  onEdit,
  onPreview,
}: FormListItemProps) => {
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
        {status}
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
