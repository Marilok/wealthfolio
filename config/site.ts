export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Wealthfolio",
  description: "Manage and track your personal portfolio like an expert.",
  navItems: [
    {
      label: "Assets",
      href: "assets",
    },
    {
      label: "Accounts",
      href: "accounts",
    },
    {
      label: "Transactions",
      href: "transactions",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Marilok/Wealthfolio",
    sponsor: "https://github.com/Marilok/Wealthfolio",
  },
};
