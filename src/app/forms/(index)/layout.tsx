import { ListFormLayout } from "@/layouts/ListFormLayout";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <ListFormLayout>{children}</ListFormLayout>
);

export default Layout;
