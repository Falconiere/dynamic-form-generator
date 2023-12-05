import { cn } from "@/lib/utils";

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};
const Wrapper = ({ children, className }: WrapperProps) => (
  <main
    className={cn(
      "grid grid-cols-[280px,calc(100%-560px),280px] bg-slate-100 h-full overflow-hidden",
      className
    )}
  >
    {children}
  </main>
);
export { Wrapper };
