"use client";
/**
 * page.js — Trang hồ sơ cá nhân
 * Route: /profile
 *
 * Layout (Nav, Footer, Toaster, withAuth, padding) do layout.js xử lý.
 * Page này chỉ chịu trách nhiệm load data + render tab content.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight, ShoppingBag, Package, Sparkles, Gift, UserCircle } from "lucide-react";

import { AddressManager } from "../components/profile/AddressManager";
import { CartManager } from "../components/profile/CartManager";
import { ProfileInfo } from "../components/profile/ProfileInfo";
import { ProfileTabs } from "../components/profile/ProfileTabs";
import { CardContent, Card, CardHeader } from "@/components/ui/card";

import { userService } from "@/app/services/api/userService";
import {
  getCartByUserApi,
  updateCartItemApi,
  deleteFromCartApi,
} from "@/app/services/api/productServices";

import { getTokenUserId } from "@/app/middleware/tokenMiddleware";
import logger from "@/app/util/Logger";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ProfileSkeleton() {
  return (
    <Card className="border-border bg-card shadow-xs rounded-2xl">
      <CardHeader>
        <div className="h-6 w-48 animate-pulse rounded-lg bg-muted" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-12 w-full animate-pulse rounded-xl bg-muted" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-muted" />
        <div className="h-10 w-36 animate-pulse rounded-xl bg-muted" />
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [updatingAddress, setUpdatingAddress] = useState(false);
  const [updatingCart, setUpdatingCart] = useState(false);

  // ── Load user + cart ────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      logger.group("[ProfilePage] loadProfileAndCart START");
      try {
        const userId = getTokenUserId();
        logger.log("userId từ token:", userId);

        if (!userId) {
          logger.warn("userId null → không thể gọi API");
          toast.error("Không xác định được người dùng");
          return;
        }

        // 1. User profile
        const userRes = await userService.getMe();
        let userData = userRes.data?.data || userRes.data;

        // 2. Cart
        try {
          const cartRes = await getCartByUserApi(userId);
          const cartData = cartRes.data?.data;
          userData.cart =
            cartData?.items?.map((item) => ({
              productId: item.productId?._id || item.productId,
              productName: item.productId?.name || "Sản phẩm",
              price: item.productId?.price || 0,
              quantity: item.quantity,
              imageUrl: item.productId?.image || "/images/placeholder.png",
            })) ?? [];
        } catch (cartErr) {
          logger.warn("Lỗi cart API:", cartErr?.response || cartErr);
          userData.cart = [];
        }

        userData.addresses = userData.addresses || [];
        setUser(userData);
      } catch (err) {
        logger.error("Lỗi loadProfileAndCart:", err);
        toast.error("Không thể tải thông tin cá nhân");
      } finally {
        setLoading(false);
        logger.groupEnd();
      }
    })();
  }, []);

  // ── handleProfileSave ───────────────────────────────────────────────────────
  const handleProfileSave = async (payload) => {
    if (!user) return;
    const previous = user;
    const userId = user._id || user.id;

    const optimistic = {
      ...user,
      name: payload.name,
      phone: payload.phone || user.phone,
      avatar: payload.avatarUrl
        ? {
            url: payload.avatarUrl,
            public_id: user.avatar?.public_id || "local-preview",
          }
        : user.avatar,
    };
    setUser(optimistic);
    setSavingProfile(true);

    try {
      const updatePayload = {
        name: payload.name.trim(),
        ...(payload.phone?.trim() ? { phone: payload.phone.trim() } : {}),
      };
      const res = await userService.updateUser(userId, updatePayload);
      const updated = res.data?.data || res.data;
      setUser((prev) => ({
        ...prev,
        ...updated,
        avatar: optimistic.avatar,
      }));
      toast.success("Cập nhật hồ sơ thành công!");
    } catch (err) {
      logger.error("Lỗi cập nhật hồ sơ:", err?.response || err);
      setUser(previous);
      toast.error(err?.response?.data?.message || "Không thể cập nhật hồ sơ");
    } finally {
      setSavingProfile(false);
    }
  };

  // ── handleUpsertAddress ─────────────────────────────────────────────────────
  const handleUpsertAddress = async (address) => {
    if (!user) return;
    const previous = user;
    const userId = user._id || user.id;
    const addressId = address._id || address.id;

    const index = user.addresses.findIndex(
      (item) => (item._id || item.id) === addressId,
    );
    const nextAddresses =
      index >= 0
        ? user.addresses.map((item) =>
            (item._id || item.id) === addressId ? address : item,
          )
        : [address, ...user.addresses];

    setUser({ ...user, addresses: nextAddresses });
    setUpdatingAddress(true);

    try {
      let res;
      if (addressId && String(addressId).startsWith("addr-")) {
        const { id, _id, ...addressData } = address;
        res = await userService.addAddress(userId, addressData);
      } else {
        const { id, _id, __v, ...addressData } = address;
        res = await userService.editAddress(userId, addressId, addressData);
      }
      const updatedUser = res.data?.data || res.data;
      setUser((prev) => ({
        ...prev,
        addresses: updatedUser?.addresses || nextAddresses,
      }));
      toast.success("Đã lưu địa chỉ");
    } catch (err) {
      logger.error("Lỗi lưu địa chỉ:", err?.response || err);
      setUser(previous);
      toast.error("Không thể lưu địa chỉ");
    } finally {
      setUpdatingAddress(false);
    }
  };

  // ── handleDeleteAddress ─────────────────────────────────────────────────────
  const handleDeleteAddress = async (addressId) => {
    if (!user) return;
    const previous = user;
    const userId = user._id || user.id;
    const nextAddresses = user.addresses.filter(
      (item) => (item._id || item.id) !== addressId,
    );

    setUser({ ...user, addresses: nextAddresses });
    setUpdatingAddress(true);

    try {
      const res = await userService.deleteAddress(userId, addressId);
      const updatedUser = res.data?.data || res.data;
      setUser((prev) => ({
        ...prev,
        addresses: updatedUser?.addresses || nextAddresses,
      }));
      toast.success("Đã xóa địa chỉ");
    } catch (err) {
      logger.error("Lỗi xóa địa chỉ:", err?.response || err);
      setUser(previous);
      toast.error("Lỗi khi xóa địa chỉ");
    } finally {
      setUpdatingAddress(false);
    }
  };

  // ── handleChangeQuantity ────────────────────────────────────────────────────
  const handleChangeQuantity = async (productId, nextQuantity) => {
    if (!user || nextQuantity < 1) return;
    const previous = user;
    const userId = user._id || user.id;

    setUser({
      ...user,
      cart: user.cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: nextQuantity }
          : item,
      ),
    });
    setUpdatingCart(true);

    try {
      await updateCartItemApi(productId, {
        userId,
        productId,
        quantity: nextQuantity,
      });
    } catch (err) {
      logger.error("Lỗi cập nhật số lượng:", err?.response || err);
      setUser(previous);
      toast.error("Không thể cập nhật số lượng");
    } finally {
      setUpdatingCart(false);
    }
  };

  // ── handleRemoveItem ────────────────────────────────────────────────────────
  const handleRemoveItem = async (productId) => {
    if (!user) return;
    const previous = user;
    const userId = user._id || user.id;

    setUser({
      ...user,
      cart: user.cart.filter((item) => item.productId !== productId),
    });
    setUpdatingCart(true);

    try {
      await deleteFromCartApi(productId, { userId, productId });
      toast.success("Đã bỏ sản phẩm khỏi giỏ");
    } catch (err) {
      logger.error("Lỗi xóa sản phẩm:", err?.response || err);
      setUser(previous);
      toast.error("Lỗi khi xóa sản phẩm");
    } finally {
      setUpdatingCart(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-serif">
            Hồ sơ cá nhân
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Quản lý thông tin cá nhân, sổ địa chỉ giao hàng và giỏ hàng của bạn.
          </p>
        </div>
        <Link
          href="/profile/orders"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground transition-colors shadow-2xs self-start sm:self-auto"
        >
          <ShoppingBag size={14} className="text-primary" />
          <span>Đơn hàng của tôi</span>
          <ArrowRight size={13} className="text-muted-foreground" />
        </Link>
      </div>

      {/* Quick Account Hub Navigation Banner */}
      {user && !loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#15095D]/[0.03] border border-[#15095D]/10 rounded-2xl p-3 sm:p-4">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-border/60 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#15095D]/10 text-[#15095D] grid place-items-center shrink-0">
              <UserCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Tài khoản</p>
              <p className="text-xs sm:text-sm font-bold text-foreground truncate">{user.name || user.email}</p>
            </div>
          </div>

          <Link
            href="/profile/orders"
            className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-border/60 shadow-2xs hover:border-primary/50 transition-colors group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EB6D48]/10 text-[#EB6D48] grid place-items-center shrink-0 group-hover:scale-105 transition-transform">
              <Package className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Đơn hàng</p>
              <p className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Thông tin đơn hàng
              </p>
            </div>
          </Link>

          <Link
            href="/profile/my-subscriptions"
            className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-border/60 shadow-2xs hover:border-primary/50 transition-colors group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#32259B]/10 text-[#32259B] grid place-items-center shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Hội viên</p>
              <p className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Gói định kỳ M2C
              </p>
            </div>
          </Link>

          <Link
            href="/profile/referral"
            className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-border/60 shadow-2xs hover:border-primary/50 transition-colors group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1D7A5F]/10 text-[#1D7A5F] grid place-items-center shrink-0 group-hover:scale-105 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Ưu đãi</p>
              <p className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Giới thiệu bạn bè
              </p>
            </div>
          </Link>
        </div>
      )}

      {/* Content */}
      {loading || !user ? (
        <ProfileSkeleton />
      ) : (
        <ProfileTabs
          profileContent={
            <ProfileInfo
              name={user.name || ""}
              email={user.email || ""}
              phone={user.phone || ""}
              avatarUrl={user.avatar?.url || ""}
              onSave={handleProfileSave}
              saving={savingProfile}
            />
          }
          addressContent={
            <AddressManager
              addresses={user.addresses}
              onUpsertAddress={handleUpsertAddress}
              onDeleteAddress={handleDeleteAddress}
              loading={updatingAddress}
            />
          }
          cartContent={
            <CartManager
              cart={user.cart}
              loading={updatingCart}
              onChangeQuantity={handleChangeQuantity}
              onRemoveItem={handleRemoveItem}
            />
          }
        />
      )}
    </main>
  );
}
