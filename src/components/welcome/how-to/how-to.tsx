import { HOWTOLIST } from "@/const/how-to";

import Card from "./card";

export default function HowTo() {
  return (
    <div className="bg-[#eee] py-[70px] dark:bg-zinc-700">
      <div className="flex justify-center">
        <div className="w-[90%] space-y-3 md:w-[70%]">
          <div className="space-y-3">
            <h3 className="text-[2.0rem] font-bold">Tips Boxの使い方</h3>
            <p>Tips Boxは以下の4ステップで簡単に始めることができます。</p>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {HOWTOLIST.map((item) => (
              <Card key={item.id} id={item.id} title={item.title} src={item.src} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
