import FormInput from "@/components/shared/FormInput";
import InputLabel from "@/components/shared/InputLabel";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bankDetailsSchema } from "@/lib/validations";
import { useState } from "react";
import { useFormik } from "formik";
import { FormData } from "@/app/types";

interface BankDetailsProps {
  onNext: () => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const BankDetails = ({ onNext, formData, setFormData }: BankDetailsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      bank: formData.bank || "",
      accountNumber: formData.accountNumber || "",
      accountName: formData.accountName || "",
    },
    validationSchema: bankDetailsSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      // API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData({ ...formData, ...values });
      setIsSubmitting(false);
      onNext();
    },
  });
  return (
    <div className="mt-10">
      <CardContent className="px-3 space-y-4">
        <div className="space-y-2">
          <InputLabel labelText="Bank" />
          <Select
            value={formik.values.bank}
            onValueChange={(value) => formik.setFieldValue("bank", value)}
            onOpenChange={() => formik.setFieldTouched("bank", true)}
          >
            <SelectTrigger className="w-full py-6.5 rounded-[30px] shadow-none">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gtb">GTBank</SelectItem>
              <SelectItem value="uba">UBA</SelectItem>
              <SelectItem value="access">Access Bank</SelectItem>
            </SelectContent>
          </Select>
          {formik.touched.bank && formik.errors.bank && (
            <p className="text-red-500 text-xs px-4">
              {formik.errors.bank as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <InputLabel labelText="Account number" />

          <FormInput
            name="accountNumber"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your account number"
          />
          {formik.touched.accountNumber && formik.errors.accountNumber && (
            <p className="text-red-500 text-xs px-4">
              {formik.errors.accountNumber as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <InputLabel labelText="Account name" />

          <FormInput
            name="accountName"
            value={formik.values.accountName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your account name"
          />
          {formik.touched.accountName && formik.errors.accountName && (
            <p className="text-red-500 text-xs px-4">
              {formik.errors.accountName as string}
            </p>
          )}
        </div>
      </CardContent>
      <Button
        onClick={() => formik.handleSubmit()}
        disabled={isSubmitting}
        className="w-full  cursor-pointer text-sm md:text-base text-[#E6FBF2] font-bold rounded-full mt-10 h-15"
      >
        {isSubmitting ? "Processing..." : "Next"}
      </Button>
    </div>
  );
};
export default BankDetails;
