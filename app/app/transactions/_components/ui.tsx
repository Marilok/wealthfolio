"use client";

import { title } from "@/components/primitives";
import { formatMonetaryValue } from "@/functions";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Link as UiLink,
} from "@nextui-org/react";
import { IconCoin, IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import EditButtons from "./EditButtons";
import NewTransaction from "./NewTransaction";

export default function UI({
  accounts = [],
  transactions = [],
}: {
  accounts: any[];
  transactions: any[];
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("cs-CZ");
  };

  return (
    <>
      <h1 className={title()}>Transactions</h1>
      <NewTransaction accounts={accounts} />
      <Table selectionMode="single" isStriped color="primary">
        <TableHeader>
          <TableColumn>ASSET NAME</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>QUANTITY</TableColumn>
          <TableColumn>UNIT PRICE</TableColumn>
          <TableColumn>FEE</TableColumn>
          <TableColumn>VALUE</TableColumn>
          <TableColumn>ACCOUNT</TableColumn>
          <TableColumn>NOTES</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No transactions to display. Try adding some! 😉"}
        >
          {transactions.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.symbol}</TableCell>
              <TableCell>
                <TypePill type={row.type} />
              </TableCell>
              <TableCell>{formatDate(row.date)}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>
                {formatMonetaryValue(row.unit_price, row.currency)}
              </TableCell>
              <TableCell>
                {formatMonetaryValue(row.fee, row.currency)}
              </TableCell>
              <TableCell>
                {formatMonetaryValue(
                  row.unit_price * row.quantity,
                  row.currency,
                )}
              </TableCell>
              <TableCell>
                <UiLink
                  href={"/accounts"}
                  as={Link}
                  color="foreground"
                  underline="hover"
                >
                  {row.account_id.name}
                </UiLink>
              </TableCell>
              <TableCell>{row.notes}</TableCell>
              <TableCell>
                <EditButtons row={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const TypePill = ({ type }: { type: string }) => {
  if (type == "BUY") {
    return (
      <Chip
        color="success"
        endContent={<IconShoppingCart size={"14"} />}
        variant="flat"
        size="sm"
      >
        BUY
      </Chip>
    );
  } else if (type == "SELL") {
    return (
      <Chip
        color="danger"
        endContent={<IconCoin size={"14"} />}
        variant="flat"
        size="sm"
      >
        SELL
      </Chip>
    );
  } else if (type == "DIVIDEND") {
    return (
      <Chip
        color="primary"
        endContent={<IconCoin size={"14"} />}
        variant="flat"
        size="sm"
      >
        DIVIDEND
      </Chip>
    );
  } else if (type == "VALUABLES") {
    return (
      <Chip
        color="secondary"
        endContent={<IconCoin size={"14"} />}
        variant="flat"
        size="sm"
      >
        DIVIDEND
      </Chip>
    );
  } else if (type == "LIABILITY") {
    return (
      <Chip
        color="warning"
        endContent={<IconCoin size={"14"} />}
        variant="flat"
        size="sm"
      >
        DIVIDEND
      </Chip>
    );
  }
  return <Chip color="default">UNKNOWN</Chip>;
};
