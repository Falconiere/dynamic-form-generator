import { cn } from "@/utils/utils";

type ContentProps = {
  children: React.ReactNode;
  className?: string;
};

const Content = ({ children, className }: ContentProps) => (
  <div className="w-full overflow-y-auto">
    <div className={cn("w-full max-w-7xl mx-auto relative", className)}>
      {children}
    </div>
  </div>
);
export { Content };
