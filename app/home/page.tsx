"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import CardLayout from "../layout/CardLayout";
import { useFormik } from "formik";
import { transactionSchema } from "@/lib/validations";
import { currencyOptions, exchangeRates, tokenOptions } from "@/lib/mockData";
import SearchablePopover from "@/components/shared/SearchablePopover";
import WalletSelect from "./components/WalletSelect";
import { useState } from "react";

const MainPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      payAmount: "",
      selectedToken: "eth",
      selectedCurrency: "ngn",
      payFromWallet: "Metamask",
      payToWallet: "Metamask",
    },
    validationSchema: transactionSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      // Calculate receive amount
      const rate = exchangeRates[values.selectedToken][values.selectedCurrency];
      const receiveAmount = (parseFloat(values.payAmount) * rate).toFixed(2);

      // Store transaction data in sessionStorage
      const transactionData = {
        payAmount: values.payAmount,
        receiveAmount,
        token: values.selectedToken,
        currency: values.selectedCurrency,
        payFromWallet: values.payFromWallet,
        payToWallet: values.payToWallet,
      };

      sessionStorage.setItem(
        "transactionData",
        JSON.stringify(transactionData)
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      router.push("/receipient");
    },
  });

  // Calculate receive amount in real-time
  const calculateReceiveAmount = () => {
    if (
      formik.values.payAmount &&
      !isNaN(parseFloat(formik.values.payAmount))
    ) {
      const rate =
        exchangeRates[formik.values.selectedToken][
          formik.values.selectedCurrency
        ];
      return (parseFloat(formik.values.payAmount) * rate).toFixed(2);
    }
    return "0.00";
  };

  return (
    <CardLayout>
      {/* Tabs */}
      <Tabs defaultValue="crypto-cash" className="max-w-98 mx-auto">
        <TabsList className="grid grid-cols-3 rounded-full ">
          <TabsTrigger value="crypto-cash" className="rounded-full ">
            Crypto to cash
          </TabsTrigger>
          <TabsTrigger value="cash-crypto" className="rounded-full">
            Cash to crypto
          </TabsTrigger>
          <TabsTrigger value="crypto-loan" className="rounded-full">
            Crypto to fiat loan
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-6">
        {/* You pay */}
        <div className="border border-[#E0E0E0] rounded-[30px] p-6 mt-10 space-y-2">
          <label className="text-sm md:text-base font-medium text-[#828282] ">
            You pay
          </label>
          <div className="flex items-center justify-between gap-2">
            <Input
              name="payAmount"
              type="text"
              step="0.01"
              value={formik.values.payAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0.00"
              className="font-semibold text-black text-2xl placeholder:text-2xl border-none shadow-none focus-visible:ring-0 p-0 "
            />
            <SearchablePopover
              value={formik.values.selectedToken}
              onChange={(value) => formik.setFieldValue("selectedToken", value)}
              options={tokenOptions}
              placeholder="Select token"
              type="token"
              error={formik.errors.selectedToken}
              touched={formik.touched.selectedToken}
            />
          </div>
          {formik.touched.payAmount && formik.errors.payAmount && (
            <p className="text-red-500 text-xs px-4">
              {formik.errors.payAmount}
            </p>
          )}
        </div>

        {/* You receive */}
        <div className="border border-[#E0E0E0] rounded-[30px] p-6 mt-10 space-y-2">
          <label className="text-sm md:text-base font-medium text-[#828282] ">
            You receive
          </label>
          <div className="flex items-center justify-between gap-2">
            <div className="font-semibold text-black text-2xl">
              {calculateReceiveAmount()}
            </div>

            <SearchablePopover
              value={formik.values.selectedCurrency}
              onChange={(value) =>
                formik.setFieldValue("selectedCurrency", value)
              }
              options={currencyOptions}
              placeholder="Select currency"
              type="currency"
              error={formik.errors.selectedCurrency}
              touched={formik.touched.selectedCurrency}
            />
          </div>
        </div>

        {/* Pay from */}
        <WalletSelect
          label="Pay from"
          value={formik.values.payFromWallet}
          onChange={(value) => formik.setFieldValue("payFromWallet", value)}
          error={formik.errors.payFromWallet}
          touched={formik.touched.payFromWallet}
        />

        {/* Pay to */}
        <WalletSelect
          label="Pay To"
          value={formik.values.payToWallet}
          onChange={(value) => formik.setFieldValue("payToWallet", value)}
          error={formik.errors.payToWallet}
          touched={formik.touched.payToWallet}
        />
      </div>
      {/* Convert */}
      <Button
        onClick={() => formik.handleSubmit()}
        className="w-full  text-sm md:text-base text-[#E6FBF2] font-bold cursor-pointer rounded-full mt-10 h-15"
      >
        {isSubmitting ? "Processing..." : "   Convert now"}
      </Button>
    </CardLayout>
  );
};
export default MainPage;
