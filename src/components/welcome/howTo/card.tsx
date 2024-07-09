import Image from 'next/image';

interface Props {
  id: string;
  title: string;
  src: string;
}

export default function Card({ id, title, src }: Props) {
  return (
    <div className="space-y-3 rounded-lg border-2 bg-muted p-7">
      <div className="flex items-center gap-3">
        <div className="flex size-[40px] items-center justify-center rounded-full bg-yellow-200 font-bold dark:text-black">
          {id}
        </div>
        <h4 className="text-[1.4rem] font-bold lg:text-[1.7rem]">{title}</h4>
      </div>
      <div>
        <Image src={src} alt="" width={300} height={100} className="mx-auto" />
      </div>
    </div>
  );
}
