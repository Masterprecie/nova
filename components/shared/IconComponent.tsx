import { currencyIcons, tokenIcons } from "@/lib/mockData";
import Image from "next/image";

interface IconComponentProps {
  value: string;
  type: "token" | "currency";
}

const IconComponent = ({ value, type }: IconComponentProps) => {
  const iconSrc = type === "token" ? tokenIcons[value] : currencyIcons[value];

  return iconSrc ? (
    <Image
      src={iconSrc}
      alt={value.toUpperCase()}
      width={20}
      height={20}
      className="w-5 h-5"
    />
  ) : null;
};

export default IconComponent;
