import { Metadata } from "next";
import { redirect } from "next/navigation";

import Sidebar from "@/components/home/sidebar";
import Tip from "@/components/home/tips-section/tip";
import WaitTips from "@/components/home/tips-section/wait-tips";
import { getRepositoryCount } from "@/data/repository";
import { getTipsByUserId } from "@/data/tip";
import { authenticateUser } from "@/lib/authenticate-user";
import { getOgpMetaData } from "@/lib/get-ogp-metadata";

export const metadata: Metadata = {
  title: "ホーム",
  ...getOgpMetaData({ path: "/home" }),
};

export default async function Page() {
  const sessionUser = await authenticateUser();
  if (!sessionUser) redirect("/login");

  const { id, name, image } = sessionUser;

  const userRepositoryCount = await getRepositoryCount(id);
  if (userRepositoryCount === 0) redirect("/repositories/init");

  const tipsList = await getTipsByUserId(id);

  return (
    <div className="min-h-[calc(100vh-60px-60px)]">
      <div className="mx-auto w-[90%] max-w-[1080px] py-[80px] lg:w-[70%] lg:py-[100px]">
        <h2 className="mb-[10px] text-[1.4rem] font-bold">最新のtips</h2>
        <div className="flex flex-col gap-7 xl:flex-row">
          {tipsList.length === 0 ? (
            <WaitTips />
          ) : (
            tipsList.length > 0 && (
              <div className="w-full space-y-4 xl:w-[65%]">
                {tipsList.map((item, index) => (
                  <Tip
                    key={index}
                    title={item.title}
                    content={item.content}
                    createdAt={item.createdAt}
                    codeUrl={item.codeUrl}
                  />
                ))}
              </div>
            )
          )}
          {image && name && <Sidebar photoUrl={image} username={name} />}
        </div>
      </div>
    </div>
  );
}
