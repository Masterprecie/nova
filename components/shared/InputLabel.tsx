import { Label } from "../ui/label";

const InputLabel = ({ labelText }: { labelText: string }) => {
  return (
    <div>
      <Label className="text-sm block  md:text-base font-medium text-[#013941] ">
        {labelText}
      </Label>
    </div>
  );
};

export default InputLabel;
