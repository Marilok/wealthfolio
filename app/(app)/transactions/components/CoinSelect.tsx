import { Card, CardBody, CardFooter } from "@nextui-org/react";

export default function CoinSelect() {
  const list = [
    {
      amount: "1/4 oz",
    },
    {
      amount: "1/2 oz",
    },
    {
      amount: "1 oz",
    },
    {
      amount: "2 oz",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card
          shadow="sm"
          key={item.amount}
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0 mx-auto mt-4 text-7xl">
            🪙
          </CardBody>
          <CardFooter className="text-small justify-center align-middle text-center font-bold">
            {item.amount}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
