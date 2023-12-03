import { MainLayout } from "@/layouts/MainLayout";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <MainLayout>{children}</MainLayout>
);

export default Layout;
