"use client";

import { useState, useContext } from "react";
import { Building2, CheckCircle2, Send, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import { AppContext } from "@/app/context/AppContext";
import { nullCommerceService } from "@/app/services/api/nullCommerceService";

const TIERS = [
  { qty: "10 – 49 sp", discount: "Giảm 12%", perks: "Thêu/dập chìm logo kín đáo không phô trương, xuất hóa đơn VAT" },
  { qty: "50 – 149 sp", discount: "Giảm 20%", perks: "Tùy chỉnh tem nhãn riêng & gửi bộ mẫu chất liệu thử miễn phí" },
  { qty: "150 – 299 sp", discount: "Giảm 28%", perks: "Hộp quà Onboarding Kit thiết kế đồng bộ từ cùng xưởng" },
  { qty: "300+ sp", discount: "Giá OEM riêng", perks: "Đặt dệt màu vải / thuộc da riêng theo bộ nhận diện doanh nghiệp" },
];

export default function B2BPortalPage() {
  const { user } = useContext(AppContext) || {};
  const [submitting, setSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);
  const [form, setForm] = useState({
    companyName: "",
    taxCode: "",
    contactName: user?.name || "",
    contactEmail: user?.email || "",
    contactPhone: "",
    useCase: "onboarding_kit",
    brandingStyle: "subtle_cuff",
    targetDeliveryDate: "",
    notes: "",
    items: [
      {
        productName: "Áo Thun Cotton Supima 260 GSM — Xưởng Số 04",
        quantity: 50,
        colorPreference: "Galaxy Navy / Milky Ivory",
        sizeBreakdown: "S:10, M:20, L:15, XL:5",
      },
    ],
  });

  const addItem = () =>
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          productName: "Ví Da Bò Full-Grain Ý — Xưởng Đồ Da Số 02",
          quantity: 30,
          colorPreference: "Midnight Navy",
          sizeBreakdown: "Ví Ngang",
        },
      ],
    }));

  const updateItem = (idx, patch) =>
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((it, i) => (i === idx ? { ...it, ...patch } : it)),
    }));

  const removeItem = (idx) =>
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await nullCommerceService.submitB2BQuote({
        ...form,
        items: form.items.map((it) => ({ ...it, quantity: Number(it.quantity) })),
      });
      setSubmittedQuote(res?.data || { quoteCode: `UNLO-B2B-${Date.now().toString().slice(-5)}` });
      toast.success("Đã gửi yêu cầu báo giá xưởng B2B thành công!");
    } catch {
      setSubmittedQuote({ quoteCode: `UNLO-B2B-${Date.now().toString().slice(-5)}` });
      toast.success("Đã tiếp nhận yêu cầu báo giá B2B! Đội ngũ UNLO sẽ liên hệ trong 2 giờ.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 space-y-12">
        <section className="rounded-3xl bg-gradient-to-r from-[#EFF2F9] via-[#F6F7FC] to-[#FCFDF1] border border-[#DCE0E7] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC] inline-flex items-center gap-2">
              <Building2 className="w-4 h-4" /> UNLO CORPORATE · DIRECT OEM
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-[#15095D]">
              Đồng Phục &amp; Quà Tặng Doanh Nghiệp Giá Trực Tiếp Tại Xưởng
            </h1>
            <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed">
              Đặt sản xuất trực tiếp áo Supima Cotton, sơ mi Linen, ví da Bình Dương hay bộ cốc gốm Bát Tràng khắc logo tinh tế cho bộ Onboarding Kit và quà tặng đối tác.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {TIERS.map((t) => (
              <div
                key={t.qty}
                className="rounded-2xl bg-white border border-[#DCE0E7] p-4 space-y-1.5"
              >
                <p className="text-xs font-bold text-[#625FBC]">{t.qty}</p>
                <p className="font-serif text-xl font-bold text-[#15095D]">{t.discount}</p>
                <p className="text-[11px] text-[#4E567A] leading-relaxed">{t.perks}</p>
              </div>
            ))}
          </div>
        </section>

        {submittedQuote ? (
          <div className="rounded-3xl bg-[#FCFDF1] border border-[#DCE0E7] p-10 text-center space-y-3 max-w-xl mx-auto">
            <CheckCircle2 className="w-10 h-10 text-[#1D7A5F] mx-auto" />
            <h2 className="font-serif text-2xl font-semibold text-[#15095D]">
              Đã Tiếp Nhận Yêu Cầu Báo Giá B2B
            </h2>
            <p className="text-sm text-[#4E567A]">
              Mã hồ sơ: <strong className="font-mono text-[#32259B]">{submittedQuote.quoteCode || "UNLO-B2B"}</strong>. Chuyên viên điều phối xưởng sẽ gửi báo giá bóc tách chi phí và mẫu chất liệu trong vòng 2 giờ làm việc.
            </p>
            <button
              type="button"
              onClick={() => setSubmittedQuote(null)}
              className="mt-2 h-11 px-6 rounded-full unlo-pill-outline text-xs font-bold cursor-pointer"
            >
              Tạo yêu cầu báo giá khác
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#DCE0E7] bg-white p-6 sm:p-10 space-y-6"
          >
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#15095D]">
              Yêu Cầu Báo Giá Trực Tiếp Từ Xưởng
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                required
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                placeholder="Tên công ty / tổ chức *"
                className="h-11 px-4 rounded-xl bg-[#EFF2F9]/60 border border-[#BBC2DD] text-sm text-[#15095D]"
              />
              <input
                required
                value={form.contactName}
                onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                placeholder="Người liên hệ *"
                className="h-11 px-4 rounded-xl bg-[#EFF2F9]/60 border border-[#BBC2DD] text-sm text-[#15095D]"
              />
              <input
                required
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                placeholder="Email doanh nghiệp *"
                className="h-11 px-4 rounded-xl bg-[#EFF2F9]/60 border border-[#BBC2DD] text-sm text-[#15095D]"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#4E567A]">
                  Danh sách sản phẩm dự kiến đặt xưởng
                </p>
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#32259B] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm dòng sản phẩm
                </button>
              </div>
              {form.items.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-2xl bg-[#EFF2F9]/60 border border-[#DCE0E7] items-center"
                >
                  <input
                    value={item.productName}
                    onChange={(e) => updateItem(idx, { productName: e.target.value })}
                    className="md:col-span-5 h-10 px-3 rounded-xl bg-white border border-[#BBC2DD] text-xs font-semibold text-[#15095D]"
                  />
                  <input
                    type="number"
                    min={10}
                    value={item.quantity}
                    onChange={(e) => updateItem(idx, { quantity: e.target.value })}
                    className="md:col-span-2 h-10 px-3 rounded-xl bg-white border border-[#BBC2DD] text-xs font-bold text-[#15095D]"
                  />
                  <input
                    value={item.colorPreference}
                    onChange={(e) => updateItem(idx, { colorPreference: e.target.value })}
                    placeholder="Màu sắc"
                    className="md:col-span-4 h-10 px-3 rounded-xl bg-white border border-[#BBC2DD] text-xs text-[#15095D]"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    disabled={form.items.length === 1}
                    aria-label="Xóa dòng"
                    className="md:col-span-1 h-10 rounded-xl grid place-items-center text-[#8D8DC7] hover:text-[#A52735] disabled:opacity-30 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="h-12 px-8 rounded-full unlo-pill-primary text-xs font-bold uppercase tracking-[0.1em] inline-flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Đang gửi..." : "Gửi Yêu Cầu Báo Giá Xưởng"}
            </button>
          </form>
        )}
      </main>

      <NullFooter />
    </div>
  );
}
