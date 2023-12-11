"use client";
import { Divider } from "@/components/ui/divider";
import { Form } from "@/server/types/Form";
import { MyForms } from "../containers/MyForms";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type ListFormsProps = {
  forms?: Form[];
};

const Tab = ({ active, children, onClick }: any) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "bg-white p-4 py-8 shadow-md cursor-pointer rounded-md font-semibold text-xl text-center",
        {
          "bg-gray-300": active,
        }
      )}
    >
      {children}
    </Button>
  );
};
const ListForms = ({ forms }: ListFormsProps) => {
  const router = useRouter();
  const params = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<Form["status"]>("published");
  const publishedForms = forms?.filter((form) => form.status === "published");
  const draftForms = forms?.filter((form) => form.status === "draft");
  const archivedForms = forms?.filter((form) => form.status === "archived");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") ?? "published";
    if (hash?.length > 0) {
      setActiveTab(hash as Form["status"]);
    }
    setIsLoaded(true);
  }, [params]);

  const handleChangeTab = (tab: Form["status"]) => {
    setActiveTab(tab);
    router.push(`/forms#${tab}`);
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-3 px-4 pt-8">
        <Tab
          onClick={() => handleChangeTab("published")}
          active={activeTab === "published"}
        >
          Published ({publishedForms?.length})
        </Tab>
        <Tab
          onClick={() => handleChangeTab("draft")}
          active={activeTab === "draft"}
        >
          Draft ({draftForms?.length})
        </Tab>
        <Tab
          onClick={() => handleChangeTab("archived")}
          active={activeTab === "archived"}
        >
          Archived ({archivedForms?.length})
        </Tab>
      </div>
      {isLoaded ? (
        <>
          {activeTab === "published" && <MyForms forms={publishedForms} />}
          {activeTab === "draft" && <MyForms forms={draftForms} />}
          {activeTab === "archived" && <MyForms forms={archivedForms} />}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-gray-400">Loading...</p>
        </div>
      )}
    </>
  );
};

export { ListForms };
