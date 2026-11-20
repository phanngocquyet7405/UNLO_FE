"use client";

import { Toaster } from "sonner";
import NullHeader from "@/components/null/NullHeader";
import Footer from "../components/ui/footer";
import { withAuth } from "@/app/middleware/authMiddleware";

// ─── Inner layout (bọc bởi withAuth bên dưới) ────────────────────────────────
function ProfileLayout({ children }) {
  return (
    <>
      {/* ── Header ── */}
      <NullHeader />

      {/* ── Scrollable body ── */}
      <div className="page-canvas min-h-screen">
        {children}
      </div>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Global toast (richColors, position nhất quán) ── */}
      <Toaster richColors position="top-right" />
    </>
  );
}

// withAuth bảo vệ toàn bộ layout — cả profile lẫn my-subscriptions
export default withAuth(ProfileLayout);
