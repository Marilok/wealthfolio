"use client";
import { title } from "@/components/primitives";
import { formatMonetaryValue } from "@/functions";
import {
  Avatar,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import EditButtons from "./components/EditButtons";
import NewAccount from "./components/NewAccount";

export default function UI({
  accounts,
  platforms,
}: {
  accounts: any[];
  platforms: any[];
}) {
  return (
    <>
      <h1 className={title()}>Accounts</h1>
      <NewAccount platforms={platforms} />
      <Table isStriped selectionMode="single" color="primary">
        <TableHeader>
          <TableColumn>ACCOUNT NICKNAME</TableColumn>
          <TableColumn>PLATFORM</TableColumn>
          <TableColumn>TRANSACTIONS</TableColumn>
          <TableColumn>CASH BALANCE</TableColumn>
          <TableColumn>NOTES</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No accounts to display. Try adding one! 😉"}>
          {accounts.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                {row.platform_id ? (
                  <div className="flex flex-row gap-2">
                    <Avatar
                      src={row.platform_id?.icon}
                      alt={row.platform_id?.name}
                      size="sm"
                      classNames={{
                        img: "object-contain",
                      }}
                    />
                    <Link
                      isExternal
                      href={row.platform_id?.url}
                      showAnchorIcon
                      underline="always"
                      color="foreground"
                    >
                      {row.platform_id?.name}
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell>{row.transactions[0].count}</TableCell>
              <TableCell>
                {row.account_balances?.map((balance: any) => {
                  return (
                    <>
                      <span key={balance.id}>
                        {formatMonetaryValue(balance.balance, balance.currency)}
                      </span>
                      <br />
                    </>
                  );
                })}
              </TableCell>
              <TableCell>{row.notes}</TableCell>
              <TableCell>
                <EditButtons
                  accountId={row.id}
                  accountName={row.name}
                  transactionsCount={row.transactions[0].count}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
