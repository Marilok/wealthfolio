"use client";

import { title } from "@/components/primitives";
import { Account, Stock } from "@/types";
import { useAsyncList } from "@react-stately/data";
import { useState } from "react";
import NewTransaction from "./NewTransaction";
import StocksTable from "./StocksTable";

export default function UI({
  accounts = [],
  stocks = [],
}: {
  accounts: Account[];
  stocks: Stock[];
}) {
  const [isLoading, setIsLoading] = useState(true);

  let list = useAsyncList({
    async load({ signal }) {
      setIsLoading(false);

      return {
        items: stocks,
      };
    },
    async sort({ items, sortDescriptor }: any) {
      return {
        items: items.sort((a: any, b: any) => {
          let first = a[sortDescriptor.column];
          console.log(sortDescriptor.column);
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
      <h1 className={title()}>Transactions</h1>
      <NewTransaction accounts={accounts} list={list} />
      <StocksTable isLoading={isLoading} list={list} />
    </>
  );
}
