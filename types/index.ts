import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Asset {
  name: string;
  symbol: string;
  currency: Currency;
  purchasePrice: number;
  quantity: number;
}

export interface Stock {
  id: number;
  symbol: string;
  account_id: Account;
  currency: Currency;
  purchase_price: number;
  quantity: number;
  notes?: string;
}

export type Currency = "CZK" | "USD" | "EUR";

export interface AssetWithMarketData extends Asset {
  currentPrice: number;
  perfomancePercentage: number;
  portfolioShare: number;
  currentValue: number;
  profit: number;
}

export interface Transaction {
  name: string;
  type: string;
  date: string;
  quantity: number;
  unitPrice: number;
  fee: number;
  currency: Currency;
  accountId: number;
  notes?: string;
  symbol: string;
  id: number;
}

export interface AccountBalance {
  id: number;
  currency: Currency;
  balance: number;
}

export interface Platform {
  id: number;
  name: string;
  url?: string | null;
  icon: string;
}

export interface Account {
  id: number;
  name: string;
  notes?: string | null;
  platform_id: Platform;
  transactions: number;
  account_balances: AccountBalance[];
}
