import React from "react";
import { SelectItem } from "../ui/select";

const IconSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectItem>,
  React.ComponentPropsWithoutRef<typeof SelectItem> & { icon?: React.ReactNode }
>(({ className, children, icon, ...props }, ref) => (
  <SelectItem
    ref={ref}
    className={`flex items-center gap-2 ${className}`}
    {...props}
  >
    {icon && (
      <span className="shrink-0 w-5 h-5 flex items-center justify-center">
        {icon}
      </span>
    )}
    <span>{children}</span>
  </SelectItem>
));
IconSelectItem.displayName = "IconSelectItem";
export default IconSelectItem;
