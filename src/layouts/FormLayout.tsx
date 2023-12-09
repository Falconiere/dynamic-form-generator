"use client";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Layout } from "./components";

type FormLayoutProps = {
  children: React.ReactNode;
};
const FormLayout = ({ children }: FormLayoutProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout.Wrapper>
        <Layout.Sidebar />
        <Layout.Container>
          <Layout.Header />
          <Layout.Content>{children}</Layout.Content>
        </Layout.Container>
        <Layout.SideBarFormFields />
      </Layout.Wrapper>
    </DndProvider>
  );
};

export { FormLayout };
