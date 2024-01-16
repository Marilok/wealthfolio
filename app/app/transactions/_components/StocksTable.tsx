"use client";

import { formatDate, formatMonetaryValue } from "@/functions";
import {
  Avatar,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Link as UiLink,
} from "@nextui-org/react";
import Link from "next/link";
import EditButtons from "./EditButtons";
import TypePill from "./TypePill";

const tableColumns = [
  { name: "STOCK NAME", descriptor: "stock_id.symbol" },
  { name: "TYPE", descriptor: "type" },
  { name: "DATE" },
  { name: "QUANTITY", descriptor: "quantity" },
  { name: "UNIT PRICE", descriptor: "unit_price" },
  { name: "FEE", descriptor: "fee" },
  { name: "VALUE" },
  { name: "ACCOUNT" },
  { name: "NOTES", descriptor: "notes" },
  { name: " " },
];

export default function StocksTable({
  list,
  isLoading,
}: {
  list: any;
  isLoading: boolean;
}) {
  return (
    <Table
      selectionMode="single"
      isStriped
      color="primary"
      aria-label="Table of transactions"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader columns={tableColumns}>
        {({ name, descriptor }) => (
          <TableColumn key={descriptor || name} allowsSorting={!!descriptor}>
            {name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No stocks to display. Try adding some! 😉"}
        items={list.items}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(stock: any) => (
          <TableRow key={stock.id}>
            <TableCell>
              <div className="font-semibold flex flex-row justify-start items-center gap-3 h-full">
                <Avatar
                  classNames={{
                    img: " object-contain",
                  }}
                  src={`${process.env.NEXT_PUBLIC_URL}/images/stocks/${stock.stock_id.symbol}.svg`}
                  radius="sm"
                  className="bg-transparent"
                  size="sm"
                />
                <span>{stock.stock_id.symbol}</span>
              </div>
            </TableCell>

            <TableCell>
              <TypePill type={stock.type} />
            </TableCell>
            <TableCell>{formatDate(stock.date)}</TableCell>
            <TableCell>{stock.quantity}</TableCell>
            <TableCell>
              {formatMonetaryValue(stock.unit_price, stock.stock_id.currency)}
            </TableCell>
            <TableCell>
              {formatMonetaryValue(stock.fee, stock.stock_id.currency)}
            </TableCell>
            <TableCell>
              {formatMonetaryValue(
                stock.quantity * stock.unit_price,
                stock.stock_id.currency,
              )}
            </TableCell>
            <TableCell>
              <UiLink
                href={"/accounts"}
                as={Link}
                color="foreground"
                underline="hover"
              >
                {stock.stock_id.account_id.name}
              </UiLink>
            </TableCell>
            <TableCell>{stock.notes}</TableCell>
            <TableCell>
              <EditButtons row={stock} list={list} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
