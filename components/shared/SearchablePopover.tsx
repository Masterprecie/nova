import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import IconComponent from "./IconComponent";

interface SearchablePopoverProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    displayLabel: string;
    icon: string;
  }>;
  placeholder: string;
  type: "token" | "currency";
  error?: string;
  touched?: boolean;
}

const SearchablePopover = ({
  value,
  onChange,
  options,
  placeholder,
  type,
  error,
  touched,
}: SearchablePopoverProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter options based on search query
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.displayLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-25 bg-[#F7F7F7] rounded-4xl border-[#E0E0E0] justify-between "
          >
            {selectedOption ? (
              <div className="flex items-center gap-2">
                <IconComponent value={selectedOption.value} type={type} />
                <span className="font-medium">
                  {selectedOption.displayLabel}
                </span>
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-70 p-0" align="end">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${
                  type === "token" ? "tokens" : "currencies"
                }...`}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <ScrollArea className="">
            {filteredOptions.length > 0 ? (
              <div className="p-1">
                {filteredOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    className="w-full justify-start px-3 py-6 text-base hover:bg-gray-50"
                    onClick={() => handleSelect(option.value)}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={option.icon}
                        alt={option.label}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                No {type === "token" ? "tokens" : "currencies"} found.
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
      {error && touched && (
        <p className="text-red-500 text-xs mt-1 px-4">{error}</p>
      )}
    </div>
  );
};
export default SearchablePopover;
