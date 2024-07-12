"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function SignInBtn() {
  return (
    <Button
      className="flex items-center gap-2"
      onClick={() => {
        signIn("github", { callbackUrl: "/repositories/init" });
      }}
    >
      <GitHubLogoIcon />
      <p>Sign in with GitHub</p>
    </Button>
  );
}
