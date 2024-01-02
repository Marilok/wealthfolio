import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import {
  IconDotsVertical,
  IconMoneybag,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createDeposit } from "../_functions/createDeposit";
import { deleteAccount } from "../_functions/deleteAccount";

export default function EditButtons({
  accountId,
  accountName,
  transactionsCount,
}: {
  accountId: number;
  accountName: string;
  transactionsCount: number;
}) {
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

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const router = useRouter();

  const editAccount = (accountId: number) => {
    console.log("edit account " + accountId);
  };

  const onDeleteAccount = async (accountId: number) => {
    try {
      await deleteAccount(accountId);
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  const onDeposit = async (formData: FormData) => {
    const depositOrWithdraw = formData.get("depositOrWithdraw")! as string;
    const amount = Number(formData.get("amount"));
    const currency = formData.get("currency") as string;
    const notes = formData.get("notes") as string;
    if (amount <= 0) {
      router.refresh();
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
        router.refresh();
        onCloseDeposit();
      }
    }
  };

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
            isDisabled
            variant="light"
            fullWidth
            className="justify-start"
            startContent={<IconPencil />}
            onPress={() => {
              editAccount(accountId);
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
      <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Whoops..
              </ModalHeader>
              <ModalBody>
                <p>
                  There are {transactionsCount} transactions in this account.
                  You must first delete them before deleting the account.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Nevermind
                </Button>
                <Link href={"transactions"}>
                  <Button color="primary" onPress={onClose}>
                    Take me to transactions
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenDeposit} onOpenChange={onOpenChangeDeposit}>
        <ModalContent>
          {(onClose) => (
            <>
              <form action={onDeposit}>
                <ModalHeader className="flex flex-col gap-1">
                  Deposit or withdraw from account
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <Select
                      isRequired
                      label="On which account?"
                      name="accountId"
                      defaultSelectedKeys={[accountId.toString()]}
                      isDisabled
                    >
                      <SelectItem key={accountId} value={accountId}>
                        {accountName}
                      </SelectItem>
                    </Select>
                    <RadioGroup
                      label="Deposit or withdraw?"
                      defaultValue="deposit"
                      name="depositOrWithdraw"
                      onChange={() => {}}
                    >
                      <Radio value="deposit">Deposit</Radio>
                      <Radio value="withdrawal">Withdraw</Radio>
                    </RadioGroup>
                    <div className="flex flex-row gap-2">
                      <Input
                        label="Amount"
                        type="number"
                        isRequired
                        name="amount"
                        autoFocus
                      />
                      <Select
                        className="w-40"
                        isRequired
                        defaultSelectedKeys={["CZK"]}
                        name="currency"
                        label="Currency"
                      >
                        <SelectItem
                          key="CZK"
                          value={"CZK"}
                          startContent={
                            <Avatar
                              alt="CZ"
                              className="w-6 h-6"
                              src="https://flagcdn.com/cz.svg"
                            />
                          }
                        >
                          CZK
                        </SelectItem>
                        <SelectItem
                          key="EUR"
                          value={"EUR"}
                          startContent={
                            <Avatar
                              alt="USA"
                              className="w-6 h-6"
                              src="https://flagcdn.com/eu.svg"
                            />
                          }
                        >
                          EUR
                        </SelectItem>
                        <SelectItem
                          key="USD"
                          value={"USD"}
                          startContent={
                            <Avatar
                              alt="USA"
                              className="w-6 h-6"
                              src="https://flagcdn.com/us.svg"
                            />
                          }
                        >
                          USD
                        </SelectItem>
                      </Select>
                    </div>
                    <Input label="Notes" name="notes" />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Deposit or withdraw
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
