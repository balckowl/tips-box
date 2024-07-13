import Image from "next/image";

import notFoundImg from "@/assets/404-visual.png";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-60px-60px)] pt-[40px]">
        <Image src={notFoundImg} alt="" className="mx-auto mb-[10px]" />
        <p className="text-center text-[2.0rem] font-bold">tipsもページないよ</p>
      </div>
      <Footer />
    </>
  );
}
