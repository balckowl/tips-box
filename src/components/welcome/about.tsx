import Image from 'next/image';

import AboutImg from '../../assets/about-visial.png';

export default function About() {
  return (
    <div className="bg-muted py-[50px]">
      <div className="flex justify-center">
        <div className="flex w-[90%] flex-col gap-10 rounded-md border border-muted p-5 dark:bg-zinc-700 md:w-[70%] lg:flex-row">
          <div className="space-y-3">
            <h4 className="text-[1.7rem] font-bold">毎朝手軽に自分が使っている技術のtipsを得られるサービス</h4>
            <p className="text-[1rem] leading-9">
              毎朝、あなたが使っている技術に関する役立つヒントを手軽に受け取れるサービスです。
              最新のテクノロジートレンドや効率的なコーディングテクニックを提供し、あなたのスキルアップをサポートします。
            </p>
          </div>
          <div>
            <Image src={AboutImg} alt="" width={1000} height={700} />
          </div>
        </div>
      </div>
    </div>
  );
}
