"use client";
import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import {
  IconCoin,
  IconCoins,
  IconPlus,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { createTransaction } from "../_functions/createTransaction";

export default function NewTransaction({ accounts = [] }: { accounts: any[] }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const router = useRouter();

  async function createNewTransaction(formData: FormData) {
    const symbol = formData.get("symbol") as string;
    const type = formData.get("type") as string;
    const quantity = Number(formData.get("quantity") as string);
    const unit_price = Number(formData.get("unit_price") as string);
    const fee = Number(formData.get("fee") as string);
    const currency = formData.get("currency") as string;
    const date = formData.get("date") as string;
    const account_id = Number(formData.get("account_id") as string);
    const notes = formData.get("notes") as string;
    try {
      await createTransaction(
        symbol,
        type,
        quantity,
        unit_price,
        fee,
        currency,
        date,
        account_id,
        notes,
      );
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      router.refresh();
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        endContent={<IconPlus />}
        color="primary"
        className="absolute m-12 bottom-0 right-0"
        size="lg"
      >
        Add transaction
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form action={createNewTransaction}>
                <ModalHeader className="flex flex-col gap-1">
                  Add a new transaction
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4 w-full">
                    <Select isRequired label="What did I do?" name="type">
                      <SelectItem
                        key="BUY"
                        startContent={
                          <Avatar
                            alt="Buy icon"
                            icon={<IconShoppingCart />}
                            color="success"
                          />
                        }
                      >
                        Buy
                      </SelectItem>
                      <SelectItem
                        key="SELL"
                        startContent={
                          <Avatar
                            alt="Sell icon"
                            icon={<IconCoin />}
                            color="danger"
                          />
                        }
                      >
                        Sell
                      </SelectItem>
                      <SelectItem
                        key="INTEREST"
                        startContent={
                          <Avatar
                            alt="Sell icon"
                            icon={<IconCoins />}
                            color="warning"
                          />
                        }
                      >
                        Receive interest
                      </SelectItem>
                    </Select>
                    <Select
                      isRequired
                      label="On which account?"
                      name="account_id"
                    >
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Checkbox isDisabled name="isRecurring" defaultSelected>
                      Update cash balance on this account?
                    </Checkbox>
                    <Input
                      label="Ticker/ISIN..."
                      isRequired
                      autoFocus
                      name="symbol"
                    />
                    <Input
                      label="Quantity"
                      type="number"
                      isRequired
                      name="quantity"
                    />
                    <div className="flex flex-row gap-2">
                      <Input
                        label="Unit price"
                        type="number"
                        isRequired
                        name="unit_price"
                      />
                      <Select
                        className="w-40"
                        isRequired
                        defaultSelectedKeys={["CZK"]}
                        name="currency"
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
                    <Input label="Fee" type="number" isRequired name="fee" />
                    <Input label="When?" isRequired type="date" name="date" />
                    <Textarea label="Notes" name="notes" />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    startContent={<IconPlus size={"18"} />}
                  >
                    Add transaction
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
