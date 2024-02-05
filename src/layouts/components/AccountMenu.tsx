import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import avatar from "@/assets/images/avatar.png";
import { useLocaleCtx } from "@/providers/LocaleProvider";

const AccountMenu = () => {
  const { t } = useLocaleCtx();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image src={avatar} alt="avatar" className="w-12 h-12 rounded-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action="/auth/signout" method="post">
            <button className="button block" type="submit">
              {t("logout")}
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AccountMenu };
