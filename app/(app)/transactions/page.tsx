"use client";

import { title } from "@/components/primitives";
import { formatMonetaryValue } from "@/functions/formatMonetaryValue";
import {
  Button,
  Chip,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {
  IconCoin,
  IconCopy,
  IconDotsVertical,
  IconPencil,
  IconShoppingCart,
  IconTrash,
} from "@tabler/icons-react";
import { accounts, transactions } from "../../data";
import NewTransaction from "./components/NewTransaction";

export default function Page() {
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
    }
  };

  const editTransaction = (transactionId: number) => {
    console.log("edit transaction " + transactionId);
  };

  const deleteTransaction = (transactionId: number) => {
    console.log("delete transaction " + transactionId);
  };

  const duplicateTransaction = (transactionId: number) => {
    console.log("duplicate transaction " + transactionId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("cs-CZ");
  };

  const getAccountName = (accountId: number) => {
    return accounts.find((account: any) => account.id == accountId)?.name;
  };

  const calculateValue = (quantity: number, unitPrice: number) => {
    return quantity * unitPrice;
  };

  return (
    <>
      <h1 className={title()}>Transactions</h1>
      <NewTransaction />
      <Table isStriped selectionMode="single" color="primary">
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
        <TableBody>
          {transactions.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <TypePill type={row.type} />
              </TableCell>
              <TableCell>{formatDate(row.date)}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>
                {formatMonetaryValue(row.unitPrice, row.currency)}
              </TableCell>
              <TableCell>
                {formatMonetaryValue(row.fee, row.currency)}
              </TableCell>
              <TableCell>
                {formatMonetaryValue(
                  calculateValue(row.quantity, row.unitPrice),
                  row.currency,
                )}
              </TableCell>
              <TableCell>{getAccountName(row.accountId)}</TableCell>
              <TableCell>{row.notes}</TableCell>
              <TableCell>
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <Button
                      isIconOnly
                      startContent={<IconDotsVertical />}
                      variant="light"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Listbox>
                      <ListboxItem
                        key={"duplicate"}
                        startContent={<IconCopy />}
                        onPress={(e) => {
                          duplicateTransaction(row.id);
                        }}
                      >
                        Duplicate transaction
                      </ListboxItem>
                      <ListboxItem
                        key="edit"
                        startContent={<IconPencil />}
                        onPress={(e) => {
                          editTransaction(row.id);
                        }}
                      >
                        Edit transaction
                      </ListboxItem>
                      <ListboxItem
                        key="delete"
                        startContent={<IconTrash />}
                        color="danger"
                        onPress={(e) => {
                          deleteTransaction(row.id);
                        }}
                      >
                        Delete transaction
                      </ListboxItem>
                    </Listbox>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
