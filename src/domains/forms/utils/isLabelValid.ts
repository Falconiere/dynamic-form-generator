import { Option } from "@/backend/types/Form";
import { checkIfOption } from "./checkIfOption";

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

export { isLabelValid };