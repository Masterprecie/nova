import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { FormData } from "@/app/types";
import Image from "next/image";
import logo from "@/assets/svg/logo.svg";

const Success = ({ formData }: { formData: FormData }) => {
  const [copied, setCopied] = useState(false);
  const [transactionId] = useState(
    () => "NC" + Math.random().toString(36).slice(2, 11).toUpperCase()
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CardContent className="py-5 flex flex-col items-center text-center gap-4">
      <div>
        <Image
          src={logo}
          alt="logo"
          width={500}
          height={500}
          className="w-full"
        />
      </div>
      <div className="size-16.25 mt-16.5 rounded-full bg-[#219653] flex items-center justify-center">
        <Check className="size-10 text-white" />
      </div>

      <div className="space-y-1 mt-4">
        <p className="font-medium text-[#000E10] text-lg md:text-2xl">
          Your transaction is processing.
        </p>
        <p className="text-base md:text-xl text-[#4F4F4F]">
          The recipient will receive it shortly.
        </p>
      </div>

      <div className="w-full mt-6 rounded-[10px] bg-[#F7F7F7] px-3 py-4  flex items-center justify-between">
        <span className="text-[#4F4F4F] text-sm">Transaction ID</span>
        <div className="flex items-center gap-2 font-normal text-base text-primary">
          {transactionId}
          <button onClick={handleCopy}>
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      <Link href={"/"}>
        <Button variant="ghost" className="mt-4">
          Go back to home
        </Button>
      </Link>
    </CardContent>
  );
};

export default Success;
