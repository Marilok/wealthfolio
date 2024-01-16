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
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IconCash, IconPigMoney } from "@tabler/icons-react";

export default function DepositModal({
  isOpenDeposit,
  onOpenChangeDeposit,
  onDeposit,
  accountId,
  accountName,
  currencies,
}: any) {
  return (
    <Modal
      isOpen={isOpenDeposit}
      onOpenChange={onOpenChangeDeposit}
      backdrop="blur"
    >
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
                    label="Account"
                    name="accountId"
                    isDisabled
                    defaultSelectedKeys={[accountId.toString()]}
                  >
                    <SelectItem key={accountId} value={accountId}>
                      {accountName}
                    </SelectItem>
                  </Select>
                  <RadioGroup
                    classNames={{ wrapper: "gap-4 grid grid-cols-2 my-1" }}
                    name="depositOrWithdraw"
                    isRequired
                    defaultValue="deposit"
                  >
                    <Radio
                      classNames={{
                        wrapper: "even:hidden ",
                        base: "data-[selected=true]:border-primary border-default-200 rounded-xl border-2 max-w-full ml-0",
                      }}
                      value={"deposit"}
                    >
                      <IconPigMoney size={"32"} className="mb-2" />
                      <p>Deposit</p>
                    </Radio>
                    <Radio
                      classNames={{
                        wrapper: "even:hidden",
                        base: "data-[selected=true]:border-primary border-default-200 rounded-xl border-2 max-w-full ml-0",
                      }}
                      value={"withdraw"}
                    >
                      <IconCash size={"32"} className="mb-2" />
                      <p>Withdraw</p>
                    </Radio>
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
                      {(currency: any) => (
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
                  <Input label="My notes" name="notes" />
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
  );
}
