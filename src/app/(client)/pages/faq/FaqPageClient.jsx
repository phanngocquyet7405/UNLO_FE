"use client";

import { useState, useId, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Search, ArrowRight, HelpCircle, MessageSquare } from "lucide-react";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import { FAQS } from "./faqData";

function AccordionItem({ q, a, idPrefix }) {
  const [open, setOpen] = useState(false);
  const buttonId = `${idPrefix}-btn`;
  const panelId = `${idPrefix}-panel`;

  return (
    <div className="border-b border-[#DCE0E7] last:border-b-0 py-4 transition-colors">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
      >
        <span className="font-serif font-semibold text-sm sm:text-base text-[#15095D] group-hover:text-[#32259B] transition-colors">
          {q}
        </span>
        <div
          className={`w-7 h-7 rounded-full bg-[#EFF2F9] grid place-items-center text-[#15095D] shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 bg-[#15095D] text-white" : ""
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="pt-3 text-xs sm:text-sm text-[#4E567A] leading-relaxed pr-8 animate-in fade-in duration-200"
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPageClient() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const baseId = useId();

  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FAQS.map((category) => {
      if (selectedCat !== "all" && category.category !== selectedCat) {
        return null;
      }
      const items = category.items.filter(
        (item) =>
          !q ||
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q),
      );
      if (items.length === 0) return null;
      return { ...category, items };
    }).filter(Boolean);
  }, [search, selectedCat]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 space-y-12 sm:space-y-16 pb-20">
        {/* Hero */}
        <section className="bg-[#15095D] text-white py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#EB6D48] bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              TRUNG TÂM GIẢI ĐÁP · FAQ
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Câu Hỏi Thường Gặp
            </h1>
            <p className="text-sm sm:text-base text-[#D0D4EE] max-w-xl mx-auto leading-relaxed">
              Mọi thắc mắc về mô hình M2C, minh bạch chi phí, chất lượng vải sợi và chính sách tự đổi trả 30 ngày.
            </p>

            {/* Search Box */}
            <div className="relative max-w-lg mx-auto pt-2">
              <Search className="w-4 h-4 text-[#8C93A8] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm câu hỏi, chất liệu, đổi trả..."
                aria-label="Tìm kiếm câu hỏi"
                className="w-full h-12 pl-11 pr-4 rounded-full bg-white text-[#15095D] text-xs sm:text-sm placeholder:text-[#8C93A8] outline-none shadow-lg focus:ring-2 focus:ring-[#EB6D48]"
              />
            </div>
          </div>
        </section>

        {/* Categories Filter Pills */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-center gap-2 flex-wrap border-b border-[#DCE0E7] pb-6">
            <button
              type="button"
              onClick={() => setSelectedCat("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCat === "all"
                  ? "bg-[#15095D] text-white shadow-xs"
                  : "bg-[#EFF2F9] text-[#4E567A] hover:bg-[#DCE0E7]"
              }`}
            >
              Tất Cả ({FAQS.reduce((acc, c) => acc + c.items.length, 0)})
            </button>
            {FAQS.map((c) => (
              <button
                key={c.category}
                type="button"
                onClick={() => setSelectedCat(c.category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCat === c.category
                    ? "bg-[#15095D] text-white shadow-xs"
                    : "bg-[#EFF2F9] text-[#4E567A] hover:bg-[#DCE0E7]"
                }`}
              >
                <span>{c.emoji}</span>
                <span>{c.category}</span>
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Accordions List */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8 space-y-8">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((cat, catIdx) => (
              <div
                key={cat.category}
                className="rounded-3xl bg-white border border-[#DCE0E7] p-6 sm:p-8 shadow-[0_4px_24px_rgba(21,9,93,0.03)] space-y-4"
              >
                <div className="flex items-center gap-2.5 pb-2 border-b border-[#EFF2F9]">
                  <span className="text-xl">{cat.emoji}</span>
                  <h2 className="font-serif font-bold text-lg sm:text-xl text-[#15095D]">
                    {cat.category}
                  </h2>
                </div>

                <div className="divide-y divide-[#DCE0E7]">
                  {cat.items.map((item, itemIdx) => (
                    <AccordionItem
                      key={item.q}
                      q={item.q}
                      a={item.a}
                      idPrefix={`${baseId}-${catIdx}-${itemIdx}`}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl bg-[#F6F7FC] border border-[#DCE0E7] py-14 px-6 text-center space-y-4">
              <HelpCircle className="w-10 h-10 text-[#8C93A8] mx-auto" />
              <p className="font-serif text-xl font-bold text-[#15095D]">
                Không tìm thấy câu hỏi phù hợp với &quot;{search}&quot;
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCat("all");
                }}
                className="h-10 px-6 rounded-full bg-[#15095D] text-white text-xs font-semibold"
              >
                Xem lại toàn bộ câu hỏi
              </button>
            </div>
          )}
        </section>

        {/* Still Need Help? */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="rounded-3xl bg-[#EFF2F9] border border-[#DCE0E7] p-8 text-center space-y-4">
            <MessageSquare className="w-8 h-8 text-[#32259B] mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#15095D]">
              Bạn vẫn còn câu hỏi khác?
            </h3>
            <p className="text-xs sm:text-sm text-[#5E607E] max-w-md mx-auto leading-relaxed">
              Đội ngũ quản lý xưởng và chuyên gia vải sợi của UNLO sẵn sàng hỗ trợ bạn qua email hoặc hotline.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                href="/pages/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15095D] text-white text-xs font-bold hover:bg-[#1F0C85] transition-colors"
              >
                <span>Liên hệ hỗ trợ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <NullFooter />
    </div>
  );
}
