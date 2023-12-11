import { PreviewLayout } from "@/layouts/PreviewLayout";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => (
  <PreviewLayout>{children}</PreviewLayout>
);

export default Layout;
