"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  Check,
  Factory,
  RotateCcw,
} from "lucide-react";
import NullHeader from "./NullHeader";
import NullFooter from "./NullFooter";
import NullProductCard from "./NullProductCard";
import {
  UNLO_CATEGORIES,
  UNLO_MATERIALS,
  UNLO_PRODUCTS,
} from "@/lib/unloCatalog";
import { UNLO_FACTORIES } from "@/lib/unloFactories";

const SORT_OPTIONS = [
  { value: "newest", label: "Mới nhất" },
  { value: "bestselling", label: "Bán chạy nhất" },
  { value: "price_asc", label: "Giá thấp đến cao" },
  { value: "price_desc", label: "Giá cao đến thấp" },
];

const PRODUCT_TYPE_OPTIONS = [
  { id: "", label: "Tất cả chủng loại" },
  { id: "cotton-basics", label: "Áo Thun & Dệt Kim" },
  { id: "linen-tailoring", label: "Sơ Mi & Linen" },
  { id: "sweat-hoodie", label: "Áo Nỉ & Hoodie" },
  { id: "pants-bottoms", label: "Quần Kaki & Quần Âu" },
  { id: "wool-knitwear", label: "Đồ Len & Áo Khoác" },
  { id: "leather-goods", label: "Đồ Da Nguyên Tấm" },
  { id: "canvas-accessories", label: "Túi & Phụ Kiện Xưởng" },
  { id: "ceramics-home", label: "Gốm Sứ & Gia Dụng" },
];

const COLOR_OPTIONS = [
  { name: "", label: "Tất cả màu" },
  { name: "Navy", label: "Galaxy Navy", hex: "#15095D" },
  { name: "Ivory", label: "Milky Ivory", hex: "#FCFDF1", border: true },
  { name: "White", label: "Pure White", hex: "#FFFFFF", border: true },
  { name: "Black", label: "Onyx Black", hex: "#1A1A1A" },
  { name: "Blue", label: "Deep Sea", hex: "#183563" },
  { name: "Sky", label: "Sky Linen", hex: "#C2D9F0" },
  { name: "Grey", label: "Heather Grey", hex: "#9EA1D2" },
  { name: "Sand", label: "Khaki Tan", hex: "#D6C6A5" },
  { name: "Pink", label: "Dusty Pink", hex: "#E8B4B8" },
];

const SIZE_OPTIONS = [
  { value: "", label: "Tất cả kích cỡ" },
  { value: "S", label: "Size S (50 – 59 kg)" },
  { value: "M", label: "Size M (60 – 69 kg)" },
  { value: "L", label: "Size L (70 – 79 kg)" },
  { value: "XL", label: "Size XL (80 – 89 kg)" },
  { value: "XXL", label: "Size XXL (90 kg+)" },
  { value: "30", label: "Quần Size 30" },
  { value: "31", label: "Quần Size 31" },
  { value: "32", label: "Quần Size 32" },
  { value: "One Size", label: "Freesize / One Size" },
];

const MATERIAL_OPTIONS = [
  { value: "", label: "Tất cả chất liệu" },
  { value: "Supima Cotton", label: "Cotton Supima 260 GSM" },
  { value: "100% European Linen", label: "European Linen 185 GSM" },
  { value: "French Terry", label: "Nỉ French Terry 380 GSM" },
  { value: "Merino", label: "Len Merino & Cashmere Blend" },
  { value: "Da Bò Full-grain", label: "Da Bò Full-Grain Ý" },
  { value: "Canvas 16oz", label: "Canvas 16oz Hạng Nặng" },
  { value: "Gốm Cao Lanh", label: "Gốm Sứ LFGB 1.280°C" },
];

const PRICE_RANGE_OPTIONS = [
  { id: "all", label: "Tất cả mức giá" },
  { id: "under-300", label: "Dưới 300.000₫", min: 0, max: 299999 },
  { id: "300-500", label: "300.000₫ – 500.000₫", min: 300000, max: 500000 },
  { id: "500-1000", label: "500.000₫ – 1.000.000₫", min: 500001, max: 1000000 },
  { id: "over-1000", label: "Trên 1.000.000₫", min: 1000001, max: Infinity },
];

