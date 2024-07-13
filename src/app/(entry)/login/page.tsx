import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import LoginImg from "@/assets/login-visual.webp";
import SignInBtn from "@/components/login/sign-in-btn";
import { getRepositoryCount } from "@/data/repository";
import { authenticateUser } from "@/lib/authenticate-user";

export default async function Page() {
  const sessionUser = await authenticateUser();

  if (sessionUser) {
    const { id } = sessionUser;

    const userRepoCount = await getRepositoryCount(id);

    if (!userRepoCount) {
      redirect("/repositories/init");
    } else {
      redirect("/home");
    }
  }

  return (
    <div className="flex justify-center">
      <div className="flex h-screen w-[90%] md:w-full">
        <div className="flex w-full items-center justify-center lg:w-[65%]">
          <div>
            <Link href="/">
              <div className="group flex items-center gap-1 font-bold text-[#d0bda4]">
                <ArrowLeft
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-[-5px]"
                  strokeWidth={3}
                />
                <p className="text-[13px]">トップページに戻る</p>
              </div>
            </Link>
            <h2 className="mb-[5px] text-[2.5rem] font-bold">Sign in to Tips Box</h2>
            <p className="mb-[15px] text-[1rem] text-[#aaa]">
              新規登録、ログインどちらも以下のリンクから行うことができます。
            </p>
            <SignInBtn />
          </div>
        </div>
        <div className="hidden lg:block lg:w-[35%]">
          <Image src={LoginImg} alt="" className="h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
