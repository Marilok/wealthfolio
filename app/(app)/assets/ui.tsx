"use client";

import { subtitle, title } from "@/components/primitives";
import { convertNumberToPercentage, formatMonetaryValue } from "@/functions";
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

export default function UI({ assets }: { assets: AssetWithMarketData[] }) {
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

  const data = {
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
        data: assets.map((asset) => asset.portfolioShare * 100),
      },
    ],
  };

  return (
    <>
      <h1 className={title()}>Assets</h1>
      <div className="w-full">
        <h2 className={subtitle()}>Allocation analysis</h2>

        <div className="flex flex-row gap-6 flex-wrap">
          <Card className="p-5">
            <CardHeader>
              <h2 className={"font-semibold text-xl text-center w-full"}>
                By asset
              </h2>
            </CardHeader>
            <CardBody>
              <Doughnut data={data} title="By asset" datasetIdKey="name" />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="w-full">
        <h2 className={subtitle()}>Overview of all assets</h2>
        <Table isStriped selectionMode="single" color="primary">
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
                <TableCell>
                  {convertNumberToPercentage(row.portfolioShare)}
                </TableCell>
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
