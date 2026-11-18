"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Copy, Gift, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import { AppContext } from "@/app/context/AppContext";
import { nullCommerceService, formatVnd } from "@/app/services/api/nullCommerceService";

const TIER_LABELS = {
  member: "Thành viên NU:LL",
  stylist: "Stylist Partner",
  kol_partner: "KOL / Creator Affiliate",
};

export default function ReferralProfilePage() {
  const { user, isLoading } = useContext(AppContext) || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await nullCommerceService.getMyReferral();
        setData(res?.data || null);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, isLoading]);

  const profile = data?.profile;
  const commissions = data?.commissions || [];
  const shareUrl =
    typeof window !== "undefined" && profile?.code
      ? `${window.location.origin}/?ref=${profile.code}`
      : "";

  const copy = (text, msg) => {
    navigator.clipboard?.writeText(text);
    toast.success(msg);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-foreground">
      <NullHeader />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="rounded-[32px] bg-[#111111] text-white p-8 sm:p-12 space-y-2.5">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95D24]">
            CỘNG ĐỒNG & AFFILIATE · LAN TỎA TIÊU DÙNG BỀN VỮNG
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Giới Thiệu Bạn Bè & <em className="italic font-normal">KOL / Stylist</em>
          </h1>
          <p className="text-sm text-white/70 max-w-2xl">
            Chia sẻ liên kết cá nhân — bạn bè nhận ngay ưu đãi 5% đơn đầu, bạn nhận hoàn tiền / hoa hồng 8% (lên tới 15% cho đối tác Stylist & KOL) khi đơn hoàn tất.
          </p>
        </div>

        {!user && !isLoading ? (
          <div className="rounded-3xl bg-secondary/60 p-12 text-center space-y-4">
            <p className="font-serif text-2xl">Đăng nhập để nhận mã giới thiệu cá nhân</p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center min-h-11 px-7 null-pill-warm text-sm font-semibold"
            >
              Đăng nhập ngay
            </Link>
          </div>
        ) : loading ? (
          <div className="h-56 rounded-3xl bg-secondary animate-pulse" />
        ) : profile ? (
          <>
            <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-foreground text-background text-xs font-medium">
                  {TIER_LABELS[profile.tier] || profile.tier}
                </span>
                <h2 className="text-3xl font-mono font-bold tracking-[0.12em]">
                  {profile.code}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Hoa hồng của bạn: <strong className="text-foreground">{profile.commissionPercent}%</strong> · Ưu đãi cho bạn bè:{" "}
                  <strong className="text-foreground">{profile.refereeDiscountPercent}%</strong>
                </p>
              </div>
              <div className="space-y-2.5">
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={shareUrl}
                    className="flex-1 h-11 px-4 rounded-full border border-border bg-secondary/60 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => copy(shareUrl, "Đã sao chép liên kết giới thiệu!")}
                    className="px-5 h-11 rounded-full bg-foreground text-background text-xs font-semibold inline-flex items-center gap-1.5 null-pressable"
                  >
                    <Copy className="w-3.5 h-3.5" /> Sao chép
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => copy(profile.code, "Đã sao chép mã giới thiệu!")}
                  className="text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground pl-2"
                >
                  Chỉ sao chép mã {profile.code}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Lượt truy cập", value: profile.totalClicks, icon: Users },
                { label: "Đơn thành công", value: profile.totalOrders, icon: CheckCircle2 },
                { label: "Doanh số tạo ra", value: formatVnd(profile.totalRevenueGenerated), icon: TrendingUp },
                { label: "Hoa hồng tích lũy", value: formatVnd(profile.totalCommissionEarned), icon: Gift },
              ].map((st) => (
                <div key={st.label} className="rounded-3xl bg-secondary/65 p-5 space-y-2">
                  <st.icon className="w-4 h-4 text-muted-foreground" />
                  <p className="font-mono text-xl font-bold tabular-nums">{st.value}</p>
                  <p className="text-xs text-muted-foreground">{st.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-white p-6 space-y-4">
              <h3 className="text-sm font-semibold">Lịch sử ghi nhận hoa hồng</h3>
              {commissions.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  Chưa có đơn hàng phát sinh từ mã giới thiệu của bạn. Chia sẻ link để bắt đầu tích lũy!
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground">
                        <th className="py-2.5 pr-4">Mã đơn</th>
                        <th className="py-2.5 pr-4">Giá trị đơn</th>
                        <th className="py-2.5 pr-4">Tỷ lệ</th>
                        <th className="py-2.5 pr-4">Hoa hồng</th>
                        <th className="py-2.5">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissions.map((c) => (
                        <tr key={c._id} className="border-b border-border/60">
                          <td className="py-3 pr-4 font-mono">{c.orderCode}</td>
                          <td className="py-3 pr-4 font-mono tabular-nums">{formatVnd(c.orderAmount)}</td>
                          <td className="py-3 pr-4 font-mono">{c.commissionRate}%</td>
                          <td className="py-3 pr-4 font-mono font-semibold tabular-nums">
                            {formatVnd(c.commissionAmount)}
                          </td>
                          <td className="py-3 uppercase text-[11px]">{c.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : null}
      </main>

      <NullFooter />
    </div>
  );
}
