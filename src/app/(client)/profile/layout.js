"use client";

import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import { withAuth } from "@/app/middleware/authMiddleware";

function ProfileLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />
      <div className="flex-1">{children}</div>
      <NullFooter />
    </div>
  );
}

export default withAuth(ProfileLayout);
