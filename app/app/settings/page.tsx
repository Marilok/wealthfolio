"use client";

import { subtitle, title } from "@/components/primitives";
import { ThemeSwitch } from "@/components/theme-switch";
import { Database } from "@/types/supabase";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function Page() {
  const languages = [
    {
      label: "Czech",
      value: "CZ",
      icon: "https://flagcdn.com/cz.svg",
    },
    {
      label: "English",
      value: "EN",
      icon: "https://flagcdn.com/gb.svg",
    },
  ];

  const locales = [
    {
      label: "Czech",
      value: "cs-CZ",
      icon: "https://flagcdn.com/cz.svg",
    },
    {
      label: "English",
      value: "en-US",
      icon: "https://flagcdn.com/gb.svg",
    },
  ];

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const router = useRouter();

  return (
    <>
      <h1 className={title()}>Settings</h1>
      <div className="flex flex-col items-start justify-center gap-4 py-8 md:py-10 w-80">
        <Card fullWidth>
          <CardHeader className=" font-semibold">Language</CardHeader>
          <CardBody className="flex gap-4 flex-col">
            <Select
              label="Date and time format"
              isDisabled
              defaultSelectedKeys={["EN"]}
            >
              {languages.map((language) => (
                <SelectItem
                  key={language.value}
                  startContent={
                    <Avatar
                      alt={language.label}
                      className="w-6 h-6"
                      src={language.icon}
                    />
                  }
                >
                  {language.label}
                </SelectItem>
              ))}
            </Select>
            <Select label="Language" isDisabled defaultSelectedKeys={["EN"]}>
              {languages.map((language) => (
                <SelectItem
                  key={language.value}
                  startContent={
                    <Avatar
                      alt={language.label}
                      className="w-6 h-6"
                      src={language.icon}
                    />
                  }
                >
                  {language.label}
                </SelectItem>
              ))}
            </Select>
          </CardBody>
        </Card>
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <h2 className={subtitle()}>Theme</h2>

          <ThemeSwitch />
        </div>
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <h2 className={subtitle()}>Account</h2>
          <Button
            variant="bordered"
            fullWidth
            onPress={async () => {
              await supabase.auth.signOut();
              router.push("/");
            }}
          >
            Signout
          </Button>
          <Button color="danger" variant="bordered" fullWidth>
            Delete account
          </Button>
        </div>
      </div>
    </>
  );
}
