"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, PieChart, BarChart3, Table } from "lucide-react";
import PriceBreakdownDonutChart from "./PriceBreakdownDonutChart";

export const COMPARISON_DATA = [
  {
    id: "ao-thun",
    name: "Áo thun cơ bản",
    unloSpec: "Cotton Supima sợi dài 260 GSM, bo cổ rib đôi 2.2cm giặt không dão",
    shopeePrice: "99.000 – 159.000₫",
    shopeeSource: "Shopee Blog",
    shopeeAvg: 129000,
    retailPrice: "293.000 – 391.000₫",
    retailSource: "Uniqlo VN (Cổ tròn & Supima)",
    retailAvg: 342000,
    unloPrice: "129.000 – 199.000₫",
    unloSource: "Giá xuất xưởng KCN Phố Nối",
    unloAvg: 164000,
    savingPercent: "Tiết kiệm 52%",
  },
  {
    id: "polo",
    name: "Áo Polo Piqué",
    unloSpec: "Sợi Tencel Piqué 230 GSM mát lạnh, kháng khuẩn, cổ dệt chống cong",
    shopeePrice: "78.000 – 130.000₫",
    shopeeSource: "Lazada",
    shopeeAvg: 104000,
    retailPrice: "279.000 – 329.000₫",
    retailSource: "Coolmate (Shopee Blog)",
    retailAvg: 304000,
    unloPrice: "199.000 – 279.000₫",
    unloSource: "Giá xuất xưởng Hưng Yên",
    unloAvg: 239000,
    savingPercent: "Tiết kiệm 22%",
  },
  {
    id: "ao-ni",
    name: "Áo nỉ dài tay (Sweater)",
    unloSpec: "French Terry 380 GSM mặt vảy cá mịn, chống xù lông 50 chu kỳ giặt",
    shopeePrice: "65.000 – 175.000₫",
    shopeeSource: "Shopee Blog",
    shopeeAvg: 120000,
    retailPrice: "169.000 – 380.000₫",
    retailSource: "Sweater nỉ bán lẻ (Shopee Blog)",
    retailAvg: 275000,
    unloPrice: "249.000 – 349.000₫",
    unloSource: "Giá xuất xưởng dệt kim",
    unloAvg: 299000,
    savingPercent: "Chuẩn định lượng 380 GSM",
  },
  {
    id: "hoodie",
    name: "Hoodie chui đầu",
    unloSpec: "Heavyweight Fleece 420 GSM đứng form, túi kangaroo giấu mũi may",
    shopeePrice: "66.000 – 110.000₫",
    shopeeSource: "Shopee Blog",
    shopeeAvg: 88000,
    retailPrice: "260.000 – 389.000₫",
    retailSource: "Thương hiệu bán lẻ (Shopee Blog)",
    retailAvg: 325000,
    unloPrice: "299.000 – 399.000₫",
    unloSource: "Giá xuất xưởng may xuất khẩu",
    unloAvg: 349000,
    savingPercent: "Chất lượng vượt trội",
  },
  {
    id: "so-mi-linen",
    name: "Sơ mi European Linen",
    unloSpec: "100% sợi lanh châu Âu 185 GSM, may cuốn sườn French Seam 14 mũi/inch",
    shopeePrice: "— (Không rõ nguồn sợi)",
    shopeeSource: "Hàng gia công trôi nổi",
    shopeeAvg: 180000,
    retailPrice: "588.000 – 784.000₫",
    retailSource: "Uniqlo VN (Linen cao cấp)",
    retailAvg: 686000,
    unloPrice: "349.000 – 399.000₫",
    unloSource: "Giá xuất xưởng may Bắc Ninh",
    unloAvg: 374000,
    savingPercent: "Tiết kiệm 45%",
  },
  {
    id: "quan",
    name: "Quần Chino & Quần Âu",
    unloSpec: "Cotton Twill co giãn cạp chun ẩn & Trousers xếp ly relaxed chống nhăn",
    shopeePrice: "— (Không rõ nguồn sợi)",
    shopeeSource: "Hàng chợ / Sàn rẻ",
    shopeeAvg: 160000,
    retailPrice: "699.000₫",
    retailSource: "Uniqlo VN (Chino Regular Fit)",
    retailAvg: 699000,
    unloPrice: "299.000 – 399.000₫",
    unloSource: "Giá xuất xưởng đối tác OEM",
    unloAvg: 349000,
    savingPercent: "Tiết kiệm 50%",
  },
  {
    id: "tui-canvas",
    name: "Túi Canvas 16oz",
    unloSpec: "Vải bố Canvas mộc dệt dày 16oz, quai da bò Ý nguyên tấm tán đinh đồng",
    shopeePrice: "Chưa khảo sát",
    shopeeSource: "Hàng may công nghiệp",
    shopeeAvg: 90000,
    retailPrice: "350.000 – 550.000₫",
    retailSource: "Cửa hàng phụ kiện thời trang",
    retailAvg: 450000,
    unloPrice: "149.000 – 249.000₫",
    unloSource: "Xưởng phụ kiện thủ công",
    unloAvg: 199000,
    savingPercent: "Tiết kiệm 55%",
  },
];

