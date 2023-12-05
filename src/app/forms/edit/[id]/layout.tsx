import { FormLayout } from "@/layouts/FormLayout";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => (
  <FormLayout>{children}</FormLayout>
);
export default Layout;
