"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Heading() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      backDelay: 1000,
      cursorChar: "|",
      loop: true,
      strings: ["過去のコードから<br />まだ見ぬ技術を。", "これまでの知識から<br />未知の技術を。"],
      typeSpeed: 120,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <h2 className="h-[120px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-[2.5rem] font-bold text-transparent">
      <span ref={el} />
    </h2>
  );
}
