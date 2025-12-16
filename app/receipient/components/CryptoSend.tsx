import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import info from "@/assets/svg/info.svg";
import { useState } from "react";
interface TransactionData {
  payAmount: string;
  receiveAmount: string;
  token: string;
  currency: string;
  payFromWallet: string;
  payToWallet: string;
}
const CryptoSend = ({ onNext }: { onNext: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(() => {
      if (typeof window === "undefined") return null;

      const data = sessionStorage.getItem("transactionData");
      return data ? JSON.parse(data) : null;
    });

  const [walletAddress] = useState(
    () => "0x" + Math.random().toString(16).slice(2, 40).toUpperCase()
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get token display name
  const getTokenDisplay = (token: string) => {
    return token.toUpperCase();
  };

  // Get wallet display name
  const getWalletDisplay = (wallet: string) => {
    if (wallet === "Others") return "Other";
    return wallet;
  };

  if (!transactionData) {
    return (
      <div className="mt-8">
        <CardContent>
          <p className="text-center text-muted-foreground">Loading...</p>
        </CardContent>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <CardContent className="px-3 space-y-4">
        <div className="w-62.5 h-10 mx-auto flex items-center justify-between text-base font-medium bg-[#E6FBF2] rounded-[30px] px-3 py-2">
          <span className="text-xs truncate">4LiV4YjbxsL6739MKghUd</span>
          <Button onClick={handleCopy} variant="ghost" size="icon">
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="mt-16 py-4 px-6 rounded-[10px] bg-[#F7F7F7] space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Amount to send</p>
            <p className="text-sm font-medium">
              {transactionData.payAmount}{" "}
              {getTokenDisplay(transactionData.token)}
            </p>{" "}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">You will receive</p>
            <p className="text-sm font-medium">
              {transactionData.receiveAmount}{" "}
              {transactionData.currency.toUpperCase()}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Network</p>
            <p className="text-sm font-medium">
              {getTokenDisplay(transactionData.token)}
            </p>{" "}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Wallet</p>
            {getWalletDisplay(transactionData.payFromWallet)}
          </div>
        </div>

        <div className="flex gap-3  text-sm text-[#4F4F4F]">
          <Image src={info} alt="info" width={24} height={24} />
          <p className="pt-3">
            Only send USDT to this address. Ensure the sender is on the{" "}
            {getTokenDisplay(transactionData.token)} network otherwise you might
            lose your deposit
          </p>
        </div>
      </CardContent>

      <Button
        className="w-full h-15 text-sm md:text-base text-[#E6FBF2] font-bold cursor-pointer rounded-full mt-8 md:mt-32.75"
        onClick={onNext}
      >
        I have sent it
      </Button>
    </div>
  );
};
export default CryptoSend;
