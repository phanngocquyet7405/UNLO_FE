"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, ChevronRight, Factory } from "lucide-react";
import NullHeader from "./NullHeader";
import NullFooter from "./NullFooter";
import NullProductCard from "./NullProductCard";
import {
  UNLO_CATEGORIES,
  UNLO_MATERIALS,
  filterUnloProducts,
} from "@/lib/unloCatalog";
import { UNLO_FACTORIES } from "@/lib/unloFactories";

const SORT_OPTIONS = [
  { value: "newest", label: "Mới nhất" },
  { value: "bestselling", label: "Bán chạy nhất" },
  { value: "price_asc", label: "Giá thấp đến cao" },
  { value: "price_desc", label: "Giá cao đến thấp" },
];

export default function NullCatalogClient({
  initialProducts = [],
  initialError = null,
  preferInitialWhenUnfiltered = false,
}) {
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const paramsKey = searchParams?.toString() || "";
  const [prevParamsKey, setPrevParamsKey] = useState(paramsKey);

  const [keyword, setKeyword] = useState(
    searchParams?.get("keyword") || searchParams?.get("search") || "",
  );
  const [category, setCategory] = useState(searchParams?.get("category") || "");
  const [factorySlug, setFactorySlug] = useState(searchParams?.get("factory") || "");
  const [material, setMaterial] = useState(searchParams?.get("material") || "");
  const [sort, setSort] = useState(searchParams?.get("sort") || "newest");

  if (prevParamsKey !== paramsKey) {
    setPrevParamsKey(paramsKey);
    setKeyword(searchParams?.get("keyword") || searchParams?.get("search") || "");
    setCategory(searchParams?.get("category") || "");
    setFactorySlug(searchParams?.get("factory") || "");
    setMaterial(searchParams?.get("material") || "");
    setSort(searchParams?.get("sort") || "newest");
  }

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev || "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const products = useMemo(() => {
    const hasFilter = Boolean(keyword || category || material || factorySlug);
    if (
      preferInitialWhenUnfiltered &&
      !hasFilter &&
      sort === "newest" &&
      initialProducts.length > 0
    ) {
      return initialProducts;
    }
    const filtered = filterUnloProducts({
      keyword,
      category,
      material,
      factory: factorySlug,
      sort,
    });
    return filtered.length > 0 || hasFilter ? filtered : initialProducts;
  }, [
    keyword,
    category,
    material,
    factorySlug,
    sort,
    initialProducts,
    preferInitialWhenUnfiltered,
  ]);

  const activeCategoryObj = UNLO_CATEGORIES.find((c) => c.id === category);

  const resetFilters = () => {
    setKeyword("");
    setCategory("");
    setFactorySlug("");
    setMaterial("");
    setSort("newest");
  };

  const activeFilterCount =
    (keyword.trim() ? 1 : 0) +
    (category ? 1 : 0) +
    (factorySlug ? 1 : 0) +
    (material ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-11 pb-16 space-y-8">
        {initialError && Number(initialError.status) >= 500 && (
          <div
            role="alert"
            className="rounded-2xl border border-[#C43D4B]/30 bg-[#FDF2F3] px-5 py-4 text-sm text-[#A52735] space-y-1"
          >
            <p className="font-semibold">
              Lỗi hệ thống: {initialError.message || "Vui lòng thử lại sau."}
            </p>
            {initialError.requestId && (
              <p className="text-xs font-mono">
                Mã yêu cầu: <span>{initialError.requestId}</span>
              </p>
            )}
          </div>
        )}

        <div className="rounded-3xl bg-gradient-to-r from-[#EFF2F9] via-[#F6F7FC] to-[#FCFDF1] border border-[#DCE0E7] p-6 sm:p-9 space-y-3">
          <nav
            aria-label="Đường dẫn"
            className="flex items-center gap-1.5 text-xs text-[#4E567A]"
          >
            <Link href="/" className="hover:text-[#15095D] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-[#15095D] font-semibold">
              {activeCategoryObj ? activeCategoryObj.label : "Tất Cả Sản Phẩm M2C"}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
                {activeCategoryObj ? activeCategoryObj.enTag : "BRANDLESS M2C CATALOG"}
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#15095D]">
                {activeCategoryObj ? activeCategoryObj.label : "Hàng Thiết Yếu Trực Tiếp Từ Xưởng"}
              </h1>
              <p className="text-sm text-[#4E567A] max-w-xl">
                {activeCategoryObj
                  ? activeCategoryObj.description
                  : "Mọi sản phẩm đều công khai biểu đồ bóc tách giá, thông số vật liệu chuẩn xuất khẩu và hộ chiếu nhà máy đối tác."}
              </p>
            </div>

            <div className="relative w-full md:w-72 shrink-0">
              <Search
                className="w-4 h-4 text-[#625FBC] absolute left-4 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm chất liệu, xưởng..."
                aria-label="Tìm kiếm trong bộ sưu tập"
                className="w-full h-11 pl-10 pr-9 rounded-full bg-white border border-[#BBC2DD] text-sm text-[#15095D] placeholder:text-[#8D8DC7] outline-none focus:border-[#32259B]"
              />
              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword("")}
                  aria-label="Xóa từ khóa"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4E567A] hover:text-[#15095D]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#DCE0E7]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-[#BBC2DD] bg-white text-xs sm:text-[13px] font-semibold text-[#15095D] hover:border-[#32259B] transition-colors null-pressable cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#32259B]" aria-hidden="true" />
              <span>Bộ lọc</span>
              {activeFilterCount > 0 && (
                <span className="min-w-5 h-5 px-1 rounded-full bg-[#32259B] text-white text-[10px] font-bold inline-flex items-center justify-center tabular-nums">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setCategory("")}
                className={`h-10 px-4 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  category === ""
                    ? "bg-[#15095D] text-[#FCFDF1]"
                    : "bg-[#EFF2F9] text-[#4E567A] hover:text-[#15095D]"
                }`}
              >
                Tất Cả
              </button>
              {UNLO_CATEGORIES.map((cat) => {
                const active = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(active ? "" : cat.id)}
                    className={`h-10 px-4 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? "bg-[#15095D] text-[#FCFDF1]"
                        : "bg-[#EFF2F9] text-[#4E567A] hover:text-[#15095D]"
                    }`}
                  >
                    {cat.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs text-[#4E567A] tabular-nums">
              {products.length} sản phẩm
            </span>
            <select
              aria-label="Sắp xếp sản phẩm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 py-0 px-4 rounded-full bg-white border border-[#BBC2DD] text-xs font-semibold text-[#15095D] outline-none focus:border-[#32259B] cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-5">
            {products.map((product) => (
              <NullProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-[#EFF2F9]/60 border border-[#DCE0E7] py-16 px-6 text-center space-y-4">
            <p className="font-serif text-2xl font-semibold text-[#15095D]">
              Chưa tìm thấy sản phẩm khớp bộ lọc
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="h-11 px-6 rounded-full unlo-pill-primary text-xs font-semibold cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </main>

      {/* Filter Drawer: Material + Shop by Factory */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bộ lọc sản phẩm M2C"
          className="fixed inset-0 z-70 bg-[#15095D]/40 backdrop-blur-xs flex justify-end"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full max-w-sm h-full bg-white text-[#15095D] flex flex-col shadow-2xl animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-[#EFF2F9] flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Lọc Theo Vật Liệu &amp; Xưởng</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Đóng bộ lọc"
                className="w-9 h-9 rounded-full grid place-items-center text-[#4E567A] hover:bg-[#EFF2F9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4E567A]">
                  Chất liệu chuẩn xưởng
                </p>
                <div className="flex flex-wrap gap-2">
                  {UNLO_MATERIALS.map((m) => (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setMaterial(m.value)}
                      className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                        material === m.value
                          ? "bg-[#32259B] text-white"
                          : "bg-[#EFF2F9] text-[#15095D] hover:bg-[#DCE0E7]"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4E567A] inline-flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-[#32259B]" />
                  Mua theo Xưởng sản xuất
                </p>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setFactorySlug("")}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      factorySlug === ""
                        ? "bg-[#15095D] text-[#FCFDF1]"
                        : "bg-[#EFF2F9] text-[#15095D]"
                    }`}
                  >
                    Tất cả 4 nhà máy đối tác
                  </button>
                  {UNLO_FACTORIES.map((f) => (
                    <button
                      key={f.slug}
                      type="button"
                      onClick={() => setFactorySlug(f.slug)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                        factorySlug === f.slug
                          ? "bg-[#15095D] text-[#FCFDF1]"
                          : "bg-[#EFF2F9] text-[#15095D] hover:bg-[#DCE0E7]"
                      }`}
                    >
                      {f.shortName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-[#EFF2F9] flex items-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 h-11 rounded-full unlo-pill-outline text-xs font-semibold cursor-pointer"
              >
                Đặt lại
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex-1 h-11 rounded-full unlo-pill-primary text-xs font-semibold cursor-pointer"
              >
                Xem {products.length} sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}

      <NullFooter />
    </div>
  );
}
