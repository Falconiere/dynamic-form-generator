import { Layout } from "./components";
type ClientFormLayoutProps = {
  children: React.ReactNode;
};

const ClientFormLayout = ({ children }: ClientFormLayoutProps) => {
  return (
    <Layout.Wrapper className="grid grid-rows-auto">
      <Layout.Container>
        <Layout.Content>{children}</Layout.Content>
      </Layout.Container>
    </Layout.Wrapper>
  );
};
export { ClientFormLayout };
