import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export interface Asset {
  name: string;
  symbol: string;
  currency: string;
  purchasePrice: number;
  quantity: number;
}

export interface AssetWithMarketData extends Asset {
  currentPrice: number;
  perfomancePercentage: number;
  portfolioShare: number;
  currentValue: number;
}

export interface Transaction {
    name: string;
    type: string;
    date: string;
    quantity: number;
    unitPrice: number;
    fee: number;
    currency: string;
    accountId: number;
    notes?: string;
    symbol: string;
    id: number;
  }

  export interface Platform {
	name: string;
	id: number;
	url: string;
	icon: string;
  }
  
  export interface Account {
	name: string;
	balances: {currency: "CZK" | "USD" | "EUR", balance: number}[];
	notes?: string;
	id: number;
	platformId?: number;
	customUrl?: string;
  }