import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Form } from "@/backend/types/Form";

import { MoreVertical } from "lucide-react";

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
  const nextStatus = status === "published" ? "archived" : "published";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPreview} className="cursor-pointer">
          Preview
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChangeStatus(nextStatus)}
          className="cursor-pointer capitalize"
        >
          {status === "published" ? "Archive" : "Publish"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { FormListItemMenu };
