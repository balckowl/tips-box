import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  photoUrl: string;
  username: string;
}

export default function Sidebar({ photoUrl, username }: Props) {
  return (
    <div className="flex h-[300px] w-full items-center justify-center rounded-lg border xl:w-[30%]">
      <div className="text-center">
        <Avatar className="mb-[7px] size-[75px]">
          <AvatarImage src={photoUrl} alt={username} />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <h3 className="text-[20px] font-bold">{username}</h3>
      </div>
    </div>
  );
}
