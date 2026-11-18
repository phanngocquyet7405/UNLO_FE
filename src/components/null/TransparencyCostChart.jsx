"use client";

import { formatVnd } from "@/app/services/api/nullCommerceService";

export default function TransparencyCostChart({ product }) {
  const cost = product?.costBreakdown || {};
  const m2cPrice = cost.nullPrice || product?.price || 245000;
  const retailPrice =
    cost.traditionalRetailPrice || Math.round(m2cPrice * 2.6);

  const materialCost = cost.materialCost || Math.round(m2cPrice * 0.45);
  const manufacturingCost = cost.manufacturingCost || Math.round(m2cPrice * 0.2);
  const packagingShippingCost =
    cost.packagingShippingCost || Math.round(m2cPrice * 0.15);
  const platformQcCost = Math.max(
    0,
    cost.platformQcCost ??
      m2cPrice - materialCost - manufacturingCost - packagingShippingCost,
  );

  const totalCalc = Math.max(
    1,
    materialCost + manufacturingCost + packagingShippingCost + platformQcCost,
  );

  const segments = [
    {
      key: "material",
      label: "Nguyên vật liệu & Phụ liệu",
      amount: materialCost,
      pct: Math.round((materialCost / totalCalc) * 100),
      color: "#15095D",
      desc:
        cost.materialDesc ||
        "Vật liệu chuẩn xuất khẩu, phụ liệu chính hãng minh bạch định lượng.",
    },
    {
      key: "labor",
      label: "Nhân công & Vận hành xưởng",
      amount: manufacturingCost,
      pct: Math.round((manufacturingCost / totalCalc) * 100),
      color: "#32259B",
      desc:
        cost.manufacturingDesc ||
        "Cắt rập chính xác & gia công hoàn thiện trực tiếp tại xưởng đối tác.",
    },
    {
      key: "shipping",
      label: "Đóng gói & Vận chuyển",
      amount: packagingShippingCost,
      pct: Math.round((packagingShippingCost / totalCalc) * 100),
      color: "#6B94D6",
      desc:
        cost.packagingShippingDesc ||
        "Bao bì giấy tái chế chuẩn bảo vệ & vận chuyển thẳng từ kho xưởng.",
    },
    {
      key: "platform",
      label: "Phí nền tảng & Kiểm định QC",
      amount: platformQcCost,
      pct: Math.max(
        1,
        100 -
          Math.round((materialCost / totalCalc) * 100) -
          Math.round((manufacturingCost / totalCalc) * 100) -
          Math.round((packagingShippingCost / totalCalc) * 100),
      ),
      color: "#9EA1D2",
      desc:
        cost.platformQcDesc ||
        "Nghiệm thu 12 bước QC đầu lô, bảo hành & vận hành hệ thống M2C.",
    },
  ];

  const markupSaved = Math.max(0, retailPrice - m2cPrice);
  const savingsPct =
    retailPrice > m2cPrice ? Math.round((markupSaved / retailPrice) * 100) : 0;
  const m2cRatio = Math.min(100, Math.max(22, Math.round((m2cPrice / Math.max(1, retailPrice)) * 100)));

  return (
    <section
      aria-label="Biểu đồ bóc tách chi phí minh bạch"
      className="rounded-3xl bg-[#EFF2F9] border border-[#DCE0E7] p-6 sm:p-10 space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
            TRANSPARENT PRICING
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#15095D]">
            Biểu Đồ Bóc Tách Cấu Thành Giá Minh Bạch
          </h2>
          <p className="text-sm text-[#4E567A] leading-relaxed">
            Mỗi đồng bạn chi trả tại UNLO đều đi thẳng vào vật liệu, công thợ và kiểm định — cắt bỏ trung gian để tiết kiệm{" "}
            <strong className="text-[#32259B] font-bold">
              {savingsPct}% ({formatVnd(markupSaved)})
            </strong>{" "}
            so với bán lẻ truyền thống.
          </p>
        </div>

        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#FCFDF1] border border-[#DCE0E7] shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#4E567A]">
              Giá M2C tại xưởng
            </p>
            <p className="text-xl font-bold text-[#15095D] tabular-nums">
              {formatVnd(m2cPrice)}
            </p>
          </div>
          <span className="h-8 w-px bg-[#DCE0E7]" aria-hidden="true" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#4E567A]">
              Bán lẻ truyền thống
            </p>
            <p className="text-base font-semibold text-[#8D8DC7] line-through tabular-nums">
              {formatVnd(retailPrice)}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Thanh ngang 4 phân đoạn chi phí M2C */}
      <div className="rounded-2xl bg-white border border-[#DCE0E7] p-5 sm:p-7 space-y-5">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#15095D]">
          <span>1. Cấu thành giá M2C tại UNLO</span>
          <span className="tabular-nums text-[#32259B]">{formatVnd(m2cPrice)} (100%)</span>
        </div>

        <div
          className="w-full h-9 rounded-full overflow-hidden flex bg-[#EFF2F9]"
          role="img"
          aria-label="Thanh phân bổ 4 phân đoạn chi phí sản xuất"
        >
          {segments.map((seg) => (
            <div
              key={seg.key}
              style={{ width: `${seg.pct}%`, backgroundColor: seg.color }}
              title={`${seg.label}: ${seg.pct}% (${formatVnd(seg.amount)})`}
              className="h-full flex items-center justify-center text-[11px] font-bold text-white tabular-nums transition-[width] duration-300"
            >
              {seg.pct >= 12 ? `${seg.pct}%` : ""}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          {segments.map((seg) => (
            <div
              key={seg.key}
              className="rounded-2xl bg-[#EFF2F9]/65 border border-[#DCE0E7] p-4 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-[#15095D]">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  {seg.pct}%
                </span>
                <span className="text-sm font-bold text-[#32259B] tabular-nums">
                  {formatVnd(seg.amount)}
                </span>
              </div>
              <p className="text-xs font-semibold text-[#15095D]">{seg.label}</p>
              <p className="text-[11px] text-[#4E567A] leading-relaxed">{seg.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Thanh đối chiếu cấu trúc giá bán lẻ truyền thống */}
      <div className="rounded-2xl bg-[#FCFDF1] border border-[#DCE0E7] p-5 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#15095D]">
            2. Đối chiếu cấu trúc giá bán lẻ truyền thống
          </span>
          <span className="text-xs font-semibold text-[#4E567A]">
            Khoản đội giá trung gian đã cắt bỏ:{" "}
            <strong className="text-[#32259B] tabular-nums">+{formatVnd(markupSaved)}</strong>
          </span>
        </div>

        <div className="space-y-3">
          {/* Row A: UNLO M2C */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-[#15095D]">
              <span>UNLO (Trực tiếp từ xưởng M2C)</span>
              <span className="tabular-nums font-bold text-[#32259B]">{formatVnd(m2cPrice)}</span>
            </div>
            <div className="w-full h-5 rounded-full bg-[#EFF2F9] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#15095D] to-[#443EB1]"
                style={{ width: `${m2cRatio}%` }}
              />
            </div>
          </div>

          {/* Row B: Traditional Retail */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-[#4E567A]">
              <span>Thương hiệu bán lẻ truyền thống (Cùng chuẩn chất liệu)</span>
              <span className="tabular-nums line-through">{formatVnd(retailPrice)}</span>
            </div>
            <div className="w-full h-5 rounded-full bg-[#DCE0E7] overflow-hidden flex">
              <div
                className="h-full bg-[#15095D]/80 flex items-center justify-center text-[10px] font-semibold text-white"
                style={{ width: `${m2cRatio}%` }}
              >
                Giá trị thực
              </div>
              <div
                className="h-full bg-[#BBC2DD] flex items-center justify-center text-[10px] font-bold text-[#15095D] px-2 truncate"
                style={{ width: `${100 - m2cRatio}%` }}
              >
                +{formatVnd(markupSaved)} (Mặt bằng TTTM · Đại lý · Quảng cáo thương hiệu)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
