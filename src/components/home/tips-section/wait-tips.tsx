"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

import WaitTipsImg from "@/assets/wait-tips-visual.png";

const dotVariants = {
  jump: (delay: number) => ({
    transition: {
      delay,
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1.5,
    },
    y: [0, -10, 0],
  }),
};

const Dot = ({ delay }: { delay: number }) => (
  <motion.span
    custom={delay}
    variants={dotVariants}
    initial={{ y: 0 }}
    animate="jump"
    className="mx-[2px] inline-block font-bold"
  >
    .
  </motion.span>
);

export default function WaitTips() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full xl:w-[70%]">
      <div className="rounded-lg">
        <Image src={WaitTipsImg} alt="" width={250} height={250} className="mx-auto" />
        <p className="text-center text-[1.5em]">
          現在Tipsを生成中です
          <Dot delay={0} />
          <Dot delay={0.5} />
          <Dot delay={1} />
        </p>
      </div>
    </div>
  );
}
