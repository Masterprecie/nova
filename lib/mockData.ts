import metamask from "@/assets/svg/metamask.svg";
import other from "@/assets/svg/other.svg";
import rainbow from "@/assets/svg/rainbow.svg";
import wallet from "@/assets/svg/walletConnect.svg";
import eth from "@/assets/svg/eth-logo.svg";
import celo from "@/assets/svg/celo.svg";
import ton from "@/assets/svg/ton.svg";
import bnb from "@/assets/svg/bnb.svg";
import ngn from "@/assets/svg/ng-log.svg";
import us from "@/assets/images/us.jpg";
import eur from "@/assets/images/eur.webp";
import { StaticImageData } from "next/image";

// Wallet options data
export const walletOptions = [
  { value: "Metamask", label: "Metamask", icon: metamask },
  { value: "Rainbow", label: "Rainbow", icon: rainbow },
  { value: "WalletConnect", label: "WalletConnect", icon: wallet },
  {
    value: "Others",
    label: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)",
    icon: other,
  },
];

export const tokenOptions = [
  { value: "eth", label: "USDT - ETH", displayLabel: "ETH", icon: eth },
  { value: "celo", label: "USDT - CELO", displayLabel: "CELO", icon: celo },
  { value: "ton", label: "USDT - TON", displayLabel: "TON", icon: ton },
  { value: "bnb", label: "USDT - BNB", displayLabel: "BNB", icon: bnb },
];

export const currencyOptions = [
  { value: "ngn", label: "NGN", displayLabel: "NGN", icon: ngn },
  { value: "usd", label: "USD", displayLabel: "USD", icon: us },
  { value: "eur", label: "EUR", displayLabel: "EUR", icon: eur },
];

export const exchangeRates: Record<string, Record<string, number>> = {
  eth: { ngn: 1650000, usd: 2500, eur: 2300 },
  celo: { ngn: 825, usd: 1.25, eur: 1.15 },
  ton: { ngn: 3300, usd: 5, eur: 4.6 },
  bnb: { ngn: 330000, usd: 500, eur: 460 },
};

export const tokenIcons: Record<string, string> = {
  eth: eth,
  celo: celo,
  ton: ton,
  bnb: bnb,
};

export const currencyIcons: Record<string, string | StaticImageData> = {
  ngn: ngn,
  usd: us,
  eur: eur,
};

export const countries = [
  { code: "+234", name: "Nigeria", flag: ngn },
  { code: "+1", name: "USA", flag: us },
  { code: "+44", name: "UK", flag: eur },
];
