import { HomeLayout } from "@/layouts/HomeLayout";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <HomeLayout>{children}</HomeLayout>
);

export default Layout;
