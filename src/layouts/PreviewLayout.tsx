"use client";
import { useParams } from "next/navigation";
import { Layout } from "./components";
import { Button } from "@/components/ui/button";
import { NEXT_PUBLIC_APP_URL } from "@/constants/constants";
import { useToast } from "@/components/ui/use-toast";
import { useLocaleCtx } from "@/providers/LocaleProvider";
type PreviewLayoutProps = {
  children: React.ReactNode;
};

const PreviewLayout = ({ children }: PreviewLayoutProps) => {
  const { toast } = useToast();
  const { t } = useLocaleCtx();
  const params = useParams() as { id: string };
  const formUrl = `${NEXT_PUBLIC_APP_URL}/forms/${params.id}`;

  const onClipboardCopy = () => {
    navigator.clipboard.writeText(formUrl);
    toast({
      title: t("linkCopied"),
    });
  };

  return (
    <Layout.Wrapper>
      <Layout.Header
        action={
          <div className="flex flex-[1] self-end items-end justify-end gap-2">
            <Button onClick={onClipboardCopy}>{t("copyLink")}</Button>
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
