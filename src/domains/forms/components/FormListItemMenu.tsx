import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Form } from "@/backend/types/Form";

import { MoreVertical } from "lucide-react";
import { useLocaleCtx } from "@/providers/LocaleProvider";

type FormListItemMenuProps = {
  onEdit: () => void;
  onPreview: () => void;
  onChangeStatus: (status: Form["status"]) => void;
  status: Form["status"];
};
const FormListItemMenu = ({
  onEdit,
  onPreview,
  onChangeStatus,
  status,
}: FormListItemMenuProps) => {
  const { t } = useLocaleCtx();
  const nextStatus = status === "published" ? "archived" : "published";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
          {t("edit")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPreview} className="cursor-pointer">
          {t("preview")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChangeStatus(nextStatus)}
          className="cursor-pointer capitalize"
        >
          {status === "published" ? t("archive") : t("publish")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { FormListItemMenu };
