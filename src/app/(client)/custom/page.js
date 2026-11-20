import { Suspense } from "react";
import CustomStudioClient from "./CustomStudioClient";

export const metadata = {
  title: "UNLO Custom Studio — Thiết Kế Bản Phối Của Bạn",
  description:
    "Tự do tùy chỉnh hình thêu, tên riêng, logo và thiết kế cá nhân trên phom áo hoodie, sweater, polo xuất xưởng từ UNLO.",
};

export default function CustomPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <CustomStudioClient />
    </Suspense>
  );
}
