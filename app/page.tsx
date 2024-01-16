import { GithubIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import { IconCheck, IconRocket, IconX } from "@tabler/icons-react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-2xl justify-center">
        <h1 className={title()}>Watch your </h1>
        <h1 className={title({ color: "violet" })}>investments grow</h1>
        <h1 className={title()}> to the moon like an expert. 🚀</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fully open-source portfolio tracker and analyzer.
        </h2>
      </div>

      <div className="flex gap-3 items-center justify-start max-w-2xl w-full">
        <Button color="primary" size="lg" endContent={<IconRocket />}>
          Get started
        </Button>

        <Link
          isExternal
          className={buttonStyles({ variant: "ghost", size: "lg" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <h2 className={title()}>Pricing</h2>
        <p className={subtitle()}>
          Start for free and add more badass features later. 😎
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          {pricingData.map((pricingOption, index) => (
            <Card key={index} className="p-4 w-80">
              <CardHeader className="text-center flex flex-col gap-4">
                <span className="w-full block">{pricingOption.title}</span>
                <span className="font-bold text-3xl ">
                  {pricingOption.price}
                </span>
              </CardHeader>
              <Divider className="my-4" />
              <CardBody>{pricingOption.description}</CardBody>
              <Divider className="my-4" />
              <CardBody>
                <div className="gap-2 flex-col flex">
                  {pricingOption.features.map((feature, index) => (
                    <div
                      className="flex flex-row gap-2 items-center"
                      key={index}
                    >
                      <Avatar
                        icon={<IconCheck size={10} />}
                        className="w-4 h-4"
                        color="success"
                      />
                      <span key={index}>{feature}</span>
                    </div>
                  ))}
                  {pricingOption.featuresDisabled.map((feature, index) => (
                    <div
                      className="flex flex-row gap-2 items-center"
                      key={index}
                    >
                      <Avatar
                        icon={<IconX color="black" size={10} />}
                        className="w-4 h-4"
                        color="default"
                      />
                      <span key={index}>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
              <CardFooter>
                <Button fullWidth color="primary" endContent={<IconRocket />}>
                  Get started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const pricingData = [
  {
    title: "Free",
    price: "$0 / mo",
    description: "Everything needed to track and analyze your portfolio.",
    features: [
      "Fully hosted",
      "Manage transactions",
      "Get performance of investments",
    ],
    featuresDisabled: [
      "Get tips on investments",
      "Share your portfolio with others",
    ],
  },
  {
    title: "Plus",
    price: "$2 / mo",
    description: "Analyze your portfolio and get tips on your investments.",
    features: [
      "Fully hosted",
      "Manage transactions",
      "Get performance of investments",
      "Get tips on investments",
      "Share your portfolio with others",
    ],
    featuresDisabled: [],
  },
];
