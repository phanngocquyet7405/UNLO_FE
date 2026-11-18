"use client";

import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />
      <main className="flex-1">{children}</main>
      <NullFooter />
    </div>
  );
}
