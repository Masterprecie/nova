import { FormData } from "@/app/types";
import FormInput from "@/components/shared/FormInput";
import InputLabel from "@/components/shared/InputLabel";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { contactDetailsSchema } from "@/lib/validations";
import { useFormik } from "formik";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ngn from "@/assets/svg/ng-log.svg";
import Image from "next/image";
import { countries } from "@/lib/mockData";

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
  const [selectedCountry, setSelectedCountry] = useState(
    formData.countryCode || "+234"
  );

  const formik = useFormik({
    initialValues: {
      email: formData.email || "",
      phone: formData.phone || "",
    },
    validationSchema: contactDetailsSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData({
        ...formData,
        ...values,
        countryCode: selectedCountry,
        phone: `${selectedCountry}${values.phone}`,
      });
      setIsSubmitting(false);
      onNext();
    },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    formik.setFieldValue("phone", value);
  };

  // Get the currently selected country data
  const selectedCountryData = countries.find(
    (c) => c.code === selectedCountry
  ) || { code: "+234", name: "Nigeria", flag: ngn };

  return (
    <div className="mt-10">
      <CardContent className="px-3 space-y-8">
        <div className="space-y-2">
          <InputLabel labelText="Recipient email" />
          <FormInput
            name="email"
            type="email"
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

          <div className="flex">
            <Select
              value={selectedCountry}
              onValueChange={(value) => {
                setSelectedCountry(value);
              }}
            >
              <SelectTrigger className="w-32 rounded-none rounded-l-[30px] py-6.5 border-r-0 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="+234">
                  <div className="flex items-center gap-3">
                    <span>{selectedCountryData.code}</span>

                    <div className="w-6 h-4 relative">
                      <Image
                        src={selectedCountryData.flag}
                        alt={selectedCountryData.name}
                        fill
                        className="object-cover rounded"
                        sizes="24px"
                      />
                    </div>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-75">
                {countries.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.code}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-4 relative">
                        <Image
                          src={country.flag}
                          alt={country.name}
                          fill
                          className="object-cover rounded"
                          sizes="24px"
                        />
                      </div>
                      <span className="flex-1">{country.name}</span>
                      <span className="text-muted-foreground">
                        {country.code}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              name="phone"
              type="tel"
              className="flex-1 py-6.5 rounded-none rounded-r-[30px]"
              placeholder="8012345678"
              value={formik.values.phone}
              onChange={handlePhoneChange}
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
