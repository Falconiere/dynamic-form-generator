"use client";
import { FormHeader } from "../components/FormHeader";
import { FormDraggableArea } from "../components/FormDraggableArea";
import { FormBuilderQuestionList } from "./FormBuilderQuestionList";
import { useFormBuilderContext } from "../provider/FormBuilderProvider";
import { cn } from "@/lib/utils";
import { FormChart } from "../components/FormChart";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const FormBuilder = () => {
  const {
    handleOnQuestionChange,
    handleOnHeaderChange,
    handleOnAdd,
    handleOnSortDragEnd,
    handleOnRemove,
    values,
  } = useFormBuilderContext();
  const { title, description, questions, status, responses } = values;
  const [activeTab, setActiveTab] = useState<"form" | "response">("form");

  return (
    <div className="grid gap-4">
      <div className="flex">
        <span
          className={cn("text-center text-white rounded-md p-2 ", {
            "bg-green-500": status === "published",
            "bg-yellow-500": status === "draft",
            "bg-red-500": status === "archived",
          })}
        >
          {status}
        </span>
      </div>
      <div className="tabs grid grid-cols-3 text-center justify-between  gap-2">
        <Button
          className="tab tab-active bg-white p-4 rounded-md cursor-pointer"
          variant="ghost"
          onClick={() => setActiveTab("form")}
        >
          Form
        </Button>
        <Button
          className="tab bg-white p-4 rounded-md cursor-pointer"
          variant="ghost"
          onClick={() => setActiveTab("response")}
        >
          Responses
        </Button>
        <Button className="tab bg-white p-4 rounded-md" variant="ghost">
          Settings
        </Button>
      </div>
      {activeTab === "response" && <FormChart responses={responses} />}
      {activeTab === "form" && (
        <>
          <FormHeader
            value={{
              title,
              description,
            }}
            onChange={handleOnHeaderChange}
          />
          <FormBuilderQuestionList
            questions={questions}
            onChange={handleOnQuestionChange}
            onDelete={handleOnRemove}
            onDragEnd={handleOnSortDragEnd}
          />
          <FormDraggableArea
            onDropped={(element_type) => handleOnAdd({ element_type })}
          />
        </>
      )}
    </div>
  );
};

export { FormBuilder };
