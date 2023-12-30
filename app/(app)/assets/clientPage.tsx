"use client";
import { title } from "@/components/primitives";
import { formatMonetaryValue } from "@/functions/formatMonetaryValue";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function ClientPage({ assets }: { assets: any[] }) {
  const styledPercent = (percent: string) => {
    return (
      <span
        className={percent.startsWith("+") ? "text-success" : "text-danger"}
      >
        {percent}
      </span>
    );
  };

  const calculateAllocation = (assetName: any, assets: any) => {
    const totalValue = assets.reduce(
      (total: any, asset: any) => total + Number(asset.value),
      0,
    );
    const assetValue = assets.find(
      (asset: any) => asset.name == assetName,
    )?.value;
    return ((Number(assetValue) / totalValue) * 100).toFixed(2) + " %";
  };

  return (
    <>
      <h1 className={title()}>Assets</h1>
      <Table isStriped selectionMode="single" color="primary">
        <TableHeader>
          <TableColumn>ASSET NAME</TableColumn>
          <TableColumn>VALUE</TableColumn>
          <TableColumn>ALLOCATION</TableColumn>
          <TableColumn>PERFORMANCE</TableColumn>
        </TableHeader>
        <TableBody>
          {assets.map((row: any, index: any) => (
            <TableRow key={index}>
              <TableCell className="font-semibold">{row.name}</TableCell>
              <TableCell>
                {formatMonetaryValue(row.value, row.currency)}
              </TableCell>
              <TableCell>{calculateAllocation(row.name, assets)}</TableCell>
              <TableCell>{styledPercent("+10%")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
