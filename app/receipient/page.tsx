"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import BankDetails from "./components/BankDetails";
import ContactDetails from "./components/ContactDetails";
import CryptoSend from "./components/CryptoSend";
import Success from "./components/Success";
import CardLayout from "../layout/CardLayout";

const RecipientFlow = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    bank: "",
    accountNumber: "",
    accountName: "",
    email: "",
    phone: "",
  });
  return (
    <CardLayout>
      {step !== 4 && (
        <CardHeader className="relative flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute cursor-pointer left-0"
            onClick={() => setStep((s) => (s > 1 ? s - 1 : s))}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <p className="text-base md:text-xl text-primary font-medium text-center">
            {step === 3 ? "Send ETH to the address below" : "Recipient details"}
          </p>
        </CardHeader>
      )}

      {step === 1 && (
        <BankDetails
          onNext={() => setStep(2)}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 2 && (
        <ContactDetails
          onNext={() => setStep(3)}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 3 && <CryptoSend onNext={() => setStep(4)} />}
      {step === 4 && <Success formData={formData} />}
    </CardLayout>
  );
};
export default RecipientFlow;
