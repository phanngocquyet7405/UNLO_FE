"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Clock, ShieldCheck, Share2, Factory, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import { nullCommerceService, formatVnd } from "@/app/services/api/nullCommerceService";

const PRODUCTION_STAGES = [
  { id: "cutting", label: "Cắt vật liệu" },
  { id: "assembly", label: "Lắp ráp / May" },
  { id: "qc", label: "Kiểm định QC" },
  { id: "shipping", label: "Bàn giao vận chuyển" },
];

const CURATED_CAMPAIGNS = [
  {
    _id: "69000000000000000000c001",
    slug: "ao-thun-cotton-supima-260gsm-det-kim-nguyen-khoi-690000000000000000000101",
    type: "group_buy",
    title: "Lô Dệt Kim Số 04 — Áo Thun Supima 260 GSM (Màu Galaxy Navy)",
    factoryName: "Xưởng Dệt Kim Số 04 · KCN Phố Nối, Hưng Yên",
    factorySlug: "xuong-det-kim-so-04-hung-yen",
    coverImage:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    currentOrders: 138,
    moqTarget: 150,
    daysLeft: 2,
    factoryUnitPrice: 215000,
    standardPrice: 245000,
    retailPrice: 690000,
    stageIdx: 1,
    statusLabel: "Sắp đạt MOQ (92%) · Mở khóa giá xưởng",
  },
  {
    _id: "69000000000000000000c002",
    slug: "vi-da-bo-full-grain-y-son-canh-4-lop-690000000000000000000102",
    type: "pre_order",
    title: "Lô Đồ Da Số 02 — Ví Da Bò Full-Grain Ý (Sơn Cạnh 4 Lớp)",
    factoryName: "Xưởng Đồ Da Số 02 · Bình Chuẩn, Bình Dương",
    factorySlug: "xuong-che-tac-do-da-so-02-binh-duong",
    coverImage:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85",
    currentOrders: 120,
    moqTarget: 100,
    daysLeft: 4,
    factoryUnitPrice: 520000,
    standardPrice: 590000,
    retailPrice: 1850000,
    stageIdx: 2,
    statusLabel: "Đã đạt MOQ · Đang kiểm định QC Lab",
  },
  {
    _id: "69000000000000000000c003",
    slug: "so-mi-european-linen-185gsm-may-cuon-suon-690000000000000000000103",
    type: "group_buy",
    title: "Lô Linen Số 07 — Sơ Mi 100% European Flax 185 GSM",
    factoryName: "Xưởng Linen Số 07 · VSIP Bắc Ninh",
    factorySlug: "xuong-det-may-linen-so-07-bac-ninh",
    coverImage:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
    currentOrders: 94,
    moqTarget: 120,
    daysLeft: 3,
    factoryUnitPrice: 435000,
    standardPrice: 495000,
    retailPrice: 1390000,
    stageIdx: 0,
    statusLabel: "Đang gom đơn lô nhỏ (78%)",
  },
];

