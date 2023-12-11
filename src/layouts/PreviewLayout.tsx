import { Layout } from "./components";
import { Button } from "@/components/ui/button";
type PreviewLayoutProps = {
  children: React.ReactNode;
};

const PreviewLayout = ({ children }: PreviewLayoutProps) => {
  return (
    <Layout.Wrapper>
      <Layout.Header
        action={
          <div className="flex flex-[1] self-end items-end justify-end gap-2">
            <Button>Share</Button>
          </div>
        }
      />
      <Layout.Container>
        <Layout.Content>{children}</Layout.Content>
      </Layout.Container>
    </Layout.Wrapper>
  );
};
export { PreviewLayout };
