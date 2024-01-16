import { Chip } from "@nextui-org/react";
import { IconCoin, IconShoppingCart } from "@tabler/icons-react";

export default function TypePill({ type }: { type: string }) {
  if (type == "BUY") {
    return (
      <Chip
        color="success"
        endContent={<IconShoppingCart size={"14"} />}
        variant="flat"
        size="sm"
      >
        BUY
      </Chip>
    );
  } else if (type == "SELL") {
    return (
      <Chip
        color="danger"
        endContent={<IconCoin size={"14"} />}
        variant="flat"
        size="sm"
      >
        SELL
      </Chip>
    );
  } else if (type == "DIVIDEND") {
    return (
      <Chip
        color="primary"
        endContent={<IconCoin size={"14"} />}
        variant="flat"
        size="sm"
      >
        DIVIDEND
      </Chip>
    );
  } else if (type == "VALUABLES") {
    return (
      <Chip
        color="secondary"
        endContent={<IconCoin size={"14"} />}
        variant="flat"
        size="sm"
      >
        DIVIDEND
      </Chip>
    );
  } else if (type == "INTEREST") {
    return (
      <Chip
        color="warning"
        endContent={<IconCoin size={"14"} />}
        variant="flat"
        size="sm"
      >
        INTEREST
      </Chip>
    );
  }
  return <Chip color="default">UNKNOWN</Chip>;
}
