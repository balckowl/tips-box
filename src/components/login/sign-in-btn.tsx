"use clinet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export default function SignInBtn() {
  return (
    <Button className="flex items-center gap-2">
      <GitHubLogoIcon />
      <p>Sign in with GitHub</p>
    </Button>
  );
}
