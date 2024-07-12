import Image from "next/image";
import Link from "next/link";

import heroImg from "@/assets/hero-visual.png";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="border border-b-2 bg-muted py-[70px] lg:py-[50px]">
      <div className="flex justify-center">
        <div className="flex w-[90%] flex-col items-center gap-2 md:w-[70%] lg:flex-row lg:gap-10">
          <div className="order-2 space-y-5 lg:order-1">
            <h2 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-[2.5rem] font-bold text-transparent">
              過去のコードから、まだ見ぬ技術を
            </h2>
            <p className="text-[1rem]">ご自身のGitHubリポジトリから、毎日ランダムなtipsをお届けします。</p>
            <Button asChild>
              <Link href="/login">いますぐはじめる</Link>
            </Button>
          </div>
          <div className="order-1 lg:order-2">
            <Image src={heroImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
