"use client";

import { useState, useContext, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Sparkles,
  Search,
  ChevronRight,
  Factory,
  RotateCcw,
} from "lucide-react";
import { AppContext } from "@/app/context/AppContext";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import CartDrawer from "@/app/(client)/components/Cart_component/cart_drawer";
import { formatVnd } from "@/app/services/api/nullCommerceService";
import { UNLO_PRODUCTS, filterUnloProducts } from "@/lib/unloCatalog";
import { UnloLogo, UnloAppIcon } from "./UnloLogo";

const NAV_LINKS = [
  { href: "/products", label: "Sản Phẩm" },
  { href: "/factories", label: "Hồ Sơ Nhà Máy", highlight: true },
  { href: "/bundles", label: "Tự Tạo Combo" },
  { href: "/group-buy", label: "Gom Đơn MOQ" },
  { href: "/b2b", label: "Doanh Nghiệp B2B" },
  { href: "/returns", label: "Đổi Trả 30 Ngày" },
];

const TRENDING_SEARCHES = [
  "Supima 260 GSM",
  "Ví Da Bình Dương",
  "Sơ Mi Linen",
  "Cốc Gốm Bát Tràng",
  "Túi Công Sở YKK",
  "Canvas 16oz",
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
  const [prevPathname, setPrevPathname] = useState(pathname);
  const accountRef = useRef(null);

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
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow || "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim();
    if (!searchOpen || !q) return [];
    return filterUnloProducts({ keyword: q }).slice(0, 6);
  }, [searchQuery, searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setSearchOpen(false);
    router.push(q ? `/products?keyword=${encodeURIComponent(q)}` : "/products");
  };

  const isStaff = user?.role === "admin" || user?.role === "merchant";
  const featuredProducts = UNLO_PRODUCTS.slice(0, 4);

  return (
    <>
      {/* 1. Slim Midnight Indigo Announcement Strip */}
      <div className="bg-[#15095D] text-[#FCFDF1] text-[11px] sm:text-xs py-2 px-4 text-center tracking-wide">
        <div className="max-w-[1380px] mx-auto flex items-center justify-center flex-wrap gap-x-4 gap-y-1">
          <span>Trực tiếp từ xưởng Tier-1 OEM Việt Nam · Tiết kiệm 40–65%</span>
          <span className="hidden sm:inline text-[#8D8DC7]" aria-hidden="true">
            •
          </span>
          <span className="hidden sm:inline">
            Kiểm hàng trước thanh toán · Đổi trả miễn phí 30 ngày · Mã:{" "}
            <strong className="font-semibold text-[#BBC2DD]">UNLO25</strong>
          </span>
        </div>
      </div>

      {/* 2. Clean White Sticky Header */}
      <header
        className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b transition-[border-color,box-shadow] duration-200 ${
          scrolled
            ? "border-[#DCE0E7] shadow-[0_8px_28px_-18px_rgba(21,9,93,0.18)]"
            : "border-[#EFF2F9]"
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-[74px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-11 h-11 -ml-2 rounded-full grid place-items-center text-[#15095D] hover:bg-[#EFF2F9] transition-colors null-pressable"
              aria-label="Mở menu điều hướng"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#443EB1] rounded-lg py-1"
              aria-label="UNLO — Trang chủ"
            >
              <UnloLogo className="h-8 sm:h-9 w-auto" />
            </Link>
          </div>

          {/* Center Navigation */}
          <nav
            aria-label="Danh mục chính UNLO M2C"
            className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 min-w-0"
          >
            {NAV_LINKS.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[13px] font-medium whitespace-nowrap py-1.5 transition-colors ${
                    item.highlight
                      ? "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EFF2F9] text-[#32259B] hover:bg-[#32259B] hover:text-white font-semibold"
                      : active
                        ? "text-[#32259B] font-bold"
                        : "text-[#15095D]/80 hover:text-[#32259B]"
                  }`}
                >
                  {item.highlight && <Factory className="w-3.5 h-3.5" aria-hidden="true" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm sản phẩm và xưởng"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full grid place-items-center text-[#15095D] hover:bg-[#EFF2F9] transition-colors null-pressable"
            >
              <Search className="w-[19px] h-[19px] stroke-[1.75]" aria-hidden="true" />
            </button>

            <Link
              href="/wishlist"
              aria-label="Danh sách yêu thích"
              className="relative hidden sm:grid w-10 h-10 sm:w-11 sm:h-11 rounded-full place-items-center text-[#15095D] hover:bg-[#EFF2F9] transition-colors null-pressable"
            >
              <Heart className="w-[19px] h-[19px] stroke-[1.75]" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#625FBC] text-white text-[10px] font-bold grid place-items-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <div ref={accountRef} className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                aria-expanded={accountOpen}
                aria-label="Tài khoản của bạn"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full grid place-items-center text-[#15095D] hover:bg-[#EFF2F9] transition-colors null-pressable"
              >
                <User className="w-[19px] h-[19px] stroke-[1.75]" aria-hidden="true" />
              </button>

              {accountOpen && (
                <div className="null-popover absolute right-0 mt-2 w-60 rounded-2xl border border-[#DCE0E7] bg-white shadow-[0_18px_40px_-16px_rgba(21,9,93,0.22)] p-2 z-50">
                  {user ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2.5 border-b border-[#EFF2F9]">
                        <p className="text-xs font-semibold text-[#15095D] truncate">
                          {user.name || user.email}
                        </p>
                        <p className="text-[11px] text-[#4E567A] truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/profile/orders"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#15095D] hover:bg-[#EFF2F9]"
                      >
                        <RotateCcw className="w-4 h-4 text-[#443EB1]" />
                        Đơn hàng &amp; Đổi trả 30 ngày
                      </Link>
                      {isStaff && (
                        <Link
                          href={user.role === "admin" ? "/admin-products" : "/manager"}
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#15095D] hover:bg-[#EFF2F9]"
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
                    <div className="space-y-1.5 p-1">
                      <Link
                        href="/login"
                        onClick={() => setAccountOpen(false)}
                        className="block w-full text-center py-2.5 rounded-full unlo-pill-primary text-xs font-semibold"
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        href="/returns"
                        onClick={() => setAccountOpen(false)}
                        className="block w-full text-center py-2.5 rounded-full unlo-pill-outline text-xs font-semibold"
                      >
                        Cổng Đổi Trả 30 Ngày
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen?.(true)}
              aria-label={`Mở giỏ hàng (${cartCount || 0} sản phẩm)`}
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full grid place-items-center text-[#15095D] hover:bg-[#EFF2F9] transition-colors null-pressable"
            >
              <ShoppingBag className="w-[19px] h-[19px] stroke-[1.75]" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#32259B] text-white text-[10px] font-bold grid place-items-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Live Search Overlay */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tìm kiếm trên UNLO M2C"
          className="fixed inset-0 z-70 bg-[#15095D]/45 backdrop-blur-xs flex items-start justify-center pt-4 sm:pt-12 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-3xl rounded-3xl bg-white border border-[#DCE0E7] shadow-2xl overflow-hidden animate-slide-in-down"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-[#EFF2F9]"
            >
              <Search className="w-5 h-5 text-[#443EB1] shrink-0" aria-hidden="true" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm áo thun Supima 260 GSM, ví da Bình Dương, gốm Bát Tràng..."
                className="flex-1 bg-transparent text-sm sm:text-base text-[#15095D] placeholder:text-[#8D8DC7] outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-medium text-[#4E567A] hover:text-[#15095D] px-2 py-1"
                >
                  Xóa
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Đóng tìm kiếm"
                className="w-9 h-9 rounded-full grid place-items-center text-[#4E567A] hover:bg-[#EFF2F9] hover:text-[#15095D]"
              >
                <X className="w-4 h-4" />
              </button>
            </form>

            <div className="p-5 sm:p-6 max-h-[75dvh] overflow-y-auto space-y-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E567A] mb-3">
                  Vật liệu &amp; Xưởng tìm nhiều
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className="px-3.5 py-1.5 rounded-full bg-[#EFF2F9] text-xs font-medium text-[#15095D] hover:bg-[#32259B] hover:text-white transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E567A]">
                    {searchQuery.trim()
                      ? `Kết quả phù hợp (${searchResults.length})`
                      : "Sản phẩm M2C nổi bật"}
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setSearchOpen(false)}
                    className="text-xs font-semibold text-[#32259B] hover:underline"
                  >
                    Xem tất cả
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(searchQuery.trim() ? searchResults : featuredProducts).map((item) => (
                    <Link
                      key={item._id}
                      href={`/products/${item.slug}-${item._id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3.5 p-2.5 rounded-2xl border border-[#EFF2F9] hover:border-[#9EA1D2] hover:bg-[#EFF2F9]/50 transition-colors"
                    >
                      <img
                        src={item.images?.[0]?.url}
                        alt={item.name}
                        className="w-14 h-16 rounded-xl object-cover bg-[#EFF2F9] shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-medium text-[#625FBC]">
                          {item.creatorName}
                        </p>
                        <p className="text-sm font-semibold text-[#15095D] line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs font-bold text-[#32259B] tabular-nums mt-0.5">
                          {formatVnd(item.price)}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#8D8DC7] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Mobile Slide-Out Menu */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu di động UNLO"
          className="fixed inset-0 z-70 bg-[#15095D]/45 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-[86%] max-w-sm h-full bg-white text-[#15095D] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-[#EFF2F9] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <UnloAppIcon className="w-8 h-8" />
                <UnloLogo className="h-7 w-auto" />
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Đóng menu"
                className="w-10 h-10 rounded-full grid place-items-center text-[#15095D] hover:bg-[#EFF2F9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold text-[#15095D] hover:bg-[#EFF2F9] transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#8D8DC7]" />
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold text-[#32259B] bg-[#EFF2F9]/70 mt-2"
              >
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Giỏ hàng của tôi ({cartCount || 0})
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </nav>

            <div className="p-4 border-t border-[#EFF2F9] bg-[#FCFDF1]">
              <p className="text-xs font-serif italic text-[#15095D]">
                “Giữ chất lượng xuất khẩu. Cắt bỏ chi phí logo trung gian.”
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Slide-Over Cart Drawer */}
      <CartDrawer open={isCartOpen} setOpen={setIsCartOpen} />
    </>
  );
}
