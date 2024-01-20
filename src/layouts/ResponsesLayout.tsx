import { Layout } from "./components";
type ResponsesLayoutProps = {
  children: React.ReactNode;
};
const ResponsesLayout = ({ children }: ResponsesLayoutProps) => {
  return (
    <Layout.Wrapper>
      <Layout.Header />
      <Layout.Container className="w-full max-w-7xl mx-auto grid-cols-none p-4">
        <Layout.Content className="grid px-4">{children}</Layout.Content>
      </Layout.Container>
    </Layout.Wrapper>
  );
};

export { ResponsesLayout };
