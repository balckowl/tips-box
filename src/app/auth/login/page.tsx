import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Login from "@/components/login";
import { authOptions } from "@/lib/auth-option";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return <div>{session ? <div>{session}</div> : <Login provider="github" />}</div>;
}
