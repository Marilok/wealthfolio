"use client";
import { title } from "@/components/primitives";
import { formatMonetaryValue } from "@/functions/formatMonetaryValue";
import {
  Avatar,
  Button,
  Link,
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
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { accounts, platforms } from "../../data";
import NewAccount from "./components/NewAccount";

export default function Page() {
  const getPlatformData = (platformId: number) => {
    return platforms.find((platform) => platform.id == platformId);
  };

  const editAccount = (accountId: number) => {
    console.log("edit account " + accountId);
  };

  const deleteAccount = (accountId: number) => {
    console.log("delete account " + accountId);
  };

  return (
    <>
      <h1 className={title()}>Accounts</h1>
      <NewAccount />
      <Table isStriped selectionMode="single" color="primary">
        <TableHeader>
          <TableColumn>ACCOUNT NAME</TableColumn>
          <TableColumn>PLATFORM</TableColumn>
          <TableColumn>CASH BALANCE</TableColumn>
          <TableColumn>NOTES</TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody>
          {accounts.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                {row.platformId ? (
                  <div className="flex flex-row gap-2">
                    <Avatar
                      src={getPlatformData(row.platformId)?.icon}
                      alt={getPlatformData(row.platformId)?.name}
                      size="sm"
                      classNames={{
                        img: "object-contain",
                      }}
                    />
                    <Link
                      isExternal
                      href={getPlatformData(row.platformId)?.url}
                      showAnchorIcon
                      underline="always"
                      color="foreground"
                    >
                      {getPlatformData(row.platformId)?.name}
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell>
                {row.balances?.map((balance) => {
                  return (
                    <>
                      {formatMonetaryValue(balance.balance, balance.currency)}
                      <br />
                    </>
                  );
                })}
              </TableCell>
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
                        key="delete"
                        startContent={<IconPencil />}
                        onPress={(e) => {
                          editAccount(row.id);
                        }}
                      >
                        Edit account
                      </ListboxItem>
                      <ListboxItem
                        key="delete"
                        startContent={<IconTrash />}
                        color="danger"
                        onPress={(e) => {
                          deleteAccount(row.id);
                        }}
                      >
                        Delete account
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
