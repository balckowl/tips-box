import Link from "next/link";

import { Button } from "@/components/ui/button";
import { authenticateUser } from "@/lib/authenticate-user";

import LogoutBtn from "./logout-btn";
import { ModeToggle } from "./mode-toggle";

export default async function Header() {
  const sessionUser = await authenticateUser();

  return (
    <header className="h-[60px]">
      <div className="container flex h-full items-center justify-between">
        <Link href="/">
          <h1 className="text-[20px] font-bold">Tips Box</h1>
        </Link>
        <div className="flex items-center gap-3">
          <Button asChild>
            <Link href="/login">はじめる</Link>
          </Button>
          {sessionUser ? (
            <LogoutBtn />
          ) : (
            <Button asChild>
              <Link href="/login">はじめる</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
