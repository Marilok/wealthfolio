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
import { IconCoin, IconPlus, IconShoppingCart } from "@tabler/icons-react";
import { accounts } from "../../../data";

export default function NewTransaction() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function createNewTransaction(formData: FormData) {
    // "use server";
    // const rawFormData = {
    //   customerId: formData.get("customerId"),
    //   amount: formData.get("amount"),
    //   status: formData.get("status"),
    // };
    // // mutate data
    // // revalidate cache
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
                    <Select isRequired label="Transaction type">
                      <SelectItem
                        key="buy"
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
                        key="sell"
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
                    </Select>
                    <Select isRequired label="Account">
                      {accounts.map((account) => (
                        <SelectItem key={account.id}>{account.name}</SelectItem>
                      ))}
                    </Select>
                    <Input label="Asset" isRequired />
                    <Input label="Quantity" type="number" isRequired />
                    <div className="flex flex-row gap-2">
                      <Input label="Unit price" type="number" isRequired />
                      <Select
                        className="w-40"
                        isRequired
                        defaultSelectedKeys={["CZK"]}
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

                    <Input label="Date" isRequired type="date" />
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
