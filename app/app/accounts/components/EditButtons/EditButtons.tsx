"use client";

import { currencies } from "@/data/currencies";
import { Currency } from "@/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import {
  IconArrowRight,
  IconDotsVertical,
  IconMoneybag,
  IconPencil,
  IconTransfer,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { createDeposit } from "../../_functions/createDeposit";
import { createTransfer } from "../../_functions/createTransfer";
import { deleteAccount } from "../../_functions/deleteAccount";
import { updateAccount } from "../../_functions/updateAccount";
import DepositModal from "./DepositModal";
import EditModal from "./EditModal";
import TransferModal from "./TransferModal";

export default function EditButtons({
  platforms,
  account,
  list,
}: {
  platforms: any[];
  account: any;
  list: any;
}) {
  const {
    id: accountId,
    name: accountName,
    transactions: transactionsCount,
  } = account;

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenDeposit,
    onOpen: onOpenDeposit,
    onClose: onCloseDeposit,
    onOpenChange: onOpenChangeDeposit,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpenChange: onOpenChangeEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    isOpen: isOpenTransfer,
    onOpenChange: onOpenChangeTransfer,
    onOpen: onOpenTransfer,
    onClose: onCloseTransfer,
  } = useDisclosure();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onDeleteAccount = async (accountId: number) => {
    try {
      await deleteAccount(accountId);
    } catch (error) {
      console.error(error);
    } finally {
      list.remove(accountId);
    }
  };

  const onDeposit = async (formData: FormData) => {
    const depositOrWithdraw = formData.get("depositOrWithdraw") as
      | "deposit"
      | "withdraw";
    const amount = Number(formData.get("amount"));
    const currency = formData.get("currency") as Currency;
    const notes = formData.get("notes") as string;
    if (amount <= 0) {
      onCloseDeposit();
    } else {
      try {
        await createDeposit(
          accountId,
          depositOrWithdraw,
          amount,
          currency,
          notes,
        );
      } catch (error) {
        console.error(error);
      } finally {
        list.reload();
        onCloseDeposit();
      }
    }
  };

  async function onEdit(data: FormData) {
    const name = data.get("name") as string;
    const platform_id = Number(data.get("platformId"));
    const notes = data.get("notes") as string;

    try {
      await updateAccount(accountId, name, platform_id, notes);
    } catch (error) {
      console.error(error);
    } finally {
      list.reload();
      onCloseEdit();
    }
  }

  async function onTransfer(data: FormData) {
    const amount = Number(data.get("amount"));
    const currency = data.get("currency") as Currency;
    const to = Number(data.get("receiver_accoundId"));
    const from = accountId;

    try {
      await createTransfer(from, to, amount, currency);
    } catch (error) {
      console.error(error);
    } finally {
      list.reload();
      onCloseTransfer();
    }
  }

  return (
    <>
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
          <Button
            key="edit"
            variant="light"
            fullWidth
            className="justify-start"
            startContent={<IconPencil />}
            onPress={() => {
              onOpenEdit();
              setIsPopoverOpen(false);
            }}
          >
            Edit account
          </Button>
          <Button
            key="deposit"
            variant="light"
            fullWidth
            className="justify-start"
            startContent={<IconMoneybag />}
            onPress={() => {
              onOpenDeposit();
              setIsPopoverOpen(false);
            }}
          >
            Deposit or withdraw money
          </Button>
          <Button
            key="transfer"
            variant="light"
            fullWidth
            className="justify-start"
            startContent={<IconTransfer />}
            onPress={() => {
              onOpenTransfer();
              setIsPopoverOpen(false);
            }}
          >
            Transfer money
          </Button>
          <Button
            key="delete"
            variant="light"
            fullWidth
            className="justify-start"
            startContent={<IconTrash />}
            color="danger"
            onPress={() => {
              if (transactionsCount) {
                onOpenDelete();
                setIsPopoverOpen(false);
              } else {
                onDeleteAccount(accountId);
                setIsPopoverOpen(false);
              }
            }}
          >
            Delete account
          </Button>
        </PopoverContent>
      </Popover>
      <Modal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Whoops.. 😬
              </ModalHeader>
              <ModalBody>
                <p>
                  There are still{" "}
                  <b>{transactionsCount} transactions in this account</b>. You
                  must first delete them before deleting the account.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Nevermind
                </Button>
                <Link href={"transactions"}>
                  <Button
                    color="primary"
                    onPress={onClose}
                    endContent={<IconArrowRight />}
                  >
                    Take me to transactions
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <EditModal
        isOpenEdit={isOpenEdit}
        onOpenChangeEdit={onOpenChangeEdit}
        account={account}
        onSubmit={onEdit}
        platforms={platforms}
      />

      <TransferModal
        isOpen={isOpenTransfer}
        onOpenChange={onOpenChangeTransfer}
        account={account}
        onSubmit={onTransfer}
        platforms={platforms}
        accounts={list.items}
      />

      <DepositModal
        isOpenDeposit={isOpenDeposit}
        onOpenChangeDeposit={onOpenChangeDeposit}
        onDeposit={onDeposit}
        accountId={accountId}
        accountName={accountName}
        currencies={currencies}
      />
    </>
  );
}
