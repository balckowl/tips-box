"use client";

import { BuiltInProviderType } from "next-auth/providers/index";
import { signIn } from "next-auth/react";

type Props = {
  provider: BuiltInProviderType;
};

const GithubLogin = ({ provider }: Props) => {
  return (
    <div
      onClick={() => {
        signIn(provider);
      }}
    >
      GithubLogin
    </div>
  );
};

export default GithubLogin;
