export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Wealthfolio",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		 {
      label: "Overview",
      href: "/overview",
    },
    {
      label: "Assets",
      href: "/assets",
    },
	{
      label: "Accounts",
      href: "/accounts",
    },
	 {
      label: "Transactions",
      href: "/transactions",
    },
	 {
      label: "Settings",
      href: "/settings",
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
    sponsor: "https://github.com/Marilok/Wealthfolio"
	},
};
