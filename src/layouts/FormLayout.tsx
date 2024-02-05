"use client";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Layout } from "./components";
import { FormElementsList } from "@/domains/forms/components/FormElementsList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FormBuilderProvider,
  useFormBuilderContext,
} from "@/domains/forms/provider/FormBuilderProvider";
import { Form } from "@/backend/types/Form";
import { FormTabs } from "@/domains/forms/components/FormTabs";
import { formTabs } from "@/domains/forms/contants/formTabs";
import { useLocaleCtx } from "@/providers/LocaleProvider";

type FormLayoutProps = {
  children: React.ReactNode;
};
const FormLayout = ({ children }: FormLayoutProps) => {
  const {
    handleOnSubmit,
    isSubmitting,
    values: { id },
  } = useFormBuilderContext();
  const { t } = useLocaleCtx();
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout.Wrapper>
        <Layout.Header
          action={
            <div className="flex flex-[1] self-end items-end justify-end gap-2">
              <Link href={`/forms/preview/${id}`} target="_blank">
                <Button variant="secondary">{t("preview")}</Button>
              </Link>
              <Button onClick={handleOnSubmit} type="button">
                {isSubmitting ? t("saving") : t("publish")}
              </Button>
            </div>
          }
        />
        <Layout.Container className="w-full max-w-7xl mx-auto grid-cols-[280px,calc(100%-280px)] p-4">
          <FormElementsList />
          <Layout.Content className="grid px-4">
            {id ? <FormTabs links={formTabs(id)} /> : null}
            {children}
          </Layout.Content>
        </Layout.Container>
      </Layout.Wrapper>
    </DndProvider>
  );
};

type BuildProviderProps = {
  children: React.ReactNode;
  defaultValue: Form;
  responses?: any[];
};

const BuildProvider = ({ children, defaultValue }: BuildProviderProps) => {
  return (
    <FormBuilderProvider defaultValue={defaultValue}>
      <FormLayout>{children}</FormLayout>
    </FormBuilderProvider>
  );
};

export { BuildProvider as FormLayout };
