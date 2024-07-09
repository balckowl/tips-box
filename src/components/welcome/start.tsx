import Link from 'next/link';

import { Button } from '../ui/button';

export default function Start() {
  return (
    <div className="bg-muted py-[50px]">
      <div className="flex justify-center">
        <div className="flex w-[70%] flex-col items-center justify-center gap-10 lg:flex-row">
          <p className="text-[1.5rem] font-bold lg:text-[2rem]">早速はじめてみよう</p>
          <Button asChild>
            <Link href="/auth/login">はじめる</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
