"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GITHUB_URL } from "@/const/url";
import { useRepositoryMutation } from "@/hooks/repository";

const FormSchema = z.object({
  segment: z
    .string()
    .min(1, {
      message: "必要な値が入力されていません",
    })
    .refine(
      async (value) => {
        const response = await fetch(`/api/v1/repositories/validate?url=${GITHUB_URL}${value}`);
        const data = await response.json();
        return data.repositoryExists;
      },
      {
        message: "リポジトリが存在しません",
      },
    ),
});

export default function FormArea() {
  const router = useRouter();
  const { initRepositoryMutation } = useRepositoryMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      segment: "",
    },
    mode: "onBlur",
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await initRepositoryMutation.trigger({ repositoryUrl: `${GITHUB_URL}${data.segment}` });
    router.push("/home");
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const trimmedText = pastedText.startsWith(GITHUB_URL) ? pastedText.slice(GITHUB_URL.length) : pastedText;
    form.setValue("segment", trimmedText);
  };

  return (
    <div className="rounded border p-4 md:p-7 lg:p-10">
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="segment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col gap-1 lg:flex-row lg:items-center">
                    <p>{GITHUB_URL}</p>
                    <Input
                      placeholder="{username}/{repositoryname}"
                      {...field}
                      className="foucs: outline-none"
                      onPaste={handlePaste}
                      onChange={(e) => {
                        field.onChange(e);
                        form.clearErrors("segment");
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-[0.7rem]">
                  tipsが欲しいGitHubのリポジトリのURLを入れよう
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">送信する</Button>
        </form>
      </Form>
    </div>
  );
}
