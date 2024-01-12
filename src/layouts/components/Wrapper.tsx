import { cn } from "@/utils/utils";

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};
const Wrapper = ({ children, className }: WrapperProps) => (
  <main
    className={cn(
      "grid  grid-rows-[80px,calc(100%-90px)] bg-slate-100 h-full overflow-hidden",
      className
    )}
  >
    {children}
  </main>
);
export { Wrapper };
