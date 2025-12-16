import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ChangeEventHandler, FocusEventHandler } from "react";

interface FormInputProps {
  placeholder: string;
  className?: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const FormInput = ({
  placeholder,
  className,
  name,
  value,
  onChange,
  onBlur,
}: FormInputProps) => {
  return (
    <Input
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={cn("w-full py-6.5 rounded-[30px] shadow-none", className)}
    />
  );
};

export default FormInput;
