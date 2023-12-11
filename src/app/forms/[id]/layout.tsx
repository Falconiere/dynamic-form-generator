import { ClientFormLayout } from "@/layouts/ClientFormLayout";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => (
  <ClientFormLayout>{children}</ClientFormLayout>
);

export default Layout;
