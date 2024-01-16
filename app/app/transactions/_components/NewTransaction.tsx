"use client";
import { currencies } from "@/data/currencies";
import { defaultCurrency } from "@/data/settings";
import { Account, Currency } from "@/types";
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
import { buyStock } from "../_functions/stocks/buyStock";

const actions = [
  {
    action: "BUY",
    name: "Buy",
    color: "success",
    icon: <IconShoppingCart />,
  },
  {
    action: "SELL",
    name: "Sell",
    color: "danger",
    icon: <IconCoin />,
  },
  {
    action: "INTEREST",
    name: "Received interest",
    color: "warning",
    icon: <IconCoins />,
  },
];

export default function NewTransaction({
  accounts = [],
  list,
}: {
  accounts: Account[];
  list: any;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  async function createNewTransaction(formData: FormData) {
    const symbol = formData.get("symbol") as string;
    const type = formData.get("type") as string;
    const quantity = Number(formData.get("quantity") as string);
    const unit_price = Number(formData.get("unit_price") as string);
    const fee = Number(formData.get("fee") as string) || 0;
    const currency = formData.get("currency") as Currency;
    const date = formData.get("date") as string;
    const account_id = Number(formData.get("account_id") as string);
    const notes = formData.get("notes") as string;
    try {
      if (type === "BUY") {
        await buyStock(
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
      }
    } catch (error) {
      console.error(error);
    } finally {
      list.reload();
      onClose();
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        endContent={<IconPlus />}
        color="primary"
        className="fixed m-12 bottom-0 right-0 z-50"
        size="lg"
      >
        Add transaction
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form action={createNewTransaction}>
                <ModalHeader className="flex flex-col gap-1 ">
                  Add transaction
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4 w-full">
                    <Select isRequired label="Type" name="type" items={actions}>
                      {(action) => (
                        <SelectItem
                          key={action.action}
                          startContent={
                            <Avatar
                              alt="Icon"
                              //@ts-expect-error
                              color={action.color}
                              icon={action.icon}
                            />
                          }
                        >
                          {action.name}
                        </SelectItem>
                      )}
                    </Select>
                    <Select
                      isRequired
                      label="Account"
                      name="account_id"
                      items={accounts}
                    >
                      {(account) => (
                        <SelectItem
                          key={account.id}
                          value={account.id}
                          startContent={
                            <Avatar
                              alt="Account icon"
                              radius="sm"
                              classNames={{
                                img: "object-contain",
                              }}
                              src={`${process.env.NEXT_PUBLIC_URL}/images/platforms/${account.platform_id.icon}`}
                            />
                          }
                        >
                          {account.name}
                        </SelectItem>
                      )}
                    </Select>
                    <Checkbox
                      name="willUpdateAccountBalance"
                      defaultSelected
                      isDisabled
                    >
                      Update cash balance in this account?
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
                        defaultSelectedKeys={[defaultCurrency]}
                        name="currency"
                        items={currencies}
                        renderValue={(items) => {
                          return items.map((currency: any) => (
                            <div
                              key={defaultCurrency}
                              className="flex items-center gap-2"
                            >
                              <Avatar
                                alt={currency.data.value}
                                className="w-6 h-6"
                                src={currency.data.flagSrc}
                              />
                              <div className="flex flex-col">
                                <span>{currency.data.value}</span>
                              </div>
                            </div>
                          ));
                        }}
                      >
                        {(currency) => (
                          <SelectItem
                            key={currency.value}
                            value={currency.value}
                            startContent={
                              <Avatar
                                alt={currency.value}
                                className="w-6 h-6"
                                src={currency.flagSrc}
                              />
                            }
                          >
                            {currency.value}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                    <Input label="Fee" type="number" name="fee" />
                    <Input
                      label="Date"
                      isRequired
                      type="date"
                      name="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
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
