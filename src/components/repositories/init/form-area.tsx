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
  segment: z.string().min(1, {
    message: "必要な値が入力されていません",
  }),
});

export default function FormArea() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      segment: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const { initRepositoryMutation } = useRepositoryMutation();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await initRepositoryMutation.trigger({ repositoryUrl: `${GITHUB_URL}${data.segment}` });
    router.push("/home");
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
                    <Input placeholder="{username}/{repositoryname}" {...field} className="foucs: outline-none" />
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
