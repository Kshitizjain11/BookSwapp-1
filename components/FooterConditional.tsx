"use client";
import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";

export function FooterConditional() {
  const pathname = usePathname();
  if (pathname.startsWith("/chat")) return null;
  return <Footer />;
}
