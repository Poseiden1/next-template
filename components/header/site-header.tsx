import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons/icons";
import { MainNav } from "@/components/header/main-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Twitter } from "lucide-react";
import LogoutButton from "../session/logout-button";

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 pr-8">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
            <LogoutButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
