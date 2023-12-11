import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};
const Container = ({ children, className }: ContainerProps) => (
  <div className={cn("grid overflow-hidden", className)}>{children}</div>
);
export { Container };
