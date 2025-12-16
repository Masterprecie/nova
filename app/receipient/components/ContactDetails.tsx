import { FormData } from "@/app/types";
import FormInput from "@/components/shared/FormInput";
import InputLabel from "@/components/shared/InputLabel";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { contactDetailsSchema } from "@/lib/validations";
import { useFormik } from "formik";
import { useState } from "react";

interface ContactDetailsProps {
  onNext: () => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const ContactDetails = ({
  onNext,
  formData,
  setFormData,
}: ContactDetailsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: formData.email || "",
      phone: formData.phone || "",
    },
    validationSchema: contactDetailsSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData({ ...formData, ...values });
      setIsSubmitting(false);
      onNext();
    },
  });

  return (
    <div className="mt-10">
      <CardContent className="px-3 space-y-8">
        <div className="space-y-2">
          <InputLabel labelText="Recipient email" />
          <FormInput
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter recipient email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs px-4">
              {formik.errors.email as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <InputLabel labelText="Recipient phone number" />

          <div className="flex ">
            <Input
              className="w-20 rounded-none rounded-l-[30px] py-6.5 "
              value="+234"
              readOnly
            />

            <Input
              name="phone"
              className="flex-1 py-6.5 rounded-none rounded-r-[30px]"
              placeholder="8012345678"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-xs px-4">
              {formik.errors.phone as string}
            </p>
          )}
        </div>
      </CardContent>
      <Button
        className="w-full cursor-pointer text-sm md:text-base text-[#E6FBF2] font-bold rounded-full mt-10 h-15"
        onClick={() => formik.handleSubmit()}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Next"}
      </Button>
    </div>
  );
};
export default ContactDetails;
