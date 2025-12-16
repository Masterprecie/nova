import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ChangeEventHandler, FocusEventHandler } from "react";

interface FormInputProps {
  placeholder: string;
  className?: string;
  name: string;
  type?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const FormInput = ({
  placeholder,
  className,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
}: FormInputProps) => {
  return (
    <Input
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={cn(
        "w-full border-[#E0E0E0] py-6.5 rounded-[30px] shadow-none",
        className
      )}
    />
  );
};

export default FormInput;
