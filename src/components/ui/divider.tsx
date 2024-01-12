import { cn } from "@/utils/utils";

type DividerProps = {
  className?: string;
};
const Divider = ({ className }: DividerProps) => (
  <div className={cn("divider h-[2px] bg-slate-200 my-4", className)} />
);
Divider.displayName = "Divider";
export { Divider };
