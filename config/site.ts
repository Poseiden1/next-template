export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Technische Universität Braunschweig",
  description:
    "Template for Next.js + TypeScript + Tailwind CSS",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Admin",
      href: "/admin",
    },
  ],
  links: {
    twitter: "https://twitter.com/ramandevnet",
    github: "https://github.com/poseiden1",
    docs: "https://ramandev.net",
  },
}
