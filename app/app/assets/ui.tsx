"use client";

import { subtitle, title } from "@/components/primitives";
import { formatMonetaryValue } from "@/functions";
import { Currency } from "@/types";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

export default function UI({ assets }: { assets: any[] }) {
  const styledPercent = (percent: string) => {
    return (
      <span
        className={percent.startsWith("-") ? "text-danger" : "text-success"}
      >
        {percent.startsWith("-") ? "- " : "+ "}
        {percent.startsWith("-") ? percent.slice(1) : percent}
      </span>
    );
  };

  const styledProfit = (profit: number, currency: Currency) => {
    return (
      <span className={profit < 0 ? "text-danger" : "text-success"}>
        {profit < 0 ? "- " : "+ "}
        {formatMonetaryValue(profit < 0 ? -profit : profit, currency)}
      </span>
    );
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  const dataAssets = {
    labels: [...assets.map((asset) => asset.symbol)],
    datasets: [
      {
        label: " % of portfolio",
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
        data: assets.map((asset) => asset.portfolioShare),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 10,
        },
        label: {
          font: {
            size: 20,
          },
        },
      },
    },
  };

  const calculateAssetsByCategory = () => {
    const assetsByCategory: any = {};
    assets.forEach((asset) => {
      if (assetsByCategory[asset.category]) {
        assetsByCategory[asset.category] += asset.portfolioShare;
      } else {
        assetsByCategory[asset.category] = asset.portfolioShare;
      }
    });

    // Convert to percentage
    Object.keys(assetsByCategory).forEach((key) => {
      assetsByCategory[key] = assetsByCategory[key];
    });

    return assetsByCategory;
  };

  const dataCategory = {
    labels: [...Object.keys(calculateAssetsByCategory())],
    datasets: [
      {
        label: " % of portfolio",
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        data: Object.values(calculateAssetsByCategory()),
      },
    ],
  };

  const calculateAssetsByCurrency = () => {
    const assetsByCurrency: any = {};
    assets.forEach((asset) => {
      if (assetsByCurrency[asset.currency]) {
        assetsByCurrency[asset.currency] += asset.portfolioShare;
      } else {
        assetsByCurrency[asset.currency] = asset.portfolioShare;
      }
    });

    // Convert to percentage
    Object.keys(assetsByCurrency).forEach((key) => {
      assetsByCurrency[key] = assetsByCurrency[key];
    });

    return assetsByCurrency;
  };

  const dataCurrency = {
    labels: [...Object.keys(calculateAssetsByCurrency())],
    datasets: [
      {
        label: " % of portfolio",
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        data: Object.values(calculateAssetsByCurrency()),
      },
    ],
  };

  const tableColumns = [
    { name: "Symbol", descriptor: "symbol" },
    { name: "Value", descriptor: "value" },
    { name: "Share", descriptor: "portfolioShare" },
    { name: "Perfomance", descriptor: "perfomancePercentage" },
    { name: "Profit", descriptor: "profit" },
  ];

  const [isLoading, setIsLoading] = useState(true);

  let list = useAsyncList({
    async load({ signal }) {
      setIsLoading(false);

      return {
        items: assets,
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

  const calculateTotalStocks = () => {
    return assets.reduce((a, b) => a + b.currentValue, 0);
  };

  return (
    <>
      <h1 className={title()}>My assets</h1>
      <div className="w-full">
        <h2 className={subtitle()}>Allocation analysis</h2>

        <div className="flex flex-row gap-6 flex-wrap">
          <Card className="p-5 flex-1">
            <CardHeader>
              <h2 className={"font-semibold text-xl text-center w-full"}>
                Individual assets
              </h2>
            </CardHeader>
            <CardBody>
              <Doughnut
                data={dataAssets}
                className="mx-auto"
                options={options}
              />
            </CardBody>
          </Card>
          <Card className="p-5 flex-1">
            <CardHeader>
              <h2 className={"font-semibold text-xl text-center w-full"}>
                Asset category
              </h2>
            </CardHeader>
            <CardBody>
              <Doughnut data={dataCategory} className="mx-auto" />
            </CardBody>
          </Card>
          <Card className="p-5 flex-1">
            <CardHeader>
              <h2 className={"font-semibold text-xl text-center w-full"}>
                Platforms
              </h2>
            </CardHeader>
            <CardBody>
              <Doughnut data={dataCategory} className="mx-auto" />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="w-full">
        <h2 className={subtitle()}>Overview of all my stocks</h2>
        <Table
          aria-label="Table of stocks"
          selectionMode="single"
          isStriped
          color="primary"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
        >
          <TableHeader>
            {tableColumns.map(({ name, descriptor }) => (
              <TableColumn
                key={descriptor || name}
                allowsSorting={!!descriptor}
              >
                {name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody
            emptyContent={
              "No assets to display. Try adding some transactions! 😉"
            }
            items={list.items}
            isLoading={isLoading}
            loadingContent={<Spinner label="Loading..." />}
          >
            {(stock: any) => (
              <TableRow key={getKeyValue(stock, "symbol")}>
                <TableCell className="font-semibold flex flex-row justify-start items-center gap-3">
                  <Avatar
                    src={`${process.env.NEXT_PUBLIC_URL}/images/stocks/${stock.symbol}.svg`}
                    radius="sm"
                    className="bg-transparent"
                    size="sm"
                  />
                  <span>{getKeyValue(stock, "symbol")}</span>
                </TableCell>
                <TableCell>
                  {formatMonetaryValue(
                    getKeyValue(stock, "currentValue"),
                    getKeyValue(stock, "currency"),
                  )}
                </TableCell>
                <TableCell>
                  <p>{getKeyValue(stock, "portfolioShare")} %</p>
                </TableCell>
                <TableCell>
                  {styledPercent(
                    getKeyValue(stock, "perfomancePercentage").toString() +
                      " %",
                  )}
                </TableCell>
                <TableCell>
                  <span>
                    {styledProfit(
                      getKeyValue(stock, "profit"),
                      getKeyValue(stock, "currency"),
                    )}
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
