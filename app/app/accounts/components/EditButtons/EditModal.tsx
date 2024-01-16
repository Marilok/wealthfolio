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
} from "@nextui-org/react";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function EditModal({
  isOpenEdit,
  onOpenChangeEdit,
  account,
  onSubmit,
  platforms,
}: any) {
  const { name: accountName, notes, platform_id } = account;
  return (
    <Modal
      isOpen={isOpenEdit}
      onOpenChange={onOpenChangeEdit}
      backdrop="blur"
      scrollBehavior="outside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form action={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Edit account
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4 w-full">
                  <Input
                    label="Nickname"
                    name="name"
                    isRequired
                    autoFocus
                    defaultValue={accountName}
                  />
                  <Select
                    label="Platform"
                    name="platformId"
                    isRequired
                    items={platforms}
                    defaultSelectedKeys={[platform_id.id.toString()]}
                  >
                    {(platform: any) => (
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
                    )}
                  </Select>
                  <Textarea label="Notes" name="notes" defaultValue={notes} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  startContent={<IconDeviceFloppy size={"18"} />}
                >
                  Save changes
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
