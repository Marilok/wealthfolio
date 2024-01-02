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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteTransaction } from "../_functions/deleteTransaction";

export default function EditButtons({ row = {} }: { row: any }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const editTransaction = (transactionId: number) => {
    console.log("edit transaction " + transactionId);
  };

  const router = useRouter();

  const onDeleteTransaction = async (transactionId: number) => {
    try {
      await deleteTransaction(transactionId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPopoverOpen(!isPopoverOpen);
      router.refresh();
    }
  };

  const duplicateTransaction = (transactionId: number) => {
    console.log("duplicate transaction " + transactionId);
  };

  return (
    <Popover
      placement="bottom"
      isOpen={isPopoverOpen}
      onOpenChange={(isPopoverOpen) => setIsPopoverOpen(isPopoverOpen)}
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
            onPress={() => {
              onDeleteTransaction(row.id);
            }}
          >
            Delete transaction
          </ListboxItem>
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
