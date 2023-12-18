import { ResponsesLayout } from "@/layouts/ResponsesLayout";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => (
  <ResponsesLayout>{children}</ResponsesLayout>
);
export default Layout;
