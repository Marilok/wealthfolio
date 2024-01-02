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

export default function NewAccount({ platforms }: { platforms: any[] }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const router = useRouter();

  async function onSubmit(formData: FormData) {
    isOpen == false ? onOpen() : onOpenChange();
    const name = formData.get("name") as string;
    const platform_id = Number(formData.get("platformId"));
    const notes = formData.get("notes") as string;
    const balance = parseInt(formData.get("cashBalance") as string, 10);
    const currency = formData.get("currency") as string;
    try {
      await createAccount(name, platform_id, balance, currency, notes);
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
        Create new account
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form action={onSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Create a new account
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
