"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Users,
  Clock,
  ShieldCheck,
  Share2,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import TransparencyCostChart from "@/components/null/TransparencyCostChart";
import { useCart } from "@/app/context/CartContext";
import { nullCommerceService, formatVnd } from "@/app/services/api/nullCommerceService";

const STAGES = [
  { id: "active", label: "Gom đơn MOQ" },
  { id: "moq_reached", label: "Đạt MOQ" },
  { id: "fabric_sourcing", label: "Dệt vải" },
  { id: "sewing", label: "Cắt may OEM" },
  { id: "qc_checking", label: "Kiểm định QC" },
  { id: "shipping", label: "Giao hàng" },
];

export default function GroupBuyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart() || {};
  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await nullCommerceService.getCampaignDetail(params?.slug);
        if (active && res?.data) {
          setCamp(res.data);
          setSelectedVariantId(res.data.variants?.[0]?._id || null);
        }
      } catch {
        if (active) setCamp(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [params?.slug]);

  const variants = useMemo(() => camp?.variants || [], [camp]);
  const activeVariant = useMemo(
    () => variants.find((v) => v._id === selectedVariantId) || null,
    [variants, selectedVariantId],
  );

  const handleJoin = () => {
    if (!camp?.productId) return;
    if (variants.length > 0 && !activeVariant) {
      toast.error("Vui lòng chọn màu sắc và kích cỡ");
      return;
    }
    const product = camp.productId;
    addToCart?.(
      {
        ...product,
        _id: product._id,
        id: product._id,
        productId: product._id,
        itemType: "product",
        campaignId: camp._id,
        price: camp.currentUnitPrice,
        image: camp.coverImage || product.images?.[0]?.url,
        ...(activeVariant
          ? {
              variantId: activeVariant._id,
              variantSummary: {
                sku: activeVariant.sku,
                colorName: activeVariant.colorName,
                colorHex: activeVariant.colorHex,
                size: activeVariant.size,
              },
              name: `[Gom đơn] ${product.name} — ${activeVariant.colorName} / ${activeVariant.size}`,
            }
          : { name: `[Gom đơn] ${product.name}` }),
      },
      quantity,
    );
    toast.success("Đã thêm suất gom đơn vào túi đồ!");
    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <NullHeader />
        <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 py-16">
          <div className="h-96 rounded-3xl bg-secondary animate-pulse" />
        </main>
        <NullFooter />
      </div>
    );
  }

  if (!camp) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <NullHeader />
        <main className="flex-1 max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
          <h1 className="font-serif text-3xl">Không tìm thấy chiến dịch gom đơn</h1>
          <Link href="/group-buy" className="inline-flex items-center justify-center min-h-11 px-6 rounded-full bg-foreground text-background text-sm font-medium">
            Quay lại danh sách
          </Link>
        </main>
        <NullFooter />
      </div>
    );
  }

  const stageIdx = STAGES.findIndex((s) => s.id === camp.status);

  return (
    <div className="min-h-screen flex flex-col bg-white text-foreground">
      <NullHeader />

      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-14">
        <nav className="tm-breadcrumb">
          <Link href="/">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link href="/group-buy">Gom đơn giá xưởng</Link>
          <ChevronRight size={14} />
          <span className="text-foreground">{camp.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-6 aspect-[4/5] rounded-3xl bg-secondary overflow-hidden">
            <img
              src={camp.coverImage || camp.productId?.images?.[0]?.url || "/assets/placeholder.png"}
              alt={camp.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2.5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#D95D24] text-white text-[11px] font-bold uppercase tracking-wider">
                {camp.type === "group_buy" ? "Group-Buy Mở Khóa Giá Xưởng" : "Pre-Order Lô Nhỏ"}
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold leading-tight text-[#111111]">{camp.title}</h1>
              <p className="text-sm sm:text-base text-[#6B665E] leading-relaxed">{camp.description}</p>
            </div>

            <div className="rounded-3xl bg-secondary/75 p-6 space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Giá hiện tại</p>
                  <p className="font-mono text-3xl font-bold tabular-nums">
                    {formatVnd(camp.currentUnitPrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold inline-flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> {camp.currentOrderedQty} / {camp.moqTarget} MOQ
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Còn lại {camp.remainingCap} suất trong lô
                  </p>
                </div>
              </div>

              <div className="h-2.5 rounded-full bg-white overflow-hidden">
                <div
                  className="h-full rounded-full bg-foreground origin-left transition-transform duration-300"
                  style={{ transform: `scaleX(${Math.min(1, (camp.moqPercent || 0) / 100)})` }}
                />
              </div>

              {camp.pricingTiers?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {camp.pricingTiers.map((tier, idx) => {
                    const unlocked = camp.currentOrderedQty >= tier.minQty;
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl ${
                          unlocked ? "bg-white border border-foreground/20" : "bg-white/50 opacity-65"
                        }`}
                      >
                        <p className="text-[11px] text-muted-foreground">
                          {tier.label || `Từ ${tier.minQty} áo`}
                        </p>
                        <p className="font-mono text-sm font-bold tabular-nums mt-0.5">
                          {formatVnd(tier.unitPrice)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-3 border-t border-border text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-foreground" />
                  Đóng gom: {new Date(camp.endAt).toLocaleDateString("vi-VN")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-success" />
                  Hoàn tiền 100% nếu không đủ MOQ
                </span>
              </div>
            </div>

            {variants.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Chọn Màu & Size cho suất đặt trước</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => {
                    const selected = v._id === activeVariant?._id;
                    return (
                      <button
                        key={v._id}
                        type="button"
                        onClick={() => setSelectedVariantId(v._id)}
                        className={`px-4 py-2.5 rounded-full border text-xs flex items-center gap-2 null-pressable ${
                          selected
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-white hover:border-foreground"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                          style={{ backgroundColor: v.colorHex }}
                        />
                        <span>
                          {v.colorName} · <strong>{v.size}</strong>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="tm-quantity">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                <output>{quantity}</output>
                <button type="button" onClick={() => setQuantity((q) => Math.min(20, q + 1))}>+</button>
              </div>
              <button
                type="button"
                disabled={!["active", "moq_reached"].includes(camp.status)}
                onClick={handleJoin}
                className="flex-1 min-w-[220px] min-h-[52px] px-6 null-pill-warm text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-45"
              >
                <ShoppingBag className="w-4 h-4" />
                Tham gia gom đơn — {formatVnd(camp.currentUnitPrice * quantity)}
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  toast.success("Đã sao chép link rủ bạn cùng mở khóa giá xưởng!");
                }}
                className="min-h-[52px] px-5 rounded-full border border-border hover:bg-secondary inline-flex items-center gap-1.5 text-sm font-medium null-pressable"
              >
                <Share2 className="w-4 h-4" /> Rủ bạn
              </button>
            </div>

            <div className="rounded-3xl border border-border bg-white p-5 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground">
                Lộ trình sản xuất minh bạch tại xưởng OEM
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {STAGES.map((st, idx) => {
                  const done = stageIdx >= idx;
                  return (
                    <div
                      key={st.id}
                      className={`p-2.5 rounded-2xl text-center text-xs ${
                        done
                          ? "bg-secondary font-medium text-foreground"
                          : "bg-secondary/35 text-muted-foreground opacity-60"
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 mx-auto mb-1 ${done ? "text-success" : ""}`} />
                      {st.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {camp.productId && <TransparencyCostChart product={camp.productId} />}
      </main>

      <NullFooter />
    </div>
  );
}
