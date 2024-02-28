"use client";

import { currencies } from "@/data/currencies";
import { defaultCurrency } from "@/data/settings";
import { formatMonetaryValue } from "@/functions";
import { getAccounts } from "@/functions/getAccounts";
import { Currency, CurrencyWithFlag, Platform } from "@/types";
import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useState } from "react";
import AccountsTable from "./components/AccountsTable";
import NewAccount from "./components/NewAccount";

export default function UI({
  platforms,
  totalValue,
  aggregatedBalances,
}: {
  platforms: Platform[];
  totalValue: number;
  aggregatedBalances: any[];
}) {
  const [isLoading, setIsLoading] = useState(false);

  let list = useAsyncList({
    async load({ signal }) {
      return {
        items: await getAccounts(),
      };
    },

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
      <Card className="w-72 px-4 py-2 mr-auto">
        <CardHeader className="uppercase font-bold text-lg">
          <h2>Cash balances</h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-2">
          <AggregatedBalances aggregatedBalances={aggregatedBalances} />
          <Divider className="my-2" />
          <div>
            <p className="font-semibold flex flex-row justify-between">
              <span>Total value</span>
              <span>{formatMonetaryValue(totalValue, defaultCurrency)}</span>
            </p>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

const getCurrencyFlag = (
  currency: Currency,
  currencies: CurrencyWithFlag[],
) => {
  const item = currencies.find(
    (item: CurrencyWithFlag) => item.value === currency,
  );
  return item?.flagSrc;
};

const AggregatedBalances = ({ aggregatedBalances }: any) => {
  const items = aggregatedBalances.map((balance: any) => {
    return (
      <div className="flex flex-row space-between gap-2">
        <Avatar
          src={getCurrencyFlag(balance.currency, currencies)}
          className="h-6 w-6"
        />
        <p className="text-right ml-auto">
          {formatMonetaryValue(balance.value, balance.currency)}
        </p>
      </div>
    );
  });
  return items;
};