export default function GroupBuyListPage() {
  const [campaigns, setCampaigns] = useState(CURATED_CAMPAIGNS);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    let active = true;
    nullCommerceService
      .getCampaigns()
      .then((res) => {
        if (active && Array.isArray(res?.data) && res.data.length > 0) {
          setCampaigns(res.data);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const visible =
    filterType === "all"
      ? campaigns
      : campaigns.filter((c) => c.type === filterType);

  const shareLink = (camp) => {
    const url = `${window.location.origin}/products/${camp.slug || camp._id}`;
    navigator.clipboard?.writeText(url);
    toast.success("Đã sao chép liên kết rủ bạn gom đơn đạt MOQ!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 space-y-12">
        {/* Hero Band — Celestial Indigo */}
        <section className="rounded-3xl bg-gradient-to-br from-[#15095D] via-[#1F0C85] to-[#0B2056] text-[#FCFDF1] p-8 sm:p-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="unlo-display-en text-[11px] sm:text-xs tracking-[0.14em] text-[#BBC2DD]">
              C2M GROUP-BUY &amp; PRE-ORDER BATCH
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-[#FCFDF1]">
              Gom Đơn Sản Xuất Lô Nhỏ — Mở Khóa Giá Gốc Tại Xưởng
            </h1>
            <p className="text-sm sm:text-base text-[#DCE0E7]/90 leading-relaxed">
              Thay vì sản xuất tồn kho rồi cộng rủi ro vào giá bán, UNLO gom đủ ngưỡng MOQ trong 3–5 ngày rồi kích hoạt dây chuyền ngay tại xưởng. Hoàn tiền 100% minh bạch nếu lô không đủ mốc.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "Tất cả lô" },
              { id: "group_buy", label: "Group-Buy MOQ" },
              { id: "pre_order", label: "Đang sản xuất" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id)}
                className={`h-10 px-5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  filterType === tab.id
                    ? "bg-[#BBC2DD] text-[#15095D]"
                    : "bg-white/10 text-[#FCFDF1] hover:bg-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* 3 Step Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              step: "01",
              title: "Gom đơn MOQ trong 3–5 ngày",
              desc: "Tham gia giữ suất sản xuất trực tiếp với giá gốc tại xưởng thấp hơn thêm 12–15%.",
            },
            {
              step: "02",
              title: "Theo dõi Live Production Tracker",
              desc: "Xem minh bạch 4 công đoạn tại nhà máy: Cắt vật liệu → Lắp ráp/May → QC → Vận chuyển.",
            },
            {
              step: "03",
              title: "Hoàn tiền 100% nếu thiếu MOQ",
              desc: "Cam kết không rủi ro: tự động hoàn tiền 100% trong 24h nếu lô chưa đủ sản lượng khởi chạy.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="rounded-2xl bg-[#EFF2F9] border border-[#DCE0E7] p-6 space-y-2"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#15095D] text-[#FCFDF1] font-mono text-xs font-bold">
                {s.step}
              </span>
              <h2 className="text-sm font-bold text-[#15095D]">{s.title}</h2>
              <p className="text-xs text-[#4E567A] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Campaign Cards with MOQ Progress + Live Production Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {visible.map((camp) => {
            const pct = Math.min(
              100,
              Math.round(((camp.currentOrders || 0) / Math.max(1, camp.moqTarget || 100)) * 100),
            );
            return (
              <article
                key={camp._id}
                className="rounded-3xl border border-[#DCE0E7] bg-white overflow-hidden flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-[#EFF2F9] overflow-hidden">
                    <img
                      src={camp.coverImage}
                      alt={camp.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#15095D]/90 text-[#FCFDF1] text-[11px] font-bold">
                      {camp.statusLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => shareLink(camp)}
                      aria-label="Chia sẻ lô gom đơn"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 text-[#15095D] grid place-items-center cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    <Link
                      href={`/factories/${camp.factorySlug || ""}`}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#32259B] hover:underline"
                    >
                      <Factory className="w-3.5 h-3.5" />
                      {camp.factoryName}
                    </Link>

                    <h3 className="font-serif text-xl font-semibold text-[#15095D] leading-snug">
                      {camp.title}
                    </h3>

                    {/* MOQ Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="inline-flex items-center gap-1 text-[#15095D] tabular-nums">
                          <Users className="w-3.5 h-3.5 text-[#32259B]" />
                          {camp.currentOrders}/{camp.moqTarget} suất MOQ
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#4E567A]">
                          <Clock className="w-3.5 h-3.5" /> Còn {camp.daysLeft} ngày
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-[#EFF2F9] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#15095D] to-[#443EB1]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* 4-Stage Live Production Tracker */}
                    <div className="rounded-2xl bg-[#FCFDF1] border border-[#DCE0E7] p-3.5 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#4E567A]">
                        Live Production Tracker (Tiến độ xưởng)
                      </p>
                      <div className="grid grid-cols-4 gap-1.5">
                        {PRODUCTION_STAGES.map((st, idx) => {
                          const done = idx <= (camp.stageIdx ?? 0);
                          return (
                            <div key={st.id} className="space-y-1">
                              <div
                                className={`h-1.5 rounded-full ${
                                  done ? "bg-[#32259B]" : "bg-[#DCE0E7]"
                                }`}
                              />
                              <p
                                className={`text-[10px] leading-tight ${
                                  done ? "font-bold text-[#15095D]" : "text-[#8D8DC7]"
                                }`}
                              >
                                {st.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#EFF2F9] flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#4E567A]">Giá lô MOQ</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-[#32259B] tabular-nums">
                        {formatVnd(camp.factoryUnitPrice)}
                      </span>
                      <span className="text-xs text-[#8D8DC7] line-through tabular-nums">
                        {formatVnd(camp.retailPrice)}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/products/${camp.slug}`}
                    className="h-10 px-5 rounded-full unlo-pill-primary text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    Giữ Suất
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="rounded-2xl bg-[#EFF2F9] border border-[#DCE0E7] p-5 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#15095D]">
          <ShieldCheck className="w-4 h-4 text-[#32259B]" />
          <span>Bảo chứng dòng tiền C2M: Hoàn tiền 100% tự động nếu lô sản xuất không đủ MOQ tối thiểu.</span>
          <CheckCircle2 className="w-4 h-4 text-[#1D7A5F]" />
        </div>
      </main>

      <NullFooter />
    </div>
  );
}
