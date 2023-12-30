"use client";

import { subtitle, title } from "@/components/primitives";
import {
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { IconMoon, IconSun, IconWand } from "@tabler/icons-react";

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

  return (
    <>
      <h1 className={title()}>Settings</h1>
      <div className="flex flex-col items-start justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <h2 className={subtitle()}>Localization</h2>
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
        </div>
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <h2 className={subtitle()}>Theme</h2>

          <div className="flex flex-wrap gap-4">
            <Tabs aria-label="Theme switch" isDisabled>
              <Tab
                key="light"
                title={
                  <div className="flex items-center space-x-2">
                    <IconSun />
                    <span>Light</span>
                  </div>
                }
              />
              <Tab
                key="dark"
                title={
                  <div className="flex items-center space-x-2">
                    <IconMoon />
                    <span>Dark</span>
                  </div>
                }
              />
              <Tab
                key="auto"
                title={
                  <div className="flex items-center space-x-2">
                    <IconWand />
                    <span>System default</span>
                  </div>
                }
              />
            </Tabs>
          </div>
          <Input
            isDisabled
            type="color"
            classNames={{
              input: "border-0 w-full h-full",
              inputWrapper: "p-2 overflow-hidden",
            }}
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          <h2 className={subtitle()}>Account</h2>

          <Button color="danger" variant="bordered" fullWidth>
            Delete account
          </Button>
        </div>
      </div>
    </>
  );
}
