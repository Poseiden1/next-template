"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button"
export default function LogoutButton() {
  const clickEvent = async () => {
    await signOut();
  };

  return (
    <div onClick={clickEvent} className={`${buttonVariants({ variant: "outline" })} flex flex-row items-center cursor-pointer`}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Abmelden</span>
    </div>
  );
}
