import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ModeToggle } from "./mode-toggle";

export default function Header() {
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
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}