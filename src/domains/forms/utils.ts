import { Option } from "@/server/types/DynamicForm";


const convertStringToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const checkIfOption = (options: Option[], label: string) => {
  return options.some((option) => option.label.trim() === label.trim());
};

const isLabelValid = ({
  currentLabel,
  options,
}: {
  currentLabel: string;
  options: Option[];
}) => {
  return (
    typeof currentLabel === "string" &&
    currentLabel.length > 0 &&
    !checkIfOption(options, currentLabel)
  );
};


export { convertStringToSlug, checkIfOption, isLabelValid  };