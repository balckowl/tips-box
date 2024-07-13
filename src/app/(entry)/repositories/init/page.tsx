import Image from "next/image";
import { redirect } from "next/navigation";

import RepoImg from "@/assets/repository-visual.webp";
import FormArea from "@/components/repositories/init/form-area";
import { getRepositoryCount } from "@/data/repository";
import { authenticateUser } from "@/lib/authenticate-user";

export default async function Page() {
  const sessionUser = await authenticateUser();
  if (!sessionUser) redirect("/login");

  const userRepositoryCount = await getRepositoryCount(sessionUser.id);
  if (userRepositoryCount > 0) return redirect("/home");

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block lg:w-[35%]">
        <Image src={RepoImg} alt="" className="h-full object-cover" />
      </div>
      <div className="mx-auto flex w-[90%] items-center lg:w-[65%]">
        <div className="mx-auto w-full lg:w-3/4">
          <h3 className="mb-[8px] text-[30px] font-bold">URLを入れよう</h3>
          <FormArea />
        </div>
      </div>
    </div>
  );
}
