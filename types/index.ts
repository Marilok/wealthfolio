import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export interface Asset {
  name: string;
  value?: number;
  currency: string;
  quantity: number;
  symbol: string;
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