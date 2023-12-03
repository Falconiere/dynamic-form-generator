import { Layout } from "./components";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Layout.Wrapper>
      <Layout.Sidebar />
      <Layout.Container>
        <Layout.Header />
        <Layout.Content>{children}</Layout.Content>
      </Layout.Container>
    </Layout.Wrapper>
  );
};
export { MainLayout };
