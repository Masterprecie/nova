import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

type CardLayoutProps = {
  children: ReactNode;
};

const CardLayout = ({ children }: CardLayoutProps) => {
  return (
    <div className="flex flex-col p-4 md:p-0 justify-center items-center min-h-screen">
      <Card className="p-0 w-full max-w-160 rounded-[30px] border border-[#CCF6E5]">
        <CardContent className="px-3 md:px-16 py-5 md:py-10">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default CardLayout;
