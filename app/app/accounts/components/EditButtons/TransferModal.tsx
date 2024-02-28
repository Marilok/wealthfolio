import { currencies } from "@/data/currencies";
import { defaultCurrency } from "@/data/settings";
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
} from "@nextui-org/react";
import {
  IconTransfer,
  IconTransferIn,
  IconTransferOut,
} from "@tabler/icons-react";

export default function TransferModal({
  isOpen,
  onOpenChange,
  account,
  onSubmit,
  accounts,
}: any) {
  const { id: accountId, name: accountName } = account;
  accounts = accounts.filter((account: any) => account.id !== accountId);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <form action={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Transfer money between accounts
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 w-full">
                <Select
                  isRequired
                  label="From"
                  name="sender_accountId"
                  isDisabled
                  defaultSelectedKeys={[accountId.toString()]}
                  startContent={<IconTransferOut />}
                >
                  <SelectItem key={accountId} value={accountId}>
                    {accountName}
                  </SelectItem>
                </Select>
                <Select
                  isRequired
                  label="Into"
                  name="receiver_accoundId"
                  defaultSelectedKeys={[accountId.toString()]}
                  startContent={<IconTransferIn />}
                  items={accounts}
                >
                  {({
                    id,
                    name,
                    platform_id: { name: platform, icon },
                  }: any) => (
                    <SelectItem
                      key={id}
                      value={id}
                      startContent={
                        <Avatar
                          alt={platform}
                          src={`${process.env.NEXT_PUBLIC_URL}/images/platforms/${icon}`}
                          classNames={{ img: "object-scale-down" }}
                          radius="sm"
                        />
                      }
                    >
                      {name}
                    </SelectItem>
                  )}
                </Select>
                <div className="flex flex-row gap-2">
                  <Input
                    label="Amount"
                    type="number"
                    isRequired
                    autoFocus
                    name="amount"
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  startContent={<IconTransfer size={"18"} />}
                >
                  Transfer money
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
