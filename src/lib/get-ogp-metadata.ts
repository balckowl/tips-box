import { Metadata } from "next";

export type GetMetaDataOption = {
  path: string;
  siteType?: "website" | "article";
};

export const getOgpMetaData = ({ path, siteType = "article" }: GetMetaDataOption): Metadata => {
  return {
    openGraph: {
      title: "Tips Box",
      description:
        "毎朝手軽に自分が使っている技術のtipsを得られるサービス、毎朝にあなたが使っている技術に関する役立つヒントを手軽に受け取れるサービスです。 最新のテクノロジートレンドや効率的なコーディングテクニックを提供し、あなたのスキルアップをサポートします。",
      images: [
        {
          height: "630",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/ogp/home-ogp.png`,
          width: "1200",
        },
      ],
      locale: "jp",
      siteName: "Tips Box",
      type: siteType,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
    },
  };
};
