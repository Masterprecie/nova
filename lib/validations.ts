import * as Yup from "yup";

export const bankDetailsSchema = Yup.object({
  bank: Yup.string().required("Bank is required"),
  accountNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Account number must be exactly 10 digits")
    .required("Account number is required"),
  accountName: Yup.string()
    .min(3, "Account name must be at least 3 characters")
    .required("Account name is required"),
});

export const contactDetailsSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,11}$/, "Phone number must be 10-11 digits")
    .required("Phone number is required"),
});

export const transactionSchema = Yup.object({
  payAmount: Yup.number()
    .positive("Amount must be greater than 0")
    .required("Amount is required")
    .min(0.01, "Minimum amount is 0.01"),
  selectedToken: Yup.string().required("Please select a token"),
  selectedCurrency: Yup.string().required("Please select a currency"),
  payFromWallet: Yup.string().required("Please select a wallet to pay from"),
  payToWallet: Yup.string().required("Please select a wallet to pay to"),
});
