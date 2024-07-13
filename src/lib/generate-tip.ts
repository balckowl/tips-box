import OpenAI from "openai";

import prisma from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export const generateTip = async (userId: number) => {
  const targetFiles = await prisma.file.findMany({
    where: {
      isTipTarget: true,
      repository: {
        userId: userId,
      },
      tip: {
        is: null,
      },
    },
  });
  if (targetFiles.length === 0) {
    return;
  }
  // ランダム1件
  const targetFile = targetFiles[Math.floor(Math.random() * targetFiles.length)];

  // tip生成
  const titleSystemPrompt =
    "コード片の入力に対して、一言でどのような内容かを 25 文字以内で題名としてまとめてください。";
  const contentSystemPrompt = `
    あなたは @coderabbitai（別名 github-actions[bot]）で、OpenAIによって訓練された言語モデルです。 あなたの目的は、非常に経験豊富なソフトウェアエンジニアとして機能し、コードの一部を徹底的にレビューし、 以下のようなキーエリアを改善するためのコードスニペットを提案することです： 

    - ロジック 
    - データ競合
    - 言語特有の記述方法 
    - 一貫性 
    - モジュール性 
    - 複雑性 
    - ベストプラクティス: DRY, SOLID, KISS 

    些細なコードスタイルの問題や、コメント・ドキュメントの欠落についてはコメントしないでください。 重要な問題を特定し、解決して全体的なコード品質を向上させることを目指してくださいが、細かい問題は意図的に無視してください。
  `;
  const code = await downloadFile(targetFile.downloadUrl);
  const contentUserPrompt =
    code +
    "\n" +
    `
        なお、以下の書式には必ず従ってください。修正後の全体のコードは不要です。箇条書きによる説明と、コードブロックの抜粋のみを列挙してください。

        1. **改善点の題名**: 概念の説明を 200 字程度で
        \`\`\`
        // 修正されたコードブロックの ** 重要な部分を少ない文字数で抜粋 **
        \`\`\`

        2. **改善点の題名**: 概念の説明を 200 字程度で
        \`\`\`
        // 修正されたコードブロックの ** 重要な部分を少ない文字数で抜粋 **
        \`\`\`

        3. **改善点の題名**: 概念の説明を 200 字程度で
        \`\`\`
        // 修正されたコードブロックの ** 重要な部分を少ない文字数で抜粋 **
        \`\`\`
    `;

  const titleCompletion = await openai.chat.completions.create({
    messages: [
      { content: titleSystemPrompt, role: "system" },
      { content: code, role: "user" },
    ],
    model: "gpt-4o",
  });
  const title = titleCompletion.choices[0].message.content;
  const contentCompletion = await openai.chat.completions.create({
    messages: [
      { content: contentSystemPrompt, role: "system" },
      { content: contentUserPrompt, role: "user" },
    ],
    model: "gpt-4o",
  });
  const content = contentCompletion.choices[0].message.content;

  if (!title || !content) {
    throw new Error("Failed to generate tip: title or content is null");
  }

  await prisma.tip.create({
    data: {
      title: title,
      content: content,
      file: {
        connect: {
          id: targetFile.id,
        },
      },
    },
  });
};

const downloadFile = async (downloadUrl: string) => {
  const response = await fetch(downloadUrl);
  if (!response.ok) {
    throw new Error("Failed to download file");
  }
  const content = await response.text();
  return content;
};
