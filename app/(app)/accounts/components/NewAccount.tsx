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
import { platforms } from "../../../data";

export default function NewAccount() {
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
        Create new account
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form action={createNewTransaction}>
                <ModalHeader className="flex flex-col gap-1">
                  Create a new investment account
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4 w-full">
                    <Input label="Name" name="name" isRequired />
                    <Select label="Platform">
                      {platforms.map((platform) => (
                        <SelectItem
                          key={platform.id}
                          value={platform.id}
                          startContent={
                            <Avatar
                              alt={platform.name}
                              src={platform.icon}
                              classNames={{ img: "object-contain" }}
                            />
                          }
                        >
                          {platform.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <div className="flex flex-row gap-2">
                      <Input
                        label="Current cash balance"
                        type="number"
                        isRequired
                        defaultValue="0"
                        name="cashBalance"
                      />
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
                    Add new account
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
