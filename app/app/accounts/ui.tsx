"use client";

import { currencies } from "@/data/currencies";
import { defaultCurrency } from "@/data/settings";
import { formatMonetaryValue } from "@/functions";
import { getAccounts } from "@/functions/getAccounts";
import { Currency } from "@/types";
import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useState } from "react";
import AccountsTable from "./components/AccountsTable";
import NewAccount from "./components/NewAccount";

export default function UI({
  platforms,
  totalValue,
}: {
  platforms: any[];
  totalValue: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  let list = useAsyncList({
    async load({ signal }) {
      const accounts = await getAccounts();

      return {
        items: accounts,
      };
    },
    //TODO: rewrite this to use server-side sorting
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a: any, b: any) => {
          //@ts-expect-error
          let first = a[sortDescriptor.column];
          //@ts-expect-error
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <>
      <NewAccount platforms={platforms} list={list} />
      <AccountsTable
        list={list}
        platforms={platforms}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Card className="w-60 px-4 py-2 mr-auto">
        <CardHeader className="uppercase font-bold text-lg">
          <h2>Cash balances</h2>
        </CardHeader>
        <CardBody className="flex flex-row gap-8">
          <AggregatedBalances list={list} totalValue={totalValue} />
        </CardBody>
      </Card>
    </>
  );
}

const AggregatedBalances = ({ list, totalValue }: any) => {
  const balanceMap: { [currency: string]: number } = {};

  list.items?.forEach((account: any) => {
    account.account_balances?.forEach((balance: any) => {
      const { currency, balance: balanceValue } = balance;
      if (balanceMap[currency]) {
        balanceMap[currency] += balanceValue;
      } else {
        balanceMap[currency] = balanceValue;
      }
    });
  });
  const getCurrencyFlag = (currency: Currency, currencies: any) => {
    const item = currencies.find((item: any) => item.value === currency);
    return item?.flagSrc;
  };

  const aggregatedBalances = Object.entries(balanceMap).map(
    ([currency, balance]) => (
      <div
        key={currency}
        className="flex flex-row gap-2 justify-between w-full"
      >
        <Avatar
          /* @ts-expect-error */
          src={getCurrencyFlag(currency, currencies)}
          className="h-6 w-6"
        />
        <p className="text-right ml-auto">
          {/* @ts-expect-error */}
          {formatMonetaryValue(balance, currency)}
        </p>
      </div>
    ),
  );

  return (
    <div className="flex flex-col gap-2 text-right w-full">
      {aggregatedBalances}

      <Divider className="my-2" />
      <div className="flex flex-row gap-2 justify-between w-full">
        <Avatar
          src={getCurrencyFlag(defaultCurrency, currencies)}
          className="h-6 w-6"
        />
        <p className="text-right ml-auto font-bold">
          {formatMonetaryValue(totalValue, defaultCurrency)}
        </p>
      </div>
    </div>
  );
};
