"use client";

import { subtitle, title } from "@/components/primitives";
import { formatMonetaryValue } from "@/functions";
import { AssetWithMarketData } from "@/types";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function UI({ assets }: { assets: any[] }) {
  const styledPercent = (percent: string) => {
    return (
      <span
        className={percent.startsWith("-") ? "text-danger" : "text-success"}
      >
        {percent}
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

  return (
    <>
      <h1 className={title()}>Assets</h1>
      <div className="w-full">
        <h2 className={subtitle()}>Allocation analysis</h2>

        <div className="flex flex-row gap-6 flex-wrap">
          <Card className="p-5 flex-1">
            <CardHeader>
              <h2 className={"font-semibold text-xl text-center w-full"}>
                Asset
              </h2>
            </CardHeader>
            <CardBody>
              <Doughnut data={dataAssets} className="mx-auto" />
            </CardBody>
          </Card>
          <Card className="p-5 flex-1">
            <CardHeader>
              <h2 className={"font-semibold text-xl text-center w-full"}>
                Category
              </h2>
            </CardHeader>
            <CardBody>
              <Doughnut data={dataCategory} className="mx-auto" />
            </CardBody>
          </Card>
          <Card className="p-5 flex-1">
            <CardHeader>
              <h2 className={"font-semibold text-xl text-center w-full"}>
                Currency
              </h2>
            </CardHeader>
            <CardBody>
              <Doughnut data={dataCurrency} className="mx-auto" />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="w-full">
        <h2 className={subtitle()}>Overview of all assets</h2>
        <Table selectionMode="single" isStriped color="primary">
          <TableHeader>
            <TableColumn>ASSET IDENTIFIER</TableColumn>
            <TableColumn>VALUE</TableColumn>
            <TableColumn>ALLOCATION</TableColumn>
            <TableColumn>PERFORMANCE</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              "No assets to display. Try adding some transactions! 😉"
            }
          >
            {assets.map((row: AssetWithMarketData, index: any) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">{row.symbol}</TableCell>
                <TableCell>
                  {formatMonetaryValue(row.currentValue, row.currency)}
                </TableCell>
                <TableCell>{row.portfolioShare} %</TableCell>
                <TableCell>
                  {styledPercent(row.perfomancePercentage.toString() + " %")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
