import Image from 'next/image';

import heroImg from '../../assets/hero-visial.png';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <div className="border border-b-2 bg-muted py-[70px] lg:py-[50px]">
      <div className="flex justify-center">
        <div className="flex w-[90%] flex-col items-center gap-2 md:w-[70%] lg:flex-row lg:gap-10">
          <div className="order-2 space-y-5 lg:order-1">
            <h2 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-[2.5rem] font-bold text-transparent">
              毎朝自分の過去コードからtipsを
            </h2>
            <p className="text-[1rem]">自身のGithubの過去コードから毎日に一つランダムにtipsを提供いたします。</p>
            <Button>いますぐ始める</Button>
          </div>
          <div className="order-1 lg:order-2">
            <Image src={heroImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
