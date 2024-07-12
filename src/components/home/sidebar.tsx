import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar() {
  return (
    <div className="flex h-[300px] w-full items-center justify-center rounded-lg border xl:w-[30%]">
      <div className="text-center">
        <Avatar className="mb-[7px] size-[75px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="text-[20px] font-bold">shadcn</h3>
      </div>
    </div>
  );
}