export default function AboutPriceComparisonChart() {
  const [selectedId, setSelectedId] = useState("ao-thun");
  const [viewMode, setViewMode] = useState("chart"); // 'chart' | 'table'

  const activeItem = COMPARISON_DATA.find((item) => item.id === selectedId) || COMPARISON_DATA[0];

  // Max value scale for chart comparison (highest retail price ~ 800.000)
  const maxScale = 800000;

  return (
    <div className="space-y-8">
      {/* View Switcher & Category Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#DCE0E7] pb-5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {COMPARISON_DATA.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedId === item.id
                  ? "bg-[#15095D] text-white shadow-xs"
                  : "bg-[#EFF2F9] text-[#4E567A] hover:bg-[#DCE0E7] hover:text-[#15095D]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center bg-[#EFF2F9] p-1 rounded-full border border-[#DCE0E7] shrink-0">
          <button
            type="button"
            onClick={() => setViewMode("chart")}
            className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "chart"
                ? "bg-white text-[#15095D] shadow-xs"
                : "text-[#5E607E] hover:text-[#15095D]"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Dạng Cột</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("donut")}
            className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "donut"
                ? "bg-white text-[#15095D] shadow-xs"
                : "text-[#5E607E] hover:text-[#15095D]"
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Biểu Đồ Tròn</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "table"
                ? "bg-white text-[#15095D] shadow-xs"
                : "text-[#5E607E] hover:text-[#15095D]"
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Bảng Chi Tiết</span>
          </button>
        </div>
      </div>

      {/* DONUT CHART VIEW */}
      {viewMode === "donut" && (
        <div className="space-y-4">
          <PriceBreakdownDonutChart
            product={{
              name: activeItem.name,
              price: activeItem.unloAvg,
              costBreakdown: {
                nullPrice: activeItem.unloAvg,
                traditionalRetailPrice: activeItem.retailAvg,
                materialCost: Math.round(activeItem.unloAvg * 0.45),
                manufacturingCost: Math.round(activeItem.unloAvg * 0.22),
                packagingShippingCost: Math.round(activeItem.unloAvg * 0.15),
                platformQcCost: Math.round(activeItem.unloAvg * 0.18),
                materialDesc: activeItem.unloSpec,
              },
            }}
          />
        </div>
      )}

      {/* CHART VIEW */}
      {viewMode === "chart" && (
        <div className="rounded-3xl bg-white border border-[#DCE0E7] p-6 sm:p-10 shadow-[0_12px_40px_rgba(21,9,93,0.06)] space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EFF2F9] pb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#625FBC]">
                SO SÁNH MỨC GIÁ MỤC TIÊU &amp; CHẤT LƯỢNG
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#15095D] mt-1">
                {activeItem.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#5E607E] mt-1">
                Tiêu chuẩn vật liệu UNLO: <strong className="text-[#15095D]">{activeItem.unloSpec}</strong>
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FCFDF1] border border-[#BBC2DD] text-xs font-bold text-[#15095D] shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#EB6D48]" />
              <span>{activeItem.savingPercent}</span>
            </div>
          </div>

          {/* 3 COMPARISON BARS (Quince Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
            {/* Col 1: Hàng trôi nổi trên sàn */}
            <div className="rounded-2xl bg-[#F6F7FC] border border-[#DCE0E7] p-5 sm:p-6 space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C93A8]">
                  Cấp độ 1
                </span>
                <h4 className="text-sm font-bold text-[#4E567A]">Hàng Trôi Nổi Trên Sàn</h4>
                <p className="text-xs text-[#8C93A8]">Nguồn: {activeItem.shopeeSource}</p>
              </div>

              <div className="space-y-2">
                <div className="h-4 bg-[#E2E6EF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A8B2C7] rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((activeItem.shopeeAvg / maxScale) * 100)}%` }}
                  />
                </div>
                <p className="font-serif text-2xl font-bold text-[#4E567A]">
                  {activeItem.shopeePrice}
                </p>
              </div>

              <ul className="text-xs text-[#5E607E] space-y-1.5 border-t border-[#DCE0E7] pt-3">
                <li className="flex items-center gap-2 text-[#A52735]">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Sợi ngắn, dễ xù lông, co rút sau 2-3 lần giặt</span>
                </li>
                <li className="flex items-center gap-2 text-[#A52735]">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Không minh bạch xưởng sản xuất, không bảo hành</span>
                </li>
              </ul>
            </div>

            {/* Col 2: UNLO Giá Mục Tiêu (Hero Highlight) */}
            <div className="rounded-2xl bg-[#15095D] text-white p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-[0_20px_50px_rgba(21,9,93,0.25)] relative order-first md:order-none">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#EB6D48] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                MÔ HÌNH M2C TẬN XƯỞNG
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B8BEDB]">
                  Lựa chọn tối ưu
                </span>
                <h4 className="text-base font-bold text-white">UNLO — Giá Thực Tại Xưởng</h4>
                <p className="text-xs text-[#A8B0D4]">{activeItem.unloSource}</p>
              </div>

              <div className="space-y-2">
                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#EB6D48] rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((activeItem.unloAvg / maxScale) * 100)}%` }}
                  />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-extrabold text-[#FCFDF1]">
                    {activeItem.unloPrice}
                  </span>
                </div>
              </div>

              <ul className="text-xs text-[#E1E4F5] space-y-2 border-t border-white/20 pt-3">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#48C07E] shrink-0" />
                  <span>100% chuẩn xuất khẩu, kiểm định 12 bước AQL 2.5</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#48C07E] shrink-0" />
                  <span>Minh bạch 4 tầng chi phí, đổi trả 30 ngày tận nơi</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#48C07E] shrink-0" />
                  <span>Không logo phô trương, form dáng chuẩn người Việt</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Bán lẻ truyền thống / quốc tế */}
            <div className="rounded-2xl bg-[#F6F7FC] border border-[#DCE0E7] p-5 sm:p-6 space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C93A8]">
                  Cấp độ 3
                </span>
                <h4 className="text-sm font-bold text-[#4E567A]">Bán Lẻ Truyền Thống / Quốc Tế</h4>
                <p className="text-xs text-[#8C93A8]">Nguồn: {activeItem.retailSource}</p>
              </div>

              <div className="space-y-2">
                <div className="h-4 bg-[#E2E6EF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#EB6D48] rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((activeItem.retailAvg / maxScale) * 100)}%` }}
                  />
                </div>
                <p className="font-serif text-2xl font-bold text-[#15095D]">
                  {activeItem.retailPrice}
                </p>
              </div>

              <ul className="text-xs text-[#5E607E] space-y-1.5 border-t border-[#DCE0E7] pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#32259B] shrink-0" />
                  <span>Chất lượng tốt nhưng chịu 60–70% chi phí trung gian</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#32259B] shrink-0" />
                  <span>Gánh phí mặt bằng showroom trung tâm, phí quảng cáo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <div className="rounded-3xl bg-white border border-[#DCE0E7] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#15095D] text-white">
                <tr>
                  <th className="py-4 px-5 font-semibold">Ngành Hàng</th>
                  <th className="py-4 px-5 font-semibold">Hàng Trôi Nổi Trên Sàn</th>
                  <th className="py-4 px-5 font-semibold">Bán Lẻ Trong Nước / Quốc Tế</th>
                  <th className="py-4 px-5 font-semibold bg-[#21127C]">Giá Bán Mục Tiêu UNLO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE0E7]">
                {COMPARISON_DATA.map((row) => (
                  <tr key={row.id} className="hover:bg-[#F9FAFD] transition-colors">
                    <td className="py-3.5 px-5 font-medium text-[#15095D]">
                      <div>{row.name}</div>
                      <div className="text-[11px] text-[#5E607E] mt-0.5 line-clamp-1">{row.unloSpec}</div>
                    </td>
                    <td className="py-3.5 px-5 text-[#5E607E]">
                      <div className="font-semibold text-[#4E567A]">{row.shopeePrice}</div>
                      <div className="text-[11px] text-[#8C93A8]">({row.shopeeSource})</div>
                    </td>
                    <td className="py-3.5 px-5 text-[#5E607E]">
                      <div className="font-semibold text-[#15095D]">{row.retailPrice}</div>
                      <div className="text-[11px] text-[#8C93A8]">({row.retailSource})</div>
                    </td>
                    <td className="py-3.5 px-5 bg-[#FCFDF1]">
                      <div className="font-bold text-[#15095D] font-serif text-base">{row.unloPrice}</div>
                      <div className="text-[11px] text-[#EB6D48] font-semibold">{row.savingPercent}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
