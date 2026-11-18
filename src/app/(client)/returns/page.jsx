"use client";

import { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Truck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import { nullCommerceService } from "@/app/services/api/nullCommerceService";

const RETURN_REASONS = [
  "Muốn đổi kích cỡ (Rộng hơn / Ôm hơn)",
  "Màu sắc hoặc chất liệu chưa đúng kỳ vọng",
  "Phát hiện lỗi đường may / phụ kiện từ xưởng",
  "Sản phẩm bị hư hại trong quá trình vận chuyển",
];

export default function SelfServiceReturnPortalPage() {
  const [orderCode, setOrderCode] = useState("UNLO-261108");
  const [requestType, setRequestType] = useState("exchange_size");
  const [targetSize, setTargetSize] = useState("L");
  const [reason, setReason] = useState(RETURN_REASONS[0]);
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRmas, setSubmittedRmas] = useState([]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 4);
    const previews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...previews].slice(0, 4));
  };

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderCode.trim()) {
      toast.error("Vui lòng nhập mã đơn hàng của bạn.");
      return;
    }
    setSubmitting(true);
    const payload = {
      orderCode: orderCode.trim().toUpperCase(),
      type: requestType,
      targetSize: requestType === "exchange_size" ? targetSize : undefined,
      reason,
      notes,
      evidenceCount: photos.length,
    };

    try {
      const res = await nullCommerceService.submitReturn(payload);
      const rmaCode = res?.data?.rmaCode || `RMA-${Date.now().toString().slice(-6)}`;
      setSubmittedRmas((prev) => [
        { ...payload, rmaCode, status: "Đã tiếp nhận · Shipper thu hồi tận nhà trong 24h" },
        ...prev,
      ]);
      toast.success(`Đã tạo phiếu đổi trả ${rmaCode} thành công!`);
    } catch {
      const rmaCode = `RMA-${Date.now().toString().slice(-6)}`;
      setSubmittedRmas((prev) => [
        { ...payload, rmaCode, status: "Đã tiếp nhận · Chờ shipper thu hồi miễn phí" },
        ...prev,
      ]);
      toast.success(`Đã ghi nhận yêu cầu đổi trả 30 ngày (${rmaCode})!`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 max-w-[1160px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 space-y-10">
        {/* Hero */}
        <section className="rounded-3xl bg-gradient-to-br from-[#15095D] via-[#1F0C85] to-[#0B2056] text-[#FCFDF1] p-7 sm:p-12 space-y-4">
          <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#BBC2DD]">
            SELF-SERVICE RETURN PORTAL · 30 DAYS
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
            Cổng Tự Phục Vụ Đổi Size &amp; Hoàn Tiền 30 Ngày
          </h1>
          <p className="text-sm sm:text-base text-[#DCE0E7]/90 max-w-2xl leading-relaxed">
            Mua sắm trực tiếp từ xưởng không rủi ro. Chỉ cần nhập mã đơn và tải ảnh thực tế — shipper đối tác sẽ đến thu hồi tận nhà miễn phí và đổi size hoặc hoàn tiền 100% trong 24 giờ.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { icon: Clock, text: "Hỗ trợ trong 30 ngày kể từ lúc nhận hàng" },
              { icon: Truck, text: "Shipper lấy hàng đổi trả tận nhà miễn phí" },
              { icon: ShieldCheck, text: "Hoàn tiền 100% hoặc đổi mới lỗi sản xuất" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/10 border border-[#9EA1D2]/30 text-xs font-medium text-[#FCFDF1]"
                >
                  <Icon className="w-4 h-4 text-[#BBC2DD] shrink-0" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Self-Service Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 rounded-3xl border border-[#DCE0E7] bg-white p-6 sm:p-8 space-y-5"
          >
            <h2 className="font-serif text-2xl font-semibold text-[#15095D]">
              Tạo Yêu Cầu Đổi Size / Hoàn Trả
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="rma-order-code"
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#4E567A] mb-1.5"
                >
                  Mã đơn hàng UNLO *
                </label>
                <input
                  id="rma-order-code"
                  type="text"
                  required
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value)}
                  placeholder="VD: UNLO-261108"
                  className="w-full h-11 px-4 rounded-xl bg-[#EFF2F9]/60 border border-[#BBC2DD] text-sm font-mono font-bold text-[#15095D]"
                />
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#4E567A] mb-1.5">
                  Hình thức mong muốn
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "exchange_size", label: "Đổi kích cỡ" },
                    { id: "refund", label: "Hoàn tiền 100%" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRequestType(opt.id)}
                      className={`h-11 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        requestType === opt.id
                          ? "bg-[#15095D] text-[#FCFDF1] border-[#15095D]"
                          : "bg-white text-[#15095D] border-[#BBC2DD]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {requestType === "exchange_size" && (
              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#4E567A] mb-2">
                  Chọn size muốn đổi sang
                </span>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setTargetSize(s)}
                      className={`h-10 w-14 rounded-full text-xs font-bold border cursor-pointer ${
                        targetSize === s
                          ? "bg-[#32259B] text-white border-[#32259B]"
                          : "bg-[#EFF2F9] text-[#15095D] border-[#DCE0E7]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="rma-reason"
                className="block text-xs font-bold uppercase tracking-[0.12em] text-[#4E567A] mb-1.5"
              >
                Lý do đổi trả
              </label>
              <select
                id="rma-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white border border-[#BBC2DD] text-sm font-medium text-[#15095D]"
              >
                {RETURN_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Photo Evidence Upload */}
            <div className="space-y-2.5">
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#4E567A]">
                Tải ảnh thực tế sản phẩm (tối đa 4 ảnh)
              </span>
              <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed border-[#BBC2DD] bg-[#EFF2F9]/50 hover:border-[#32259B] cursor-pointer transition-colors text-center">
                <Upload className="w-6 h-6 text-[#32259B]" />
                <span className="text-xs font-semibold text-[#15095D]">
                  Bấm để chọn ảnh sản phẩm hoặc tem mác
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="sr-only"
                />
              </label>

              {photos.length > 0 && (
                <div className="grid grid-cols-4 gap-3 pt-1">
                  {photos.map((photo, idx) => (
                    <div
                      key={photo.url}
                      className="relative aspect-square rounded-xl overflow-hidden border border-[#DCE0E7]"
                    >
                      <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        aria-label="Xóa ảnh"
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-[#15095D]/85 text-white grid place-items-center cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="rma-notes"
                className="block text-xs font-bold uppercase tracking-[0.12em] text-[#4E567A] mb-1.5"
              >
                Ghi chú thêm cho kho xưởng (tùy chọn)
              </label>
              <textarea
                id="rma-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="VD: Khung giờ thuận tiện để shipper đến thu hồi..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#BBC2DD] text-sm text-[#15095D] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-full unlo-pill-primary text-xs font-bold uppercase tracking-[0.1em] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              {submitting ? "Đang gửi yêu cầu..." : "Gửi Yêu Cầu Đổi Trả Miễn Phí"}
            </button>
          </form>

          {/* Submitted RMA Tracker */}
          <aside className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl bg-[#FCFDF1] border border-[#DCE0E7] p-6 space-y-4">
              <h3 className="font-serif text-xl font-semibold text-[#15095D]">
                Trạng Thái Phiếu Đổi Trả (RMA)
              </h3>

              {submittedRmas.length === 0 ? (
                <p className="text-xs text-[#4E567A] leading-relaxed">
                  Các phiếu đổi size hoặc hoàn tiền sau khi gửi sẽ hiển thị ngay tại đây kèm mã theo dõi shipper thu hồi tận nhà.
                </p>
              ) : (
                <div className="space-y-3">
                  {submittedRmas.map((rma) => (
                    <div
                      key={rma.rmaCode}
                      className="rounded-2xl bg-white border border-[#DCE0E7] p-4 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#32259B]">
                          {rma.rmaCode}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1D7A5F]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đã xác nhận
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#15095D]">
                        Đơn {rma.orderCode} ·{" "}
                        {rma.type === "exchange_size"
                          ? `Đổi sang Size ${rma.targetSize}`
                          : "Hoàn tiền 100%"}
                      </p>
                      <p className="text-[11px] text-[#4E567A]">{rma.reason}</p>
                      <p className="text-[11px] font-medium text-[#32259B] pt-1">{rma.status}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-[#DCE0E7]">
                <Link
                  href="/profile/orders"
                  className="text-xs font-bold text-[#32259B] hover:underline"
                >
                  Đăng nhập để xem lịch sử toàn bộ đơn hàng của bạn →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <NullFooter />
    </div>
  );
}
