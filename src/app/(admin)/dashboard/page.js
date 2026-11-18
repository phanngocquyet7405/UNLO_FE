"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Sparkles,
  Building2,
  AlertTriangle,
  Percent,
  RefreshCw,
} from "lucide-react";
import { nullCommerceService, formatVnd } from "@/app/services/api/nullCommerceService";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await nullCommerceService.adminGetUnitEconomics();
        setData(res?.data || null);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const kpis = data?.kpis || {};
  const ropAlerts = data?.ropAlerts || [];
  const skuPerformance = data?.skuPerformance || [];
  const campaignsSummary = data?.campaignsSummary || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="null-eyebrow">NU:LL HQ · Unit Economics & Vận hành tinh gọn</p>
          <h1 className="text-2xl font-serif font-normal mt-1">
            Bảng điều khiển Hiệu quả Kinh tế Đơn vị
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin-personalization"
            className="px-3.5 py-2 border border-border bg-card text-xs uppercase tracking-wider hover:border-foreground"
          >
            Hàng đợi thêu Monogram
          </Link>
          <Link
            href="/admin-campaigns"
            className="px-3.5 py-2 bg-primary text-primary-foreground text-xs uppercase tracking-wider hover:opacity-90"
          >
            Quản lý Group-Buy
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-secondary border border-border animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Primary Unit Economics KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-border bg-card p-5 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] uppercase tracking-[0.12em]">Tổng doanh thu</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="font-mono text-2xl font-bold tabular-nums">
                {formatVnd(kpis.totalRevenue)}
              </p>
              <p className="text-[11px] text-muted-foreground">
                B2C: {formatVnd(kpis.b2cRetailRevenue)} · Group-Buy: {formatVnd(kpis.groupBuyRevenue)}
              </p>
            </div>

            <div className="border border-border bg-card p-5 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] uppercase tracking-[0.12em]">AOV / Mục tiêu 450k</span>
                <ShoppingBag className="w-4 h-4" />
              </div>
              <p className="font-mono text-2xl font-bold tabular-nums">{formatVnd(kpis.aov)}</p>
              <p className="text-[11px] text-muted-foreground">
                {kpis.totalOrders || 0} đơn · Tỷ lệ đổi/trả: {kpis.returnRatePercent || 0}%
              </p>
            </div>

            <div className="border border-border bg-card p-5 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] uppercase tracking-[0.12em]">Lãi đóng góp (ước tính)</span>
                <Percent className="w-4 h-4" />
              </div>
              <p className="font-mono text-2xl font-bold tabular-nums">
                {formatVnd(kpis.estimatedContribution)}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Biên đóng góp ~{kpis.contributionMarginPercent ?? 38}% (sau 50% COGS + 12% phí)
              </p>
            </div>

            <div className="border border-border bg-card p-5 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] uppercase tracking-[0.12em]">Cá nhân hóa & B2B</span>
                <Building2 className="w-4 h-4" />
              </div>
              <p className="font-mono text-2xl font-bold tabular-nums">
                {formatVnd(kpis.b2bPipelineValue)}
              </p>
              <p className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Phí Monogram: {formatVnd(kpis.personalizationRevenue)} ({kpis.b2bQuoteCount || 0} RFQ B2B)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Low-Stock ROP Alerts */}
            <section className="lg:col-span-5 border border-border bg-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] inline-flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  Cảnh báo điểm đặt hàng lại (ROP)
                </h2>
                <span className="font-mono text-xs px-2 py-0.5 bg-secondary border border-border">
                  {ropAlerts.length} SKU
                </span>
              </div>
              {ropAlerts.length === 0 ? (
                <p className="text-xs text-muted-foreground py-6 text-center">
                  Mọi biến thể Size/Màu đều trên ngưỡng tồn kho ROP an toàn.
                </p>
              ) : (
                <div className="divide-y divide-border max-h-80 overflow-y-auto">
                  {ropAlerts.map((a) => (
                    <div key={a.variantId} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{a.productName}</p>
                        <p className="text-[11px] text-muted-foreground font-mono">
                          {a.sku} · {a.colorName} / Size {a.size}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-destructive-text">
                          Còn {a.stock}
                        </span>
                        <p className="text-[10px] text-muted-foreground">ROP ≤ {a.ropThreshold}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 14/21-day Sell-through by SKU */}
            <section className="lg:col-span-7 border border-border bg-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] inline-flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Tỷ lệ bán hết (Sell-Through 14 / 21 ngày theo SKU)
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border text-[10px] uppercase text-muted-foreground">
                      <th className="py-2 pr-3">Sản phẩm</th>
                      <th className="py-2 pr-3 text-right">Tồn</th>
                      <th className="py-2 pr-3 text-right">Bán 14N</th>
                      <th className="py-2 pr-3 text-right">ST 14N</th>
                      <th className="py-2 text-right">ST 21N</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skuPerformance.map((s) => (
                      <tr key={s.productId} className="border-b border-border/50">
                        <td className="py-2.5 pr-3">
                          <p className="font-medium">{s.name}</p>
                          <p className="text-[10px] font-mono text-muted-foreground">{s.sku}</p>
                        </td>
                        <td className="py-2.5 pr-3 text-right font-mono tabular-nums">{s.currentStock}</td>
                        <td className="py-2.5 pr-3 text-right font-mono tabular-nums">{s.sold14Days}</td>
                        <td className="py-2.5 pr-3 text-right font-mono font-semibold tabular-nums">
                          {s.sellThrough14Percent}%
                        </td>
                        <td className="py-2.5 text-right font-mono font-semibold tabular-nums">
                          {s.sellThrough21Percent}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Active Campaigns Snapshot */}
          {campaignsSummary.length > 0 && (
            <section className="border border-border bg-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em]">
                  Tiến độ MOQ các lô Group-Buy / Pre-Order
                </h2>
                <Link href="/admin-campaigns" className="text-xs underline underline-offset-4">
                  Quản lý chi tiết
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaignsSummary.map((c) => {
                  const pct = c.moqTarget
                    ? Math.min(100, Math.round((c.currentOrderedQty / c.moqTarget) * 100))
                    : 0;
                  return (
                    <div key={c._id} className="p-4 border border-border bg-secondary/30 space-y-2">
                      <div className="flex justify-between gap-2 text-xs">
                        <span className="font-medium truncate">{c.title}</span>
                        <span className="font-mono font-bold shrink-0">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary overflow-hidden">
                        <div className="h-full bg-foreground" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {c.currentOrderedQty} / {c.moqTarget} sp · Trạng thái: <strong>{c.status}</strong>
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
