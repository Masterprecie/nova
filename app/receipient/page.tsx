"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import BankDetails from "./components/BankDetails";
import ContactDetails from "./components/ContactDetails";
import CryptoSend from "./components/CryptoSend";
import Success from "./components/Success";
import CardLayout from "../layout/CardLayout";
import Link from "next/link";

const RecipientFlow = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    bank: "",
    accountNumber: "",
    accountName: "",
    email: "",
    phone: "",
    countryCode: "",
  });

  return (
    <CardLayout>
      {step !== 4 && (
        <CardHeader className="relative flex items-center justify-center">
          {/* Conditionally render Link or Button */}
          {step === 1 ? (
            <Link href="/" className="absolute left-0">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="absolute cursor-pointer left-0"
              onClick={() => setStep((s) => s - 1)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          )}

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
