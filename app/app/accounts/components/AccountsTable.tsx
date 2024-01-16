"use client";

import { formatValue } from "@/functions";
import {
  Avatar,
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import EditButtons from "./EditButtons/EditButtons";

const tableColumns = [
  { name: "PLATFORM", descriptor: "platform_id.name" },
  { name: "ACCOUNT NICKNAME", descriptor: "name" },
  { name: "TRANSACTIONS", descriptor: "transactions" },
  { name: "CASH BALANCES" },
  { name: "NOTES", descriptor: "notes" },
  { name: " " },
];

export default function AccountsTable({
  list,
  platforms,
  isLoading,
}: {
  list: any;
  platforms: any[];
  isLoading: boolean;
  setIsLoading: any;
}) {
  return (
    <Table
      selectionMode="single"
      isStriped
      color="primary"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      aria-labelledby="Accounts"
    >
      <TableHeader columns={tableColumns}>
        {({ name, descriptor, width, align }: any) => (
          <TableColumn
            key={descriptor || name}
            allowsSorting={!!descriptor}
            width={width ? width : undefined}
            className="uppercase"
          >
            {name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No accounts to display. Try adding one! 😉"}
        items={list.items}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(account: any) => (
          <TableRow key={getKeyValue(account, "id")}>
            <TableCell>
              {getKeyValue(account, "platform_id") ? (
                <div className="flex flex-row gap-2 items-center font-semibold">
                  <Avatar
                    src={`${process.env.NEXT_PUBLIC_URL}/images/platforms/${
                      getKeyValue(account, "platform_id").icon
                    }`}
                    alt={getKeyValue(account, "platform_id").name}
                    size="sm"
                    radius="sm"
                    classNames={{
                      img: "object-contain",
                    }}
                  />
                  {(getKeyValue(account, "platform_id").url && (
                    <Link
                      isExternal
                      href={getKeyValue(account, "platform_id").url}
                      showAnchorIcon
                      underline="always"
                      color="foreground"
                      size="sm"
                    >
                      {getKeyValue(account, "platform_id").name}
                    </Link>
                  )) || <span>{getKeyValue(account, "platform_id").name}</span>}
                </div>
              ) : (
                ""
              )}
            </TableCell>
            <TableCell className="font-semibold">
              {getKeyValue(account, "name")}
            </TableCell>
            <TableCell>{getKeyValue(account, "transactions")}</TableCell>
            <TableCell className="text-end">
              {getKeyValue(account, "account_balances")?.map((balance: any) => {
                return (
                  <>
                    <span key={balance.id} className="ml-auto">
                      {formatValue(balance.balance)}&nbsp;
                      <span className="w-8 inline-block text-left">
                        {balance.currency}
                      </span>
                    </span>
                    <br />
                  </>
                );
              })}
            </TableCell>

            <TableCell>{getKeyValue(account, "notes")}</TableCell>
            <TableCell>
              <EditButtons
                platforms={platforms}
                account={account}
                list={list}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
