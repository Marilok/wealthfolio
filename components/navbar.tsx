"use client";
import {
  Button,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/react";

import { link as linkStyles } from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import clsx from "clsx";
import NextLink from "next/link";

import { GithubIcon, HeartFilledIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

import { Logo } from "@/components/icons";
import { IconChartPie, IconSettings } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const isInApp = usePathname().startsWith("/app");

  return (
    <NextUINavbar maxWidth="xl" position="sticky" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="between">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Wealthfolio</p>
          </NextLink>
        </NavbarBrand>
        {isInApp && (
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        )}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          {!isInApp && <ThemeSwitch />}
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
        {(!isInApp && (
          <NavbarItem className="hidden md:flex">
            <NextLink href="/app/assets">
              <Button color="primary" startContent={<IconChartPie />}>
                My Portfolio
              </Button>
            </NextLink>
          </NavbarItem>
        )) || (
          <NavbarItem className="hidden md:flex">
            <NextLink href="settings">
              <Button color="default" isIconOnly>
                <IconSettings />
              </Button>
            </NextLink>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
