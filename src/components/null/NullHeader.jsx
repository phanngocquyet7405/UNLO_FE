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
  ChevronDown,
  RotateCcw,
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  PhoneCall,
} from "lucide-react";
import { AppContext } from "@/app/context/AppContext";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import CartDrawer from "@/app/(client)/components/Cart_component/cart_drawer";
import NullMobileBottomNav from "./NullMobileBottomNav";
import { formatVnd } from "@/app/services/api/nullCommerceService";
import { UNLO_PRODUCTS, filterUnloProducts } from "@/lib/unloCatalog";

/**
 * CẤU TRÚC ĐIỀU HƯỚNG PHÂN TẦNG TIẾT KIỆM KHÔNG GIAN (UNLO HIERARCHICAL NAVIGATION)
 * Gom các mục con vào 7 mục cha tinh gọn, tích hợp toàn bộ các mục Pages (About, FAQ, Contact Us, Factories).
 */
export const NAV_GROUPS = [
  {
    type: "link",
    label: "Tất cả sản phẩm",
    href: "/products",
    categoryKey: "all",
  },
  {
    type: "dropdown",
    id: "collections",
    label: "Bộ sưu tập",
    children: [
      {
        label: "Hàng mới về",
        href: "/products?sort=newest",
        sortKey: "newest",
        desc: "Thiết kế đồ cơ bản xuất xưởng mới nhất",
        badge: "Mới",
      },
      {
        label: "Bán chạy nhất",
        href: "/products?sort=bestselling",
        sortKey: "bestselling",
        desc: "Sản phẩm được cộng đồng M2C tin chọn",
      },
      {
        label: "Săn giá xưởng",
        href: "/products?sort=price_asc",
        sortKey: "price_asc",
        desc: "Mức giá gốc trực tiếp từ chuyền may",
      },
      {
        label: "Tự tạo Combo -20%",
        href: "/bundles",
        desc: "Tự phối 3–5 món để nhận chiết khấu bậc thang",
        badge: "-20%",
      },
      {
        label: "Mua chung xưởng",
        href: "/group-buy",
        desc: "Gom đơn chung cắt giảm chi phí sản xuất",
        badge: "M2C",
      },
      {
        label: "Gói hội viên định kỳ",
        href: "/subscription",
        desc: "Đăng ký nhận hộp quà thiết yếu theo mùa",
      },
      {
        label: "Ưu đãi & Voucher",
        href: "/pages/offers-discounts-coupons",
        desc: "Các mã giảm giá & ưu đãi xưởng đang kích hoạt",
        badge: "Hot",
      },
    ],
  },
  {
    type: "dropdown",
    id: "apparel",
    label: "Trang phục",
    children: [
      {
        label: "Áo thun & Dệt kim",
        href: "/products?category=cotton-basics",
        categoryKey: "cotton-basics",
        desc: "Cotton Supima 260 GSM, Pima & Polo Tencel",
      },
      {
        label: "Sơ mi Linen & Oxford",
        href: "/products?category=linen-tailoring",
        categoryKey: "linen-tailoring",
        desc: "100% European Linen 185 GSM & Royal Oxford",
      },
      {
        label: "Áo nỉ & Hoodie",
        href: "/products?category=sweat-hoodie",
        categoryKey: "sweat-hoodie",
        desc: "French Terry 380 GSM & Heavyweight Hoodie 420 GSM",
      },
      {
        label: "Quần Kaki & Quần Âu",
        href: "/products?category=pants-bottoms",
        categoryKey: "pants-bottoms",
        desc: "Chino cạp chun ẩn & Trousers xếp ly relaxed",
      },
      {
        label: "Đồ len & Áo khoác",
        href: "/products?category=wool-knitwear",
        categoryKey: "wool-knitwear",
        desc: "Merino Wool 19.5 Micron & Trench Coat DWR",
      },
    ],
  },
  {
    type: "dropdown",
    id: "lifestyle",
    label: "Phụ kiện & Đời sống",
    children: [
      {
        label: "Đồ da nguyên tấm Ý",
        href: "/products?category=leather-goods",
        categoryKey: "leather-goods",
        desc: "Ví da bò Full-grain & Túi công sở laptop",
      },
      {
        label: "Túi Canvas 16oz",
        href: "/products?category=canvas-accessories",
        categoryKey: "canvas-accessories",
        desc: "Vải bố hạng nặng quai da bò mộc Nam Định",
      },
      {
        label: "Gốm sứ Bát Tràng",
        href: "/products?category=ceramics-home",
        categoryKey: "ceramics-home",
        desc: "Bộ cốc men lì nung 1.280°C chuẩn an toàn LFGB",
      },
    ],
  },
  {
    type: "link",
    label: "Cá nhân hóa",
    href: "/#studio-theu-ten",
    special: "personalize",
  },
  {
    type: "link",
    label: "Doanh nghiệp",
    href: "/b2b",
    routePrefix: "/b2b",
  },
  {
    type: "dropdown",
    id: "pages",
    label: "Về UNLO",
    children: [
      {
        label: "Câu chuyện thương hiệu",
        href: "/pages/about-us",
        desc: "Triết lý 'Giá trị không cần gọi tên' & Hành trình M2C",
        badge: "Câu chuyện",
      },
      {
        label: "Giá trị cốt lõi & Sứ mệnh",
        href: "/pages/about-us#values",
        desc: "Chất lượng, Minh bạch & Kiến tạo giá trị từ sự tử tế",
      },
      {
        label: "Minh bạch giá thành",
        href: "/pages/about-us#price-chart",
        desc: "Biểu đồ so sánh giá mục tiêu UNLO vs Hàng trôi nổi & Bán lẻ",
      },
      {
        label: "Hồ sơ 4 nhà máy đối tác",
        href: "/factories",
        desc: "Khám phá các xưởng OEM Tier-1 tại Hưng Yên, Bắc Ninh, Bình Dương",
        badge: "4 Xưởng",
      },
      {
        label: "Nghệ nhân & Thợ may xưởng",
        href: "/pages/our-makers",
        desc: "Tôn vinh đôi bàn tay lành nghề và làng nghề truyền thống",
      },
      {
        label: "Tin tức & Nhật ký xưởng",
        href: "/pages/news",
        desc: "Cập nhật tiến độ chuyền may và kiến thức chọn vải cơ bản",
      },
      {
        label: "Câu hỏi thường gặp",
        href: "/pages/faq",
        desc: "Giải đáp về quy trình đặt hàng, kiểm định và tự đổi trả 30 ngày",
      },
      {
        label: "Chính sách vận chuyển & Giao nhận",
        href: "/pages/information",
        desc: "Phạm vi giao hàng 63 tỉnh thành, phí ship và bảo mật thông tin",
      },
      {
        label: "Cổng tự đổi trả trong 30 ngày",
        href: "/returns",
        desc: "Chính sách bảo hành và đổi trả miễn phí tận nơi",
      },
    ],
  },
  {
    type: "link",
    id: "contact",
    label: "Liên hệ",
    href: "/pages/contact-us",
    routePrefix: "/pages/contact-us",
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

const PROMO_MESSAGES = [
  {
    id: "black-friday",
    content: (
      <span className="inline-flex items-center gap-1.5 sm:gap-2">
        <span className="text-[#9EA1D2] font-serif not-italic">✦</span>
        <Link
          href="/#black-friday"
          className="underline underline-offset-4 hover:text-white transition-colors"
        >
          Black Friday 27.11 · Giảm đến 50%
        </Link>
      </span>
    ),
  },
  {
    id: "free-shipping",
    content: (
      <span className="inline-flex items-center gap-1.5 sm:gap-2">
        <span className="text-[#9EA1D2] font-serif not-italic">✦</span>
        <span>Miễn phí giao hàng cho kiện từ 499.000đ</span>
      </span>
    ),
  },
  {
    id: "volume-discount",
    content: (
      <span className="inline-flex items-center gap-1.5 sm:gap-2">
        <span className="text-[#9EA1D2] font-serif not-italic">✦</span>
        <span>Giá xưởng giảm theo số lượng từ 10 sản phẩm</span>
      </span>
    ),
  },
];

const SEASONS_NAV = [
  { id: "xuan", label: "Xuân", idx: 0 },
  { id: "ha", label: "Hạ", idx: 1 },
  { id: "thu", label: "Thu", idx: 2 },
  { id: "dong", label: "Đông", idx: 3 },
];

export default function NullHeader({
  overlay = false,
  opts2 = false,
  showSeasonNav = false,
  currentSeasonIdx = 3,
  onSelectSeason,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useContext(AppContext) || {};
  const { cartCount, isCartOpen, setIsCartOpen } = useCart() || {};
  const { wishlistCount } = useWishlist() || {};

  const [scrolled, setScrolled] = useState(false);
  const [promoIdx, setPromoIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchString, setSearchString] = useState("");
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [openNavDropdown, setOpenNavDropdown] = useState(null);
  const [currentLang, setCurrentLang] = useState("vi");

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem("unlo_language");
        if (saved && saved !== "vi") setCurrentLang(saved);
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    const next = currentLang === "vi" ? "en" : "vi";
    setCurrentLang(next);
    try {
      localStorage.setItem("unlo_language", next);
    } catch {}
  };

  const headerRef = useRef(null);
  const accountRef = useRef(null);
  const searchInputRef = useRef(null);
  const navLeaveTimeoutRef = useRef(null);
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const prevActiveElementRef = useRef(null);

  // Measure single-row toolbar height and export --header-h to document.documentElement
  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof window === "undefined") return;

    const updateHeight = () => {
      const h = el.offsetHeight;
      if (h > 0) {
        document.documentElement.style.setProperty("--header-h", `${h}px`);
      }
    };

    updateHeight();
    const ro = new ResizeObserver(() => updateHeight());
    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, []);

  // Sync scroll state (>24px) with passive listener
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Promo message rotation for mobile/tablet (<1024px) every 4 seconds, respects prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setPromoIdx((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Transparent overlay across all viewports when overlay prop is enabled, scrollY <= 24px and drawer/search closed
  const isTransparent = Boolean(
    overlay &&
    !scrolled &&
    !mobileOpen &&
    !searchOpen
  );

  // Manage mobile drawer: scroll lock, auto-close at >=1024px, Escape, and focus restoration
  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    prevActiveElementRef.current = document.activeElement;
    const menuBtn = menuButtonRef.current;

    const focusTimer = setTimeout(() => {
      if (drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          focusables[0].focus();
        } else {
          drawerRef.current.focus();
        }
      }
    }, 40);

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow || "";
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);

      if (menuBtn?.focus) {
        menuBtn.focus();
      } else if (prevActiveElementRef.current?.focus) {
        prevActiveElementRef.current.focus();
      }
    };
  }, [mobileOpen]);

  const handleDrawerKeyDown = (e) => {
    if (e.key === "Tab") {
      if (!drawerRef.current) return;
      const focusables = drawerRef.current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

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
    if (openNavDropdown) setOpenNavDropdown(null);
  }


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

  const handleNavMouseEnter = (id) => {
    if (navLeaveTimeoutRef.current) clearTimeout(navLeaveTimeoutRef.current);
    setOpenNavDropdown(id);
  };

  const handleNavMouseLeave = () => {
    navLeaveTimeoutRef.current = setTimeout(() => {
      setOpenNavDropdown(null);
    }, 180);
  };

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
        return pathname === "/products" && !searchString.includes("category=") && !searchString.includes("sort=");
      }
      return pathname === "/products" && searchString.includes(`category=${item.categoryKey}`);
    }
    if (item.sortKey) {
      return pathname === "/products" && searchString.includes(`sort=${item.sortKey}`);
    }
    if (item.keywordKey) {
      return pathname === "/products" && searchString.includes(`keyword=${item.keywordKey}`);
    }
    if (item.routePrefix) {
      return pathname?.startsWith(item.routePrefix);
    }
    return pathname === item.href;
  };

  const isGroupActive = (group) => {
    if (group.type === "link") return isItemActive(group);
    if (group.children) {
      return group.children.some((child) => isItemActive(child));
    }
    return false;
  };

  const isStaff = user?.role === "admin" || user?.role === "merchant";

  return (
    <>
      {/* ================================================================
          1. TOP PROMO BAR (.promo)
          ================================================================ */}
      <div className="bg-[#15095D] text-[#E8E9FA] text-[11px] sm:text-xs tracking-[0.14em] uppercase font-medium border-b border-[#1F0C85]">
        {/* Desktop (lg:): Hiển thị đầy đủ 3 thông điệp */}
        <div className="hidden lg:flex max-w-[1760px] mx-auto px-4 items-center justify-center gap-6 py-2.5 whitespace-nowrap overflow-hidden text-center">
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

          <span className="inline-flex items-center gap-2">
            <span className="text-[#9EA1D2] font-serif not-italic">✦</span>
            <span>Giá xưởng giảm theo số lượng từ 10 sản phẩm</span>
          </span>
        </div>

        {/* Mobile & Tablet (<1024px): Luân phiên 1 thông điệp mỗi 4s, không cắt chữ */}
        <div className="lg:hidden px-3 py-2 flex items-center justify-center min-h-[36px] text-center">
          <div
            key={promoIdx}
            className="animate-in fade-in duration-300 px-2 line-clamp-2 leading-tight"
          >
            {PROMO_MESSAGES[promoIdx]?.content}
          </div>
        </div>
      </div>

      {/* ================================================================
          2. DUAL-ROW HEADER (Quince 2-Row Layout + Hierarchical Subnav)
          ================================================================ */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isTransparent
            ? "bg-transparent border-transparent shadow-none"
            : scrolled
            ? "bg-white border-b border-[#BBC2DD] shadow-[0_4px_24px_rgba(21,9,93,0.06)]"
            : "bg-white border-b border-[#DDE0EC]"
        }`}
      >
        {/* Subtle dark gradient overlay over photo/video across all screen sizes when transparent */}
        {isTransparent && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/75 via-black/35 to-transparent pointer-events-none -z-10"
          />
        )}

        {/* ROW 1: Main Brand Bar */}
        <div
          className={`relative max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[58px] sm:min-h-[64px] lg:min-h-[70px] py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 transition-colors ${
            isTransparent
              ? "border-b border-white/15"
              : "border-b border-[#F0F2F7]"
          }`}
        >
          {/* Left: Menu Mobile dưới 1024px; Ở giao diện >= 1024px hoàn toàn là khoảng trắng theo yêu cầu */}
          <div className="shrink-0 w-9 lg:w-12 flex items-center">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Mở công cụ và danh mục"
              aria-expanded={mobileOpen}
              aria-controls="site-menu-drawer"
              className={`lg:hidden w-8 h-8 sm:w-9 sm:h-9 -ml-1 rounded-full grid place-items-center transition-colors focus:outline-none focus-visible:ring-2 cursor-pointer ${
                isTransparent
                  ? "text-white hover:bg-white/15 focus-visible:ring-white"
                  : "text-[#15095D] hover:bg-[#F4F5FB] focus-visible:ring-[#15095D]"
              }`}
            >
              <Menu
                className={`w-5 h-5 ${isTransparent ? "text-white" : "text-[#15095D]"}`}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Center: Logo UNLO + PHẦN XUÂN HẠ THU ĐÔNG PHÍA DƯỚI LOGO (Theo Opts 2 trong DOCX) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15095D] rounded-lg py-0.5"
            >
              <img
                src="/assets/logo/unlo-header.png"
                alt="UNLO — Brandless M2C"
                className={`h-6 sm:h-7 lg:h-8.5 w-auto object-contain transition-transform duration-200 group-hover:scale-105 ${
                  isTransparent ? "brightness-0 invert" : ""
                }`}
              />
            </Link>

            {/* Dải 4 mùa: Xuân - Hạ - Thu - Đông phía dưới logo UNLO */}
            {showSeasonNav && (
              <nav
                aria-label="Chọn bộ sưu tập 4 mùa"
                className="flex items-center gap-2.5 sm:gap-4 lg:gap-6 pt-0.5 select-none"
              >
                {SEASONS_NAV.map((s) => {
                  const isActive = currentSeasonIdx === s.idx;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => onSelectSeason?.(s.idx)}
                      className={`relative py-0.5 text-[10px] sm:text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.16em] transition-all cursor-pointer ${
                        isActive
                          ? isTransparent
                            ? "text-white drop-shadow-md after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white after:rounded-full font-extrabold"
                            : "text-[#15095D] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#15095D] after:rounded-full font-extrabold"
                          : isTransparent
                            ? "text-white/65 hover:text-white"
                            : "text-[#625FBC] hover:text-[#15095D]"
                      }`}
                    >
                      <span>{s.label}</span>
                    </button>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right: Language switch (ENG/VN) + Tìm kiếm + Tài khoản + Wishlist + Giỏ hàng */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 shrink-0 ml-auto">
            {/* 1. Chuyển đổi ngôn ngữ VN -> ENG (Opts 1) */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={`Chuyển ngôn ngữ sang ${currentLang === "vi" ? "English" : "Tiếng Việt"}`}
              title={currentLang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              className={`inline-flex items-center justify-center h-8 px-2.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer border ${
                isTransparent
                  ? "border-white/30 text-white hover:bg-white/15"
                  : "border-[#DDE0EC] text-[#15095D] hover:bg-[#F4F5FB]"
              }`}
            >
              <span>{currentLang === "vi" ? "VN" : "ENG"}</span>
            </button>

            {/* 2. Search Icon Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full grid place-items-center transition-colors cursor-pointer ${
                isTransparent
                  ? "text-white hover:bg-white/15"
                  : "text-[#15095D] hover:bg-[#F4F5FB]"
              }`}
            >
              <Search
                className={`w-4 h-4 sm:w-5 sm:h-5 ${isTransparent ? "text-white" : "text-[#15095D]"}`}
                aria-hidden="true"
              />
            </button>

            {/* 3. Đăng nhập / Account Dropdown (Hiện từ tablet md: trở lên, trên mobile đã có thanh Tab đáy) */}
            <div ref={accountRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => (user ? setAccountOpen((v) => !v) : router.push("/login"))}
                aria-label="Tài khoản và đơn hàng"
                aria-expanded={accountOpen}
                className={`flex items-center gap-1.5 py-1.5 px-2 sm:px-2.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  isTransparent
                    ? "text-white hover:bg-white/15"
                    : "text-[#15095D] hover:text-[#32259B] hover:bg-[#F4F5FB]"
                }`}
              >
                <User
                  className={`w-[18px] h-[18px] ${
                    isTransparent ? "text-white" : "text-[#15095D]"
                  }`}
                />
                <span className="hidden sm:inline">
                  {user ? (user.name ? user.name.split(" ").slice(-1)[0] : "Tài khoản") : "Đăng nhập"}
                </span>
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
                        href="/profile"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#15095D] hover:bg-[#F4F5FB]"
                      >
                        <User className="w-4 h-4 text-[#443EB1]" />
                        Hồ sơ cá nhân
                      </Link>
                      <Link
                        href="/profile/orders"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#15095D] hover:bg-[#F4F5FB]"
                      >
                        <RotateCcw className="w-4 h-4 text-[#443EB1]" />
                        Thông tin đơn hàng &amp; Tra cứu
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

            {/* 4. Wish-list (Hiện từ tablet md: trở lên, trên mobile đã có thanh Tab đáy) */}
            <Link
              href="/wishlist"
              aria-label="Danh sách yêu thích"
              className={`relative hidden md:grid w-8 h-8 sm:w-9 sm:h-9 rounded-full place-items-center transition-colors ${
                isTransparent
                  ? "text-white hover:bg-white/15"
                  : "text-[#15095D] hover:bg-[#F4F5FB]"
              }`}
            >
              <Heart
                className={`w-[19px] h-[19px] stroke-[1.6] ${
                  isTransparent ? "stroke-white" : ""
                }`}
                aria-hidden="true"
              />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#15095D] text-white text-[10px] font-bold grid place-items-center leading-none tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* 5. Rỏ hàng / Giỏ hàng (Hiện từ tablet md: trở lên, trên mobile đã có thanh Tab đáy) */}
            <button
              type="button"
              onClick={() => setIsCartOpen?.(true)}
              aria-label={`Giỏ hàng (${cartCount || 0} sản phẩm)`}
              className={`relative hidden md:grid w-8 h-8 sm:w-9 sm:h-9 rounded-full place-items-center transition-colors cursor-pointer ${
                isTransparent
                  ? "text-white hover:bg-white/15"
                  : "text-[#15095D] hover:bg-[#F4F5FB]"
              }`}
            >
              <ShoppingBag
                className={`w-[19px] h-[19px] stroke-[1.6] ${
                  isTransparent ? "stroke-white" : ""
                }`}
                aria-hidden="true"
              />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#EB6D48] text-white text-[10px] font-bold grid place-items-center leading-none tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ROW 2: Hierarchical Category & Search Bar (Thanh nav_bar chính trên Desktop) */}
        <div
          className={`hidden lg:block max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-2 overflow-visible transition-colors ${
            isTransparent
              ? "border-t border-white/10"
              : "border-t border-[#F0F2F7]"
          }`}
          onMouseLeave={handleNavMouseLeave}
        >
          <div className="flex items-center justify-between gap-4">
            <nav
              aria-label="Danh mục chính UNLO"
              className="flex items-center gap-3.5 xl:gap-7 text-[12.5px] xl:text-[13px] font-medium shrink-0"
            >
            {NAV_GROUPS.map((group) => {
              if (group.type === "link") {
                const active = isItemActive(group);
                return (
                  <Link
                    key={group.label}
                    href={group.href}
                    className={`relative py-1 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      active
                        ? isTransparent
                          ? "text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white"
                          : "text-[#15095D] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#15095D]"
                        : isTransparent
                        ? "text-white/90 hover:text-white"
                        : "text-[#2B2D38] hover:text-[#15095D]"
                    }`}
                  >
                    {group.special === "personalize" && (
                      <Sparkles className={`w-3.5 h-3.5 ${isTransparent ? "text-white" : "text-[#443EB1]"}`} />
                    )}
                    <span>{group.label}</span>
                  </Link>
                );
              }

              // Dropdown Group (Parent containing children)
              const isGroupOpen = openNavDropdown === group.id;
              const groupActive = isGroupActive(group);

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => handleNavMouseEnter(group.id)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenNavDropdown((cur) => (cur === group.id ? null : group.id))
                    }
                    className={`relative py-1 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                      groupActive || isGroupOpen
                        ? isTransparent
                          ? "text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white"
                          : "text-[#15095D] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#15095D]"
                        : isTransparent
                        ? "text-white/90 hover:text-white"
                        : "text-[#2B2D38] hover:text-[#15095D]"
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isTransparent
                          ? "text-white/70"
                          : isGroupOpen
                          ? "rotate-180 text-[#15095D]"
                          : "text-[#6B7280]"
                      } ${isGroupOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu Popover */}
                  {isGroupOpen && (
                    <div
                      className={`absolute mt-2 bg-white border border-[#DCE0E7] rounded-2xl shadow-[0_16px_40px_rgba(21,9,93,0.12)] p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                        group.id === "pages"
                          ? "right-0 min-w-[300px] sm:min-w-[560px]"
                          : "left-0 min-w-[280px] sm:min-w-[320px]"
                      }`}
                      onMouseEnter={() => handleNavMouseEnter(group.id)}
                    >
                      <div
                        className={
                          group.children.length > 6
                            ? "grid grid-cols-1 sm:grid-cols-2 gap-1"
                            : "space-y-1"
                        }
                      >
                        {group.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setOpenNavDropdown(null)}
                            className="flex flex-col p-2.5 rounded-xl hover:bg-[#F4F5FB] transition-colors group/item"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-[#15095D] group-hover/item:text-[#32259B]">
                                {child.label}
                              </span>
                              {child.badge && (
                                <span className="px-1.5 py-0.5 rounded-full bg-[#EB6D48] text-white text-[9px] font-bold uppercase tracking-wider">
                                  {child.badge}
                                </span>
                              )}
                            </div>
                            {child.desc && (
                              <span className="text-[11px] text-[#5E607E] line-clamp-1 mt-0.5">
                                {child.desc}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Search Input with Coral Search Button (Tầng 2 bên phải theo Noam) */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm sản phẩm, xưởng..."
              aria-label="Tìm kiếm sản phẩm, chất liệu, xưởng"
              className={`w-40 lg:w-48 xl:w-72 h-[34px] pl-3.5 pr-9 text-xs rounded-full outline-none transition-all ${
                isTransparent
                  ? "bg-white/15 border border-white/25 text-white placeholder:text-white/70 focus:border-white focus:bg-white/25"
                  : "bg-[#F4F5F7] border border-[#E1E4EA] text-[#15095D] placeholder:text-[#8C93A8] focus:border-[#15095D] focus:bg-white"
              }`}
            />
            <button
              type="submit"
              aria-label="Tìm kiếm"
              className="absolute right-1 w-[26px] h-[26px] rounded-full bg-[#EB6D48] hover:bg-[#D95F3B] text-white grid place-items-center transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
      </header>

      {/* ================================================================
          3. LIVE SEARCH OVERLAY (.searchbox)
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
                className="relative flex items-center border-b-2 border-[#15095D] pb-3"
              >
                <Search className="w-5 h-5 text-[#625FBC] mr-3 shrink-0" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm sản phẩm, chất liệu vải, xưởng sản xuất..."
                  className="w-full font-serif text-lg sm:text-2xl text-[#15095D] placeholder:text-[#8D8DC7] outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Đóng tìm kiếm"
                  className="w-8 h-8 rounded-full grid place-items-center text-[#4E567A] hover:bg-[#EFF2F9]"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>

              {/* Suggestions */}
              <div className="flex items-center gap-2 pt-3 overflow-x-auto no-scrollbar">
                <span className="text-xs text-[#8D8DC7] shrink-0 font-medium">Gợi ý:</span>
                {SEARCH_SUGGESTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      setSearchOpen(false);
                      router.push(`/products?keyword=${encodeURIComponent(tag)}`);
                    }}
                    className="text-xs px-3 py-1 rounded-full bg-[#EFF2F9] text-[#15095D] hover:bg-[#15095D] hover:text-[#FCFDF1] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Instant Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[#EFF2F9]">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#8D8DC7] font-bold mb-3">
                    {searchQuery ? "Kết quả phù hợp" : "Sản phẩm xưởng nổi bật"}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {searchResults.map((p) => (
                      <Link
                        key={p._id}
                        href={`/products/${p.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="group flex flex-col gap-1.5 p-2 rounded-2xl hover:bg-[#F6F7FC] transition-colors"
                      >
                        <div className="aspect-square rounded-xl bg-[#EFF2F9] overflow-hidden border border-[#DCE0E7]">
                          <img
                            src={p.images?.[0]?.url || "/assets/img/p-tee-250.jpg"}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-xs font-semibold text-[#15095D] line-clamp-1 group-hover:text-[#32259B]">
                          {p.name}
                        </p>
                        <p className="text-xs font-bold text-[#15095D]">
                          {formatVnd(p.price)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================
          4. MENU ẨN / SIDEBAR TOOL (CHO CẢ DESKTOP & MOBILE THEO OPTS 2)
          ================================================================ */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu chính và công cụ UNLO"
          className="fixed inset-0 z-70 bg-[#15095D]/35 backdrop-blur-[3px]"
          onClick={() => setMobileOpen(false)}
        >
          <nav
            ref={drawerRef}
            id="site-menu-drawer"
            aria-label="Menu chính"
            tabIndex={-1}
            onKeyDown={handleDrawerKeyDown}
            className="fixed top-0 bottom-0 left-0 w-[min(380px,88vw)] md:w-[min(440px,88vw)] z-71 bg-white p-5 sm:p-6 overflow-y-auto flex flex-col gap-3.5 shadow-2xl animate-in slide-in-from-left duration-200 motion-reduce:transition-none motion-reduce:animate-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE0EC]">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                <img
                  src="/assets/logo/unlo-header.png"
                  alt="UNLO"
                  className="h-[28px] w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Đóng menu"
                className="w-9 h-9 rounded-full grid place-items-center text-[#15095D] hover:bg-[#F4F5FB] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-[#15095D]" aria-hidden="true" />
              </button>
            </div>

            {/* Quick Search inside Drawer */}
            <form
              onSubmit={(e) => {
                handleSearchSubmit(e);
                setMobileOpen(false);
              }}
              className="relative flex items-center my-0.5"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm, xưởng..."
                aria-label="Tìm kiếm trong menu"
                className="w-full h-10 pl-3.5 pr-10 text-xs rounded-full bg-[#F4F5F7] border border-[#E1E4EA] text-[#15095D] placeholder:text-[#8C93A8] outline-none focus:border-[#15095D] focus:bg-white transition-all"
              />
              <button
                type="submit"
                aria-label="Tìm kiếm"
                className="absolute right-1 w-8 h-8 rounded-full bg-[#EB6D48] hover:bg-[#D95F3B] text-white grid place-items-center transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </form>

            {/* Language Switcher in Drawer (Opts 1: VN -> ENG thống nhất) */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#F6F7FC] rounded-2xl border border-[#E9ECF5]">
              <span className="text-xs font-semibold text-[#15095D]">Ngôn ngữ:</span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-[#DDE0EC]">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLang("vi");
                    try { localStorage.setItem("unlo_language", "vi"); } catch {}
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    currentLang === "vi"
                      ? "bg-[#15095D] text-white shadow-xs"
                      : "text-[#5E607E] hover:text-[#15095D]"
                  }`}
                >
                  Tiếng Việt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLang("en");
                    try { localStorage.setItem("unlo_language", "en"); } catch {}
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    currentLang === "en"
                      ? "bg-[#15095D] text-white shadow-xs"
                      : "text-[#5E607E] hover:text-[#15095D]"
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Quick Utilities in Drawer: Wishlist & Cart */}
            <div className="grid grid-cols-2 gap-2 py-0.5">
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#F4F5FB] hover:bg-[#EBEFFA] text-xs font-semibold text-[#15095D] transition-colors"
              >
                <Heart className="w-4 h-4 text-[#15095D]" />
                <span>Yêu thích ({wishlistCount || 0})</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setIsCartOpen?.(true);
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#F4F5FB] hover:bg-[#EBEFFA] text-xs font-semibold text-[#15095D] transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#15095D]" />
                <span>Giỏ hàng ({cartCount || 0})</span>
              </button>
            </div>

            {/* Hierarchical Accordions for Mobile */}
            <div className="flex flex-col divide-y divide-[#EFF2F9]">
              {NAV_GROUPS.map((group) => {
                if (group.type === "link") {
                  return (
                    <Link
                      key={group.label}
                      href={group.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 px-1 text-sm font-medium text-[#1A1838] hover:text-[#15095D] flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        {group.special === "personalize" && (
                          <Sparkles className="w-4 h-4 text-[#443EB1]" />
                        )}
                        {group.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#BBC2DD]" />
                    </Link>
                  );
                }

                const isOpen = mobileAccordion === group.id;
                return (
                  <div key={group.id} className="py-2">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileAccordion((cur) => (cur === group.id ? null : group.id))
                      }
                      className="w-full py-2 px-1 text-sm font-semibold text-[#15095D] flex items-center justify-between cursor-pointer"
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#4E567A] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pl-3 pr-1 py-1 space-y-1.5 border-l-2 border-[#15095D]/20 ml-2 animate-in fade-in">
                        {group.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1.5 text-xs text-[#4E567A] hover:text-[#15095D] font-medium"
                          >
                            <div className="flex items-center justify-between">
                              <span>{child.label}</span>
                              {child.badge && (
                                <span className="px-1.5 py-0.5 rounded-full bg-[#EB6D48] text-white text-[9px] font-bold uppercase tracking-wider">
                                  {child.badge}
                                </span>
                              )}
                            </div>
                            {child.desc && (
                              <div className="text-[10px] text-[#8C93A8] line-clamp-1 mt-0.5">
                                {child.desc}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ================================================================
                KHỐI LIÊN HỆ & HỖ TRỢ KHÁCH HÀNG (YÊU CẦU ĐẶC BIỆT TRONG TOOL/SIDEBAR)
                ================================================================ */}
            <div className="my-2 p-4 rounded-2xl bg-[#FCFDF1] border border-[#DDE0EC] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15095D]">
                  <PhoneCall className="w-4 h-4 text-[#EB6D48]" />
                  <span>Liên Hệ &amp; Hỗ Trợ UNLO</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#1D7A5F]/10 text-[#1D7A5F] text-[10px] font-bold">
                  08:00 – 21:30
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#EFF2F9]">
                  <span className="text-[#5E607E]">Hotline xưởng:</span>
                  <a
                    href="tel:19006868"
                    className="font-bold text-[#15095D] hover:text-[#EB6D48] transition-colors"
                  >
                    1900 6868 (Miễn phí)
                  </a>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#EFF2F9]">
                  <span className="text-[#5E607E]">Zalo CSKH:</span>
                  <a
                    href="https://zalo.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#32259B] hover:underline"
                  >
                    UNLO Official Account
                  </a>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#EFF2F9]">
                  <span className="text-[#5E607E]">Email hỗ trợ:</span>
                  <a
                    href="mailto:hotro@unlo.vn"
                    className="font-semibold text-[#15095D] hover:underline"
                  >
                    hotro@unlo.vn
                  </a>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-[#5E607E]">Đặt số lượng / B2B:</span>
                  <a
                    href="mailto:b2b@unlo.vn"
                    className="font-semibold text-[#15095D] hover:underline"
                  >
                    b2b@unlo.vn
                  </a>
                </div>
              </div>

              <div className="pt-1 flex gap-2">
                <Link
                  href="/pages/about-us"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2 text-center rounded-xl bg-white border border-[#DDE0EC] text-[11px] font-semibold text-[#15095D] hover:bg-[#F4F5FB] transition-colors"
                >
                  Về chúng tôi
                </Link>
                <Link
                  href="/factories"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2 text-center rounded-xl bg-[#15095D] text-[11px] font-semibold text-white hover:bg-[#1F0C85] transition-colors"
                >
                  Hồ sơ 4 xưởng
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto pt-4 border-t border-[#DDE0EC] flex flex-col gap-2">
              <Link
                href="/returns"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-full border border-[#DDE0EC] text-xs font-semibold text-[#15095D] hover:bg-[#F4F5FB]"
              >
                Cổng Tự Đổi Trả 30 Ngày
              </Link>
              {user ? (
                <div className="space-y-1">
                  <div className="px-2 py-1 text-xs text-[#68708C] truncate text-center">
                    Xin chào, <strong className="text-[#15095D]">{user.name || user.email}</strong>
                  </div>
                  <Link
                    href="/profile/orders"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center py-2 text-xs font-semibold text-[#15095D] hover:bg-[#F4F5FB] rounded-lg"
                  >
                    Đơn hàng &amp; Tra cứu bảo hành
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      logout?.();
                    }}
                    className="w-full text-center py-2 text-xs font-semibold text-[#A52735] hover:bg-[#FDF2F3] rounded-lg cursor-pointer"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 rounded-full bg-[#15095D] text-white text-xs font-semibold hover:bg-[#1F0C85]"
                >
                  Đăng nhập / Đăng ký
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        setOpen={setIsCartOpen}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen?.(false)}
      />

      {/* ================================================================
          BOTTOM TAB BAR DÀNH CHO THIẾT BỊ DI ĐỘNG (<1024px)
          Giải phóng không gian Header, giải quyết triệt để va chạm 380px - 414px
          ================================================================ */}
      <NullMobileBottomNav
        onOpenMenu={() => setMobileOpen(true)}
        onOpenCart={() => setIsCartOpen?.(true)}
      />
    </>
  );
}
