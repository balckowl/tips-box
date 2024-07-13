import { redirect } from "next/navigation";

import About from "@/components/welcome/about";
import Hero from "@/components/welcome/hero";
import HowTo from "@/components/welcome/how-to/how-to";
import Start from "@/components/welcome/start";
import { getRepositoryCount } from "@/data/repository";
import { authenticateUser } from "@/lib/authenticate-user";

export default async function Home() {
  const sessionUser = await authenticateUser();

  if (sessionUser) {
    const userRepositoryCount = await getRepositoryCount(sessionUser.id);

    if (userRepositoryCount === 0) {
      redirect("/repositories/init");
    } else {
      redirect("/home");
    }
  }

  return (
    <div>
      <Hero />
      <About />
      <HowTo />
      <Start />
    </div>
  );
}
