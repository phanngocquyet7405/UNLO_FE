"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";

export default function NullMobileBottomNav({ onOpenMenu, onOpenCart }) {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart() || {};
  const { wishlistCount } = useWishlist() || {};
  const { user } = useContext(AppContext) || {};

  const handleCartClick = (e) => {
    e.preventDefault();
    if (onOpenCart) onOpenCart();
    else if (setIsCartOpen) setIsCartOpen(true);
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    if (onOpenMenu) onOpenMenu();
  };

  const navItems = [
    {
      id: "home",
      label: "Trang chủ",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      id: "categories",
      label: "Danh mục",
      icon: LayoutGrid,
      onClick: handleMenuClick,
      isActive: pathname?.startsWith("/products") || pathname?.startsWith("/factories"),
    },
    {
      id: "wishlist",
      label: "Yêu thích",
      href: "/wishlist",
      icon: Heart,
      badge: wishlistCount,
      badgeColor: "bg-[#15095D]",
      isActive: pathname === "/wishlist",
    },
    {
      id: "cart",
      label: "Giỏ hàng",
      icon: ShoppingBag,
      onClick: handleCartClick,
      badge: cartCount,
      badgeColor: "bg-[#EB6D48]",
      isActive: false,
    },
    {
      id: "account",
      label: user ? (user.name ? user.name.split(" ").slice(-1)[0] : "Tài khoản") : "Tài khoản",
      href: "/profile",
      icon: User,
      isActive: pathname?.startsWith("/profile") || pathname === "/login",
    },
  ];

  return (
    <nav
      aria-label="Thanh điều hướng di động đáy"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E8EF] shadow-[0_-4px_24px_rgba(21,9,93,0.08)] select-none transition-all"
      style={{
        paddingBottom: "max(6px, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 h-[54px] px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="relative flex flex-col items-center justify-center gap-0.5 w-full h-full py-1 text-center transition-transform active:scale-90 touch-manipulation">
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    item.isActive ? "text-[#15095D] stroke-[2.2]" : "text-[#7A829D] stroke-[1.6]"
                  }`}
                  aria-hidden="true"
                />
                {Boolean(item.badge && item.badge > 0) && (
                  <span
                    className={`absolute -top-1 -right-2.5 min-w-[16px] h-[16px] px-1 rounded-full text-white text-[9px] font-bold flex items-center justify-center leading-none shadow-xs ${
                      item.badgeColor || "bg-[#15095D]"
                    }`}
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight leading-none truncate max-w-[64px] ${
                  item.isActive ? "font-bold text-[#15095D]" : "font-medium text-[#7A829D]"
                }`}
              >
                {item.label}
              </span>
              {item.isActive && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#15095D]" />
              )}
            </div>
          );

          if (item.onClick) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                aria-label={item.label}
                className="w-full h-full flex items-center justify-center cursor-pointer focus:outline-none"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-label={item.label}
              className="w-full h-full flex items-center justify-center focus:outline-none"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
