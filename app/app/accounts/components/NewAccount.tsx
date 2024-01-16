import { currencies } from "@/data/currencies";
import { defaultCurrency } from "@/data/settings";
import { Currency } from "@/types";
import {
  Avatar,
  Button,
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
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { createAccount } from "../_functions/createAccount";

export default function NewAccount({
  platforms,
  list,
}: {
  platforms: any[];
  list: any;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const router = useRouter();

  async function onSubmit(formData: FormData) {
    isOpen == false ? onOpen() : onOpenChange();
    const name = formData.get("name") as string;
    const platform_id = Number(formData.get("platformId"));
    const notes = formData.get("notes") as string;
    const balance = parseInt(formData.get("cashBalance") as string, 10);
    const currency = formData.get("currency") as Currency;
    try {
      await createAccount(name, platform_id, balance, currency, notes);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      list.reload();
      router.refresh();
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
        Create account
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form action={onSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Create account
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4 w-full">
                    <Input label="Nickname" name="name" isRequired autoFocus />
                    <Select label="Platform" name="platformId" isRequired>
                      {platforms.map((platform) => (
                        <SelectItem
                          key={platform.id}
                          value={platform.id}
                          startContent={
                            <Avatar
                              alt={platform.name}
                              src={`${process.env.NEXT_PUBLIC_URL}/images/platforms/${platform.icon}`}
                              classNames={{ img: "object-scale-down" }}
                              radius="sm"
                            />
                          }
                        >
                          {platform.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <div className="flex flex-row gap-2">
                      <Input
                        label="Initial cash balance"
                        type="number"
                        isRequired
                        defaultValue="0"
                        name="cashBalance"
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
                    Create account
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
