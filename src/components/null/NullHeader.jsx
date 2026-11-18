"use client";

import { useState, useContext, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart,
  LogOut,
  LayoutDashboard,
  Sparkles,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { AppContext } from "@/app/context/AppContext";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import CartDrawer from "@/app/(client)/components/Cart_component/cart_drawer";
import { formatVnd } from "@/app/services/api/nullCommerceService";
import { UNLO_PRODUCTS, filterUnloProducts } from "@/lib/unloCatalog";

/**
 * Danh mục điều hướng chuẩn UNLO v3 từ prototype index.html:
 * NAV = [
 *   ["#cua-hang", "Cửa hàng"],
 *   ["#cua-hang", "Áo thun", "ao-thun"],
 *   ["#cua-hang", "Sơ mi", "so-mi"],
 *   ["#cua-hang", "Hoodie & Áo nỉ", "hoodie"],
 *   ["#cua-hang", "Quần", "quan"],
 *   ["#ca-nhan-hoa", "Cá nhân hóa"],
 *   ["#doanh-nghiep", "Doanh nghiệp"],
 *   ["#black-friday", "Black Friday"],
 *   ["#ho-tro", "Hỗ trợ"]
 * ]
 */
const NAV_ITEMS = [
  {
    label: "Cửa hàng",
    href: "/products",
    categoryKey: "all",
  },
  {
    label: "Áo thun",
    href: "/products?category=cotton-basics",
    categoryKey: "cotton-basics",
  },
  {
    label: "Sơ mi",
    href: "/products?category=linen-tailoring",
    categoryKey: "linen-tailoring",
  },
  {
    label: "Hoodie & Áo nỉ",
    href: "/products?keyword=hoodie",
    keywordKey: "hoodie",
  },
  {
    label: "Quần",
    href: "/products?keyword=quan",
    keywordKey: "quan",
  },
  {
    label: "Cá nhân hóa",
    href: "/#studio-theu-ten",
    special: "personalize",
  },
  {
    label: "Doanh nghiệp",
    href: "/b2b",
    routePrefix: "/b2b",
  },
  {
    label: "Black Friday",
    href: "/#black-friday",
    special: "black-friday",
  },
  {
    label: "Hồ sơ xưởng",
    href: "/factories",
    routePrefix: "/factories",
  },
  {
    label: "Hỗ trợ",
    href: "/returns",
    routePrefix: "/returns",
  },
];

const SEARCH_SUGGESTIONS = [
  "cotton 250gsm",
  "oxford",
  "nỉ bông",
  "tote",
  "sơ mi linen",
  "ví da",
];

export default function NullHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useContext(AppContext) || {};
  const { cartCount, isCartOpen, setIsCartOpen } = useCart() || {};
  const { wishlistCount } = useWishlist() || {};

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchString, setSearchString] = useState("");
  const [prevPathname, setPrevPathname] = useState(pathname);
  const accountRef = useRef(null);
  const searchInputRef = useRef(null);

  // Sync client query string for active nav tabs without triggering Next.js deopt
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        setSearchString(window.location.search || "");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
    if (searchOpen) setSearchOpen(false);
    if (accountOpen) setAccountOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!accountOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setAccountOpen(false);
    };
    const onPointerDown = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [accountOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 40);
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prevOverflow || "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim();
    if (!searchOpen) return [];
    if (!q) return UNLO_PRODUCTS.slice(0, 6);
    return filterUnloProducts({ keyword: q }).slice(0, 8);
  }, [searchQuery, searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setSearchOpen(false);
    router.push(q ? `/products?keyword=${encodeURIComponent(q)}` : "/products");
  };

  const isItemActive = (item) => {
    if (item.categoryKey) {
      if (item.categoryKey === "all") {
        return pathname === "/products" && !searchString.includes("category=");
      }
      return pathname === "/products" && searchString.includes(`category=${item.categoryKey}`);
    }
    if (item.keywordKey) {
      return pathname === "/products" && searchString.includes(`keyword=${item.keywordKey}`);
    }
    if (item.routePrefix) {
      return pathname?.startsWith(item.routePrefix);
    }
    return pathname === item.href;
  };

  const isStaff = user?.role === "admin" || user?.role === "merchant";

  return (
    <>
      {/* ================================================================
          1. TOP PROMO BAR (.promo) — Chuẩn xác như index.html
          ✦ Black Friday 27.11 · Giảm đến 50% ✦ Miễn phí giao hàng cho kiện từ 499.000đ ✦ Giá xưởng giảm theo số lượng từ 10 sản phẩm
          ================================================================ */}
      <div className="bg-[#15095D] text-[#E8E9FA] text-[11px] sm:text-xs tracking-[0.14em] uppercase font-medium border-b border-[#1F0C85]">
        <div className="max-w-[1760px] mx-auto px-4 flex items-center justify-center gap-6 py-2.5 whitespace-nowrap overflow-hidden text-center">
          <span className="inline-flex items-center gap-2">
            <span className="text-[#9EA1D2] font-serif not-italic">✦</span>
            <Link
              href="/#black-friday"
              className="underline underline-offset-4 hover:text-white transition-colors"
            >
              Black Friday 27.11 · Giảm đến 50%
            </Link>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-[#9EA1D2] font-serif not-italic">✦</span>
            <span>Miễn phí giao hàng cho kiện từ 499.000đ</span>
          </span>
          <span className="hidden xl:inline-flex items-center gap-2">
            <span className="text-[#9EA1D2] font-serif not-italic">✦</span>
            <span>Giá xưởng giảm theo số lượng từ 10 sản phẩm</span>
          </span>
        </div>
      </div>

      {/* ================================================================
          2. SITE HEADER (header.site) — Layout: auto 1fr auto
          Left: Burger + Logo UNLO
          Center: nav.main (Cửa hàng, Áo thun, Sơ mi, Hoodie, Quần, Cá nhân hóa, Doanh nghiệp, Black Friday, Xưởng, Hỗ trợ)
          Right: .tools (Search, Account, Wishlist, Cart)
          ================================================================ */}
      <header
        className={`sticky top-0 z-50 w-full bg-white/96 backdrop-blur-[10px] border-b transition-all duration-200 ${
          scrolled
            ? "border-[#DDE0EC] shadow-[0_10px_30px_rgba(21,9,93,0.06)]"
            : "border-[#DDE0EC]"
        }`}
      >
        <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-6">
          {/* Left: Mobile Hamburger + UNLO Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="xl:hidden w-10 h-10 rounded-full grid place-items-center text-[#15095D] hover:bg-[#F4F5FB] transition-colors"
              aria-label="Mở menu điều hướng"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <Link
              href="/"
              className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-[#443EB1] rounded-lg"
              aria-label="UNLO trang chủ"
            >
              <img
                src="/assets/logo/unlo-header.png"
                alt="UNLO"
                className="h-7 sm:h-[1.8rem] w-auto object-contain select-none"
                loading="eager"
              />
            </Link>
          </div>

          {/* Center: nav.main (Desktop) */}
          <nav
            aria-label="Danh mục chính UNLO"
            className="hidden xl:flex items-center justify-center gap-1 flex-wrap min-w-0"
          >
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);

              if (item.special === "black-friday") {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="bg-[#0B0A1F] text-white hover:bg-[#15095D] font-semibold text-[13px] px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ml-1 shadow-xs"
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              }

              if (item.special === "personalize") {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`font-semibold text-[13px] px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                      active
                        ? "bg-[#32259B] text-white"
                        : "bg-[#EFF2F9] text-[#443EB1] hover:bg-[#32259B] hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[13px] font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                    active
                      ? "text-[#15095D] font-bold bg-[#F4F5FB]"
                      : "text-[#1A1838] hover:text-[#15095D] hover:bg-[#F4F5FB]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: .tools (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-1 sm:gap-1.5 justify-self-end shrink-0">
            {/* 1. Open Search Box */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm sản phẩm, xưởng..."
              className="w-10 h-10 rounded-full grid place-items-center text-[#15095D] hover:bg-[#F4F5FB] transition-colors relative"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="w-[21px] h-[21px]"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4.5 4.5" />
              </svg>
            </button>

            {/* 2. User Account & Orders */}
            <div ref={accountRef} className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                aria-label="Tài khoản và đơn hàng"
                aria-expanded={accountOpen}
                className="w-10 h-10 rounded-full grid place-items-center text-[#15095D] hover:bg-[#F4F5FB] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="w-[21px] h-[21px]"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8.5" r="3.8" />
                  <path d="M4.5 20c1.3-3.6 4.2-5.4 7.5-5.4s6.2 1.8 7.5 5.4" />
                </svg>
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-[#DDE0EC] bg-white shadow-[0_20px_50px_rgba(21,9,93,0.15)] p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {user ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2 border-b border-[#EFF2F9]">
                        <p className="text-xs font-semibold text-[#15095D] truncate">
                          {user.name || user.email}
                        </p>
                        <p className="text-[11px] text-[#5E607E] truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/profile/orders"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#15095D] hover:bg-[#F4F5FB]"
                      >
                        <RotateCcw className="w-4 h-4 text-[#443EB1]" />
                        Đơn hàng &amp; Tra cứu bảo hành
                      </Link>
                      {isStaff && (
                        <Link
                          href={user.role === "admin" ? "/admin-products" : "/manager"}
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#15095D] hover:bg-[#F4F5FB]"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#443EB1]" />
                          Cổng Xưởng / Quản trị
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setAccountOpen(false);
                          logout?.();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#A52735] hover:bg-[#FDF2F3]"
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 p-1">
                      <p className="text-xs text-[#5E607E] px-2 leading-relaxed">
                        Tra cứu đơn hàng hoặc đăng nhập để lưu ưu đãi giá xưởng.
                      </p>
                      <Link
                        href="/login"
                        onClick={() => setAccountOpen(false)}
                        className="block w-full text-center py-2.5 rounded-full bg-[#15095D] text-white hover:bg-[#1F0C85] text-xs font-semibold shadow-xs"
                      >
                        Đăng nhập / Đăng ký
                      </Link>
                      <Link
                        href="/returns"
                        onClick={() => setAccountOpen(false)}
                        className="block w-full text-center py-2 rounded-full border border-[#DDE0EC] text-[#15095D] hover:bg-[#F4F5FB] text-xs font-medium"
                      >
                        Cổng Đổi Trả 30 Ngày
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Wishlist Link */}
            <Link
              href="/wishlist"
              aria-label="Danh sách yêu thích"
              className="relative w-10 h-10 rounded-full grid place-items-center text-[#15095D] hover:bg-[#F4F5FB] transition-colors"
            >
              <Heart className="w-[20px] h-[20px] stroke-[1.6]" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#15095D] text-white text-[10px] font-bold grid place-items-center leading-none tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* 4. Cart Bag Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen?.(true)}
              aria-label={`Giỏ hàng (${cartCount || 0} sản phẩm)`}
              className="relative w-10 h-10 rounded-full grid place-items-center text-[#15095D] hover:bg-[#F4F5FB] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="w-[21px] h-[21px]"
                aria-hidden="true"
              >
                <path d="M5 8h14l-1.2 12H6.2z" />
                <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#15095D] text-white text-[10px] font-bold grid place-items-center leading-none tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================
          3. LIVE SEARCH OVERLAY (.searchbox) — Chuẩn xác như index.html
          ================================================================ */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tìm kiếm sản phẩm UNLO"
          className="fixed inset-0 z-70 bg-[#15095D]/35 backdrop-blur-[3px]"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full bg-white pt-6 pb-8 shadow-[0_20px_60px_rgba(21,9,93,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-3 border-b-2 border-[#15095D] pb-2.5"
              >
                <label htmlFor="sq" className="sr-only">
                  Tìm kiếm
                </label>
                <input
                  id="sq"
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm áo thun, hoodie, xưởng…"
                  autoComplete="off"
                  className="flex-1 font-serif text-2xl sm:text-3xl text-[#15095D] placeholder:text-[#BBC2DD] outline-none bg-transparent min-w-0"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Đóng tìm kiếm"
                  className="w-10 h-10 rounded-full grid place-items-center text-[#15095D] hover:bg-[#F4F5FB] transition-colors text-lg"
                >
                  ✕
                </button>
              </form>

              {/* Suggestions */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#5E607E] mt-3">
                <span className="font-medium text-[#15095D]">Gợi ý:</span>
                {SEARCH_SUGGESTIONS.map((tag, idx) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="hover:text-[#15095D] hover:underline cursor-pointer"
                  >
                    {tag}
                    {idx < SEARCH_SUGGESTIONS.length - 1 && (
                      <span className="mx-1.5 text-[#BBC2DD]">·</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Dynamic Search Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5 max-h-[60vh] overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((p) => (
                    <Link
                      key={p._id}
                      href={`/products/${p.slug}-${p._id}`}
                      onClick={() => setSearchOpen(false)}
                      className="grid grid-cols-[64px_1fr] gap-3 items-center p-2 rounded-xl hover:bg-[#F4F5FB] transition-colors group"
                    >
                      <img
                        src={p.images?.[0]?.url || p.images?.[0]}
                        alt={p.name}
                        className="w-16 h-[76px] object-cover rounded-md bg-[#EFF2F9]"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-xs sm:text-sm text-[#15095D] line-clamp-1 group-hover:text-[#32259B]">
                          {p.name}
                        </p>
                        <p className="text-xs text-[#5E607E] mt-0.5">
                          <strong className="font-semibold text-[#15095D]">
                            {formatVnd(p.price)}
                          </strong>{" "}
                          · {p.creatorName || "Xưởng Dệt Kim"}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs sm:text-sm text-[#5E607E] py-4 col-span-full">
                    Không tìm thấy sản phẩm cho “{searchQuery}”.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================
          4. MOBILE DRAWER (.drawer) — Chuẩn xác như index.html
          ================================================================ */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu di động UNLO"
          className="fixed inset-0 z-70 bg-[#15095D]/35 backdrop-blur-[3px] xl:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <nav
            aria-label="Menu di động"
            className="fixed top-0 bottom-0 left-0 w-[min(340px,86vw)] z-71 bg-white p-5 sm:p-6 overflow-y-auto flex flex-col gap-2 shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE0EC]">
              <img
                src="/assets/logo/unlo-header.png"
                alt="UNLO"
                className="h-[26px] w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Đóng menu"
                className="w-9 h-9 rounded-full grid place-items-center text-[#15095D] hover:bg-[#F4F5FB]"
              >
                ✕
              </button>
            </div>

            {/* Navigation links matching index.html NAV */}
            <div className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 px-1 border-b border-[#DDE0EC] text-sm flex items-center justify-between transition-colors ${
                    item.special === "personalize"
                      ? "text-[#443EB1] font-semibold"
                      : item.special === "black-friday"
                        ? "text-[#15095D] font-bold"
                        : "text-[#1A1838] font-medium hover:text-[#15095D]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.special === "personalize" && (
                      <Sparkles className="w-4 h-4 text-[#443EB1]" />
                    )}
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#BBC2DD]" />
                </Link>
              ))}

              <Link
                href="/bundles"
                onClick={() => setMobileOpen(false)}
                className="py-3 px-1 border-b border-[#DDE0EC] text-sm text-[#1A1838] font-medium flex items-center justify-between"
              >
                <span>Tự tạo Combo (-20%)</span>
                <ChevronRight className="w-4 h-4 text-[#BBC2DD]" />
              </Link>

              <Link
                href="/group-buy"
                onClick={() => setMobileOpen(false)}
                className="py-3 px-1 border-b border-[#DDE0EC] text-sm text-[#1A1838] font-medium flex items-center justify-between"
              >
                <span>Gom đơn MOQ</span>
                <ChevronRight className="w-4 h-4 text-[#BBC2DD]" />
              </Link>

              <Link
                href="/profile/orders"
                onClick={() => setMobileOpen(false)}
                className="py-3 px-1 border-b border-[#DDE0EC] text-sm text-[#1A1838] font-medium flex items-center justify-between"
              >
                <span>Đơn hàng của tôi</span>
                <ChevronRight className="w-4 h-4 text-[#BBC2DD]" />
              </Link>
            </div>

            {/* Bottom Slogan */}
            <div className="mt-auto pt-6 text-center">
              <p className="font-serif italic text-xs text-[#5E607E] leading-relaxed">
                “Giữ chất lượng xuất khẩu. Cắt bỏ chi phí logo trung gian.”
              </p>
            </div>
          </nav>
        </div>
      )}

      {/* Slide-Over Cart Drawer */}
      <CartDrawer open={isCartOpen} setOpen={setIsCartOpen} />
    </>
  );
}
