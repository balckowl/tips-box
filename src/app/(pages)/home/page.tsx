import Sidebar from "@/components/home/sidebar";
import Card from "@/components/home/tips-section/card";
import WaitTips from "@/components/home/tips-section/wait-tips";
import { DAMMYDATA } from "@/const/home";

export default function Page() {
  const tipsList = [];

  return (
    <div className="min-h-[calc(100vh-60px-60px)]">
      <div className="mx-auto w-[90%] py-[80px] lg:w-[70%] lg:py-[100px]">
        <h2 className="mb-[10px] text-[1.4rem] font-bold">最新のtips</h2>
        <div className="flex flex-col gap-7 xl:flex-row">
          {tipsList.length == 0 && <WaitTips />}
          {tipsList.length > 0 && (
            <div className="w-full space-y-4 xl:w-[70%]">
              {DAMMYDATA.map((item, index) => (
                <Card
                  key={index}
                  title={item.title}
                  content={item.content}
                  createdAt={item.createdAt}
                  repoUrl={item.repoUrl}
                />
              ))}
            </div>
          )}
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
