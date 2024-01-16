"use client";

import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import {
  IconCopy,
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { deleteTransaction } from "../_functions/stocks/deleteTransaction";

export default function EditButtons({
  row = {},
  list,
}: {
  row: any;
  list: any;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const editTransaction = (transactionId: number) => {
    console.log("edit transaction " + transactionId);
  };

  const onDeleteTransaction = async (row: any) => {
    const {
      id,
      stock_id: {
        account_id: { id: account_id },
        currency,
      },
      type,
      quantity,
      unit_price,
      fee,
    } = row;
    try {
      await deleteTransaction(
        id,
        account_id,
        currency,
        type,
        quantity,
        unit_price,
        fee,
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsPopoverOpen(!isPopoverOpen);
      list.remove(id);
    }
  };

  const duplicateTransaction = (transactionId: number) => {
    console.log("duplicate transaction " + transactionId);
  };

  return (
    <Popover
      placement="bottom"
      isOpen={isPopoverOpen}
      onOpenChange={(isPopoverOpen: any) => setIsPopoverOpen(isPopoverOpen)}
    >
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
            isDisabled
            onPress={(e) => {
              duplicateTransaction(row.id);
            }}
          >
            Duplicate transaction
          </ListboxItem>
          <ListboxItem
            key="edit"
            isDisabled
            startContent={<IconPencil />}
            onPress={() => {
              editTransaction(row.id);
            }}
          >
            Edit transaction
          </ListboxItem>
          <ListboxItem
            key="delete"
            startContent={<IconTrash />}
            color="danger"
            onPress={() => {
              onDeleteTransaction(row);
            }}
          >
            Delete transaction
          </ListboxItem>
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