const DEPARTMENT_OPTIONS = [
  { id: "", label: "Tất cả đối tượng" },
  { id: "men", label: "Nam (Men)" },
  { id: "women", label: "Nữ (Women)" },
  { id: "unisex", label: "Unisex / Phi Giới Tính" },
  { id: "home", label: "Gia Dụng & Đời Sống" },
];

const FACTORY_OPTIONS = [
  { slug: "", label: "Tất cả 4 xưởng đối tác" },
  ...UNLO_FACTORIES.map((f) => ({
    slug: f.slug,
    label: `${f.shortName} · ${f.province}`,
  })),
];

export default function NullCatalogClient({
  initialProducts = [],
  initialError = null,
  preferInitialWhenUnfiltered = false,
}) {
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const toolbarRef = useRef(null);

  const paramsKey = searchParams?.toString() || "";
  const [prevParamsKey, setPrevParamsKey] = useState(paramsKey);

  const [keyword, setKeyword] = useState(
    searchParams?.get("keyword") || searchParams?.get("search") || "",
  );
  const [category, setCategory] = useState(searchParams?.get("category") || "");
  const [factorySlug, setFactorySlug] = useState(searchParams?.get("factory") || "");
  const [material, setMaterial] = useState(searchParams?.get("material") || "");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [department, setDepartment] = useState("");
  const [sort, setSort] = useState(searchParams?.get("sort") || "newest");

  if (prevParamsKey !== paramsKey) {
    setPrevParamsKey(paramsKey);
    setKeyword(searchParams?.get("keyword") || searchParams?.get("search") || "");
    setCategory(searchParams?.get("category") || "");
    setFactorySlug(searchParams?.get("factory") || "");
    setMaterial(searchParams?.get("material") || "");
    setSort(searchParams?.get("sort") || "newest");
  }

  // Close dropdown on click outside
  useEffect(() => {
    const onMouseDown = (e) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  // Body scroll lock on drawer
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

  const toggleDropdown = (key) => {
    setActiveDropdown((cur) => (cur === key ? null : key));
  };

  // Base list combines passed initialProducts or UNLO_PRODUCTS fallback
  const baseProducts = useMemo(() => {
    if (initialProducts && initialProducts.length > 0) {
      return initialProducts;
    }
    return UNLO_PRODUCTS;
  }, [initialProducts]);

  const products = useMemo(() => {
    let list = [...baseProducts];

    // Filter by Category / Product Type
    if (category) {
      const cat = String(category).toLowerCase();
      list = list.filter(
        (p) =>
          (p.categorySlug || "").toLowerCase() === cat ||
          (p.categoryName || "").toLowerCase().includes(cat) ||
          (p.category?.name || "").toLowerCase().includes(cat),
      );
    }

    // Filter by Factory
    if (factorySlug) {
      const fac = String(factorySlug).toLowerCase();
      list = list.filter((p) => (p.factorySlug || "").toLowerCase() === fac);
    }

    // Filter by Material
    if (material) {
      const mat = String(material).toLowerCase();
      list = list.filter(
        (p) =>
          (p.materialTag || "").toLowerCase().includes(mat) ||
          (p.specs?.fabricComposition || "").toLowerCase().includes(mat),
      );
    }

    // Filter by Color
    if (selectedColor) {
      const col = selectedColor.toLowerCase();
      list = list.filter((p) =>
        (p.variants || []).some(
          (v) =>
            (v.colorName || "").toLowerCase().includes(col) ||
            (v.colorHex || "").toLowerCase() === col,
        ),
      );
    }

    // Filter by Size
    if (selectedSize) {
      const sz = selectedSize.toLowerCase();
      list = list.filter(
        (p) =>
          (p.variants || []).some((v) => (v.size || "").toLowerCase() === sz) ||
          (p.sizeChart || []).some((sc) => (sc.size || "").toLowerCase() === sz),
      );
    }

    // Filter by Price Range
    if (priceRange && priceRange !== "all") {
      const pr = PRICE_RANGE_OPTIONS.find((r) => r.id === priceRange);
      if (pr) {
        list = list.filter((p) => {
          const price = Number(p.price || 0);
          return price >= pr.min && price <= pr.max;
        });
      }
    }

    // Filter by Department
    if (department) {
      if (department === "home") {
        list = list.filter(
          (p) =>
            p.categorySlug === "ceramics-home" ||
            p.categorySlug === "canvas-accessories",
        );
      } else if (department === "women") {
        list = list.filter(
          (p) =>
            p.categorySlug === "linen-tailoring" ||
            p.categorySlug === "wool-knitwear" ||
            (p.slug || "").includes("pink") ||
            (p.slug || "").includes("oat") ||
            (p.slug || "").includes("tote"),
        );
      } else if (department === "men") {
        list = list.filter(
          (p) =>
            p.categorySlug === "cotton-basics" ||
            p.categorySlug === "pants-bottoms" ||
            p.categorySlug === "sweat-hoodie" ||
            p.categorySlug === "linen-tailoring" ||
            p.categorySlug === "wool-knitwear" ||
            p.categorySlug === "leather-goods",
        );
      }
    }

    // Filter by Keyword
    if (keyword.trim()) {
      const q = keyword.trim().toLowerCase();
      list = list.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.categoryName || "").toLowerCase().includes(q) ||
          (p.materialTag || "").toLowerCase().includes(q) ||
          (p.descriptions || "").toLowerCase().includes(q) ||
          (p.creatorName || "").toLowerCase().includes(q),
      );
    }

    // Sort
    if (sort === "price_asc") {
      list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sort === "price_desc") {
      list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sort === "bestselling") {
      list.sort((a, b) => Number(b.soldCount || 0) - Number(a.soldCount || 0));
    }

    return list;
  }, [
    baseProducts,
    keyword,
    category,
    material,
    factorySlug,
    selectedColor,
    selectedSize,
    priceRange,
    department,
    sort,
  ]);

  const activeCategoryObj = UNLO_CATEGORIES.find((c) => c.id === category);

  const resetFilters = () => {
    setKeyword("");
    setCategory("");
    setFactorySlug("");
    setMaterial("");
    setSelectedColor("");
    setSelectedSize("");
    setPriceRange("all");
    setDepartment("");
    setSort("newest");
    setActiveDropdown(null);
  };

  const activeFilterCount =
    (keyword.trim() ? 1 : 0) +
    (category ? 1 : 0) +
    (factorySlug ? 1 : 0) +
    (material ? 1 : 0) +
    (selectedColor ? 1 : 0) +
    (selectedSize ? 1 : 0) +
    (priceRange !== "all" ? 1 : 0) +
    (department ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 max-w-[1760px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16 space-y-6">
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

        {/* Page Breadcrumb & Header Banner */}
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
              <p className="text-sm text-[#4E567A] max-w-2xl">
                {activeCategoryObj
                  ? activeCategoryObj.description
                  : "Mọi sản phẩm đều công khai biểu đồ bóc tách giá 4 tầng, thông số vật liệu chuẩn xuất khẩu và hộ chiếu nhà máy đối tác."}
              </p>
            </div>

            <div className="relative w-full md:w-80 shrink-0">
              <Search
                className="w-4 h-4 text-[#625FBC] absolute left-4 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm chất liệu, vải sợi, xưởng..."
                aria-label="Tìm kiếm trong bộ sưu tập"
                className="w-full h-11 pl-10 pr-9 rounded-full bg-white border border-[#BBC2DD] text-sm text-[#15095D] placeholder:text-[#8D8DC7] outline-none focus:border-[#15095D] transition-colors"
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

        {/* QUINCE-STYLE DETAILED PILL FILTER TOOLBAR */}
        <div ref={toolbarRef} className="space-y-3 pb-4 border-b border-[#DCE0E7]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Filter Pills Group */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {/* Filter Drawer Button */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className={`inline-flex items-center gap-2 h-9 px-4 rounded-full border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                  activeFilterCount > 0
                    ? "border-[#15095D] bg-[#15095D] text-white"
                    : "border-[#DCE0E7] bg-white text-[#15095D] hover:border-[#15095D]"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="min-w-4 h-4 px-1 rounded-full bg-[#EB6D48] text-white text-[10px] font-bold grid place-items-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Product Type Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("type")}
                  className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full border text-xs transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                    category
                      ? "border-[#15095D] bg-[#F0F2FA] text-[#15095D] font-semibold"
                      : "border-[#DCE0E7] bg-white text-[#2B2D38] hover:border-[#15095D]"
                  }`}
                >
                  <span>
                    {category
                      ? PRODUCT_TYPE_OPTIONS.find((t) => t.id === category)?.label || "Product Type"
                      : "Product Type"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeDropdown === "type" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "type" && (
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-[#DCE0E7] rounded-2xl shadow-[0_12px_40px_rgba(21,9,93,0.12)] p-2 z-40 animate-in fade-in zoom-in-95 duration-100">
                    <div className="max-h-72 overflow-y-auto space-y-1">
                      {PRODUCT_TYPE_OPTIONS.map((item) => {
                        const isSelected = category === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setCategory(isSelected && item.id !== "" ? "" : item.id);
                              setActiveDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#15095D] text-white font-medium"
                                : "text-[#2B2D38] hover:bg-[#F4F5FB]"
                            }`}
                          >
                            <span>{item.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Color Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("color")}
                  className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full border text-xs transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                    selectedColor
                      ? "border-[#15095D] bg-[#F0F2FA] text-[#15095D] font-semibold"
                      : "border-[#DCE0E7] bg-white text-[#2B2D38] hover:border-[#15095D]"
                  }`}
                >
                  {selectedColor && (
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block shrink-0"
                      style={{
                        backgroundColor:
                          COLOR_OPTIONS.find((c) => c.name === selectedColor)?.hex || "#15095D",
                      }}
                    />
                  )}
                  <span>{selectedColor ? `Color: ${selectedColor}` : "Color"}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeDropdown === "color" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "color" && (
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-[#DCE0E7] rounded-2xl shadow-[0_12px_40px_rgba(21,9,93,0.12)] p-2 z-40 animate-in fade-in zoom-in-95 duration-100">
                    <div className="max-h-72 overflow-y-auto space-y-1">
                      {COLOR_OPTIONS.map((item) => {
                        const isSelected = selectedColor === item.name;
                        return (
                          <button
                            key={item.name}
                            type="button"
                            onClick={() => {
                              setSelectedColor(isSelected && item.name !== "" ? "" : item.name);
                              setActiveDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#15095D] text-white font-medium"
                                : "text-[#2B2D38] hover:bg-[#F4F5FB]"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {item.hex && (
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                                  style={{ backgroundColor: item.hex }}
                                />
                              )}
                              <span>{item.label}</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Size Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("size")}
                  className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full border text-xs transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                    selectedSize
                      ? "border-[#15095D] bg-[#F0F2FA] text-[#15095D] font-semibold"
                      : "border-[#DCE0E7] bg-white text-[#2B2D38] hover:border-[#15095D]"
                  }`}
                >
                  <span>{selectedSize ? `Size: ${selectedSize}` : "Size"}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeDropdown === "size" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "size" && (
                  <div className="absolute left-0 mt-2 w-56 bg-white border border-[#DCE0E7] rounded-2xl shadow-[0_12px_40px_rgba(21,9,93,0.12)] p-2 z-40 animate-in fade-in zoom-in-95 duration-100">
                    <div className="max-h-72 overflow-y-auto space-y-1">
                      {SIZE_OPTIONS.map((item) => {
                        const isSelected = selectedSize === item.value;
                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => {
                              setSelectedSize(isSelected && item.value !== "" ? "" : item.value);
                              setActiveDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#15095D] text-white font-medium"
                                : "text-[#2B2D38] hover:bg-[#F4F5FB]"
                            }`}
                          >
                            <span>{item.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Material Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("material")}
                  className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full border text-xs transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                    material
                      ? "border-[#15095D] bg-[#F0F2FA] text-[#15095D] font-semibold"
                      : "border-[#DCE0E7] bg-white text-[#2B2D38] hover:border-[#15095D]"
                  }`}
                >
                  <span>
                    {material
                      ? MATERIAL_OPTIONS.find((m) => m.value === material)?.label || "Material"
                      : "Material"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeDropdown === "material" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "material" && (
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-[#DCE0E7] rounded-2xl shadow-[0_12px_40px_rgba(21,9,93,0.12)] p-2 z-40 animate-in fade-in zoom-in-95 duration-100">
                    <div className="max-h-72 overflow-y-auto space-y-1">
                      {MATERIAL_OPTIONS.map((item) => {
                        const isSelected = material === item.value;
                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => {
                              setMaterial(isSelected && item.value !== "" ? "" : item.value);
                              setActiveDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#15095D] text-white font-medium"
                                : "text-[#2B2D38] hover:bg-[#F4F5FB]"
                            }`}
                          >
                            <span>{item.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Range Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("price")}
                  className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full border text-xs transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                    priceRange !== "all"
                      ? "border-[#15095D] bg-[#F0F2FA] text-[#15095D] font-semibold"
                      : "border-[#DCE0E7] bg-white text-[#2B2D38] hover:border-[#15095D]"
                  }`}
                >
                  <span>
                    {priceRange !== "all"
                      ? PRICE_RANGE_OPTIONS.find((p) => p.id === priceRange)?.label || "Price Range"
                      : "Price Range"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeDropdown === "price" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "price" && (
                  <div className="absolute left-0 mt-2 w-60 bg-white border border-[#DCE0E7] rounded-2xl shadow-[0_12px_40px_rgba(21,9,93,0.12)] p-2 z-40 animate-in fade-in zoom-in-95 duration-100">
                    <div className="space-y-1">
                      {PRICE_RANGE_OPTIONS.map((item) => {
                        const isSelected = priceRange === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setPriceRange(isSelected && item.id !== "all" ? "all" : item.id);
                              setActiveDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#15095D] text-white font-medium"
                                : "text-[#2B2D38] hover:bg-[#F4F5FB]"
                            }`}
                          >
                            <span>{item.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Department Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("department")}
                  className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full border text-xs transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                    department
                      ? "border-[#15095D] bg-[#F0F2FA] text-[#15095D] font-semibold"
                      : "border-[#DCE0E7] bg-white text-[#2B2D38] hover:border-[#15095D]"
                  }`}
                >
                  <span>
                    {department
                      ? DEPARTMENT_OPTIONS.find((d) => d.id === department)?.label || "Department"
                      : "Department"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeDropdown === "department" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "department" && (
                  <div className="absolute left-0 mt-2 w-56 bg-white border border-[#DCE0E7] rounded-2xl shadow-[0_12px_40px_rgba(21,9,93,0.12)] p-2 z-40 animate-in fade-in zoom-in-95 duration-100">
                    <div className="space-y-1">
                      {DEPARTMENT_OPTIONS.map((item) => {
                        const isSelected = department === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setDepartment(isSelected && item.id !== "" ? "" : item.id);
                              setActiveDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#15095D] text-white font-medium"
                                : "text-[#2B2D38] hover:bg-[#F4F5FB]"
                            }`}
                          >
                            <span>{item.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Category / Factory Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("factory")}
                  className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full border text-xs transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                    factorySlug
                      ? "border-[#15095D] bg-[#F0F2FA] text-[#15095D] font-semibold"
                      : "border-[#DCE0E7] bg-white text-[#2B2D38] hover:border-[#15095D]"
                  }`}
                >
                  <span>
                    {factorySlug
                      ? FACTORY_OPTIONS.find((f) => f.slug === factorySlug)?.label || "Category"
                      : "Category"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      activeDropdown === "factory" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "factory" && (
                  <div className="absolute left-0 mt-2 w-72 bg-white border border-[#DCE0E7] rounded-2xl shadow-[0_12px_40px_rgba(21,9,93,0.12)] p-2 z-40 animate-in fade-in zoom-in-95 duration-100">
                    <div className="space-y-1">
                      {FACTORY_OPTIONS.map((item) => {
                        const isSelected = factorySlug === item.slug;
                        return (
                          <button
                            key={item.slug}
                            type="button"
                            onClick={() => {
                              setFactorySlug(isSelected && item.slug !== "" ? "" : item.slug);
                              setActiveDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#15095D] text-white font-medium"
                                : "text-[#2B2D38] hover:bg-[#F4F5FB]"
                            }`}
                          >
                            <span>{item.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Items Count + Sort Dropdown */}
            <div className="flex items-center gap-3.5 ml-auto shrink-0">
              <span className="text-xs text-[#5E607E] tabular-nums font-medium">
                {products.length} Items
              </span>
              <div className="relative">
                <select
                  aria-label="Sắp xếp sản phẩm"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-9 py-0 pl-3.5 pr-8 rounded-full bg-white border border-[#DCE0E7] text-xs font-semibold text-[#15095D] outline-none hover:border-[#15095D] focus:border-[#15095D] cursor-pointer appearance-none shadow-xs"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      Sort By: {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#5E607E] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ACTIVE FILTER CHIPS ROW */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[#5E607E] font-medium mr-1">Bộ lọc đang chọn:</span>

              {category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF2F9] text-[#15095D] font-medium border border-[#DCE0E7]">
                  <span>Loại: {PRODUCT_TYPE_OPTIONS.find((t) => t.id === category)?.label}</span>
                  <button
                    type="button"
                    onClick={() => setCategory("")}
                    className="hover:text-[#EB6D48]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedColor && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF2F9] text-[#15095D] font-medium border border-[#DCE0E7]">
                  <span>Màu: {selectedColor}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedColor("")}
                    className="hover:text-[#EB6D48]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedSize && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF2F9] text-[#15095D] font-medium border border-[#DCE0E7]">
                  <span>Size: {selectedSize}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedSize("")}
                    className="hover:text-[#EB6D48]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {material && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF2F9] text-[#15095D] font-medium border border-[#DCE0E7]">
                  <span>Chất liệu: {material}</span>
                  <button
                    type="button"
                    onClick={() => setMaterial("")}
                    className="hover:text-[#EB6D48]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {priceRange !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF2F9] text-[#15095D] font-medium border border-[#DCE0E7]">
                  <span>Giá: {PRICE_RANGE_OPTIONS.find((p) => p.id === priceRange)?.label}</span>
                  <button
                    type="button"
                    onClick={() => setPriceRange("all")}
                    className="hover:text-[#EB6D48]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {department && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF2F9] text-[#15095D] font-medium border border-[#DCE0E7]">
                  <span>Ngành: {DEPARTMENT_OPTIONS.find((d) => d.id === department)?.label}</span>
                  <button
                    type="button"
                    onClick={() => setDepartment("")}
                    className="hover:text-[#EB6D48]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {factorySlug && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF2F9] text-[#15095D] font-medium border border-[#DCE0E7]">
                  <span>
                    Xưởng: {FACTORY_OPTIONS.find((f) => f.slug === factorySlug)?.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFactorySlug("")}
                    className="hover:text-[#EB6D48]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {keyword && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF2F9] text-[#15095D] font-medium border border-[#DCE0E7]">
                  <span>Từ khóa: &quot;{keyword}&quot;</span>
                  <button
                    type="button"
                    onClick={() => setKeyword("")}
                    className="hover:text-[#EB6D48]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="text-[#EB6D48] hover:text-[#D95F3B] hover:underline font-semibold ml-2 cursor-pointer inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Xóa tất cả bộ lọc</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-5">
            {products.map((product) => (
              <NullProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-[#EFF2F9]/60 border border-[#DCE0E7] py-16 px-6 text-center space-y-4">
            <p className="font-serif text-2xl font-semibold text-[#15095D]">
              Chưa tìm thấy sản phẩm khớp bộ lọc đã chọn
            </p>
            <p className="text-xs text-[#5E607E] max-w-md mx-auto">
              Hãy thử bỏ bớt tiêu chí lọc hoặc xóa bộ lọc để xem lại đầy đủ tất cả sản phẩm trực tiếp từ xưởng.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="h-11 px-6 rounded-full unlo-pill-primary text-xs font-semibold cursor-pointer"
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        )}
      </main>

      {/* FILTER DRAWER FOR MOBILE & DEEP FILTERING */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bộ lọc sản phẩm M2C"
          className="fixed inset-0 z-70 bg-[#15095D]/40 backdrop-blur-xs flex justify-end"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full max-w-md h-full bg-white text-[#15095D] flex flex-col shadow-2xl animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-[#EFF2F9] flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Tất Cả Bộ Lọc Sản Phẩm</h2>
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
              {/* Product Type */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4E567A]">
                  Chủng loại sản phẩm (Product Type)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {PRODUCT_TYPE_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(category === item.id && item.id !== "" ? "" : item.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                        category === item.id
                          ? "bg-[#15095D] text-white"
                          : "bg-[#EFF2F9] text-[#15095D] hover:bg-[#DCE0E7]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4E567A]">
                  Màu sắc (Color)
                </p>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.filter((c) => c.name).map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() =>
                        setSelectedColor(selectedColor === item.name ? "" : item.name)
                      }
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                        selectedColor === item.name
                          ? "border-[#15095D] bg-[#15095D] text-white"
                          : "border-[#DCE0E7] bg-white text-[#2B2D38] hover:border-[#15095D]"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: item.hex }}
                      />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4E567A]">
                  Kích cỡ (Size)
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.filter((s) => s.value).map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setSelectedSize(selectedSize === item.value ? "" : item.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        selectedSize === item.value
                          ? "bg-[#15095D] text-white"
                          : "bg-[#EFF2F9] text-[#15095D] hover:bg-[#DCE0E7]"
                      }`}
                    >
                      {item.value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4E567A]">
                  Chất liệu vải xưởng (Material)
                </p>
                <div className="flex flex-wrap gap-2">
                  {MATERIAL_OPTIONS.filter((m) => m.value).map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setMaterial(material === item.value ? "" : item.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                        material === item.value
                          ? "bg-[#32259B] text-white"
                          : "bg-[#EFF2F9] text-[#15095D] hover:bg-[#DCE0E7]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4E567A]">
                  Khoảng giá (Price Range)
                </p>
                <div className="space-y-1.5">
                  {PRICE_RANGE_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPriceRange(priceRange === item.id ? "all" : item.id)}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        priceRange === item.id
                          ? "bg-[#15095D] text-white"
                          : "bg-[#EFF2F9] text-[#15095D] hover:bg-[#DCE0E7]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Factory */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4E567A] inline-flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-[#32259B]" />
                  Nhà máy đối tác (Factory)
                </p>
                <div className="space-y-1.5">
                  {FACTORY_OPTIONS.map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => setFactorySlug(factorySlug === item.slug ? "" : item.slug)}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        factorySlug === item.slug
                          ? "bg-[#15095D] text-white"
                          : "bg-[#EFF2F9] text-[#15095D] hover:bg-[#DCE0E7]"
                      }`}
                    >
                      {item.label}
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
