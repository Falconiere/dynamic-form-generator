"use client";
import { Layout } from "./components";
import { Button } from "@/components/ui/button";
import { handleOnCreateDraft } from "@/domains/forms/utils";
import { useLocaleCtx } from "@/providers/LocaleProvider";
import { useState } from "react";

type ListFormLayoutProps = {
  children: React.ReactNode;
};

const ListFormLayout = ({ children }: ListFormLayoutProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLocaleCtx();
  const onCreateDraft = async () => {
    setIsSubmitting(true);
    const res = (await handleOnCreateDraft()) as { id: string };
    setIsSubmitting(false);
    if (!res) return;
    window.location.href = `/forms/edit/${res.id}`;
  };

  return (
    <Layout.Wrapper>
      <Layout.Header
        action={
          <div className="flex flex-[1] self-end items-end justify-end gap-2">
            <Button onClick={onCreateDraft}>
              {isSubmitting ? t("creating") : t("create")}
            </Button>
          </div>
        }
      />
      <Layout.Container>
        <Layout.Content>{children}</Layout.Content>
      </Layout.Container>
    </Layout.Wrapper>
  );
};
export { ListFormLayout };
