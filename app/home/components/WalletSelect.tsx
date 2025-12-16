import IconSelectItem from "@/components/shared/CustomSelect";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { walletOptions } from "@/lib/mockData";
import Image from "next/image";

interface WalletSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  touched?: boolean;
}

const WalletSelect = ({
  label,
  value,
  onChange,
  error,
  touched,
}: WalletSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm block mb-4 md:text-base font-medium text-primary ">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={`w-full py-6.5 rounded-[30px] shadow-none ${
            error && touched ? "border-red-500" : ""
          }`}
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {walletOptions.map((wallet) => (
            <IconSelectItem
              key={wallet.value}
              value={wallet.value}
              icon={
                <Image
                  src={wallet.icon}
                  alt={wallet.label}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              }
            >
              {wallet.label}
            </IconSelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && touched && <p className="text-red-500 text-xs px-4">{error}</p>}
    </div>
  );
};

export default WalletSelect;
