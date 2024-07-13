"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function LogoutBtn() {
  return (
    <div>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        ログアウト
      </Button>
    </div>
  );
}
