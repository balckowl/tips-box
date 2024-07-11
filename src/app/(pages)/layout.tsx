import { ReactNode } from "react";

import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header/header";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
