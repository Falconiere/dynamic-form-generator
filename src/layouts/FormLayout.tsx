import { Layout } from "./components";

type FormLayoutProps = {
  children: React.ReactNode;
};
const FormLayout = ({ children }: FormLayoutProps) => {
  return (
    <Layout.Wrapper>
      <Layout.Sidebar />
      <Layout.Container>
        <Layout.Header />
        <Layout.Content>{children}</Layout.Content>
      </Layout.Container>
      <Layout.SideBarFormFields />
    </Layout.Wrapper>
  );
};

export { FormLayout };
