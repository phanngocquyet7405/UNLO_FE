"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { nullCommerceService, formatVnd } from "@/app/services/api/nullCommerceService";

const STATUSES = [
  "submitted",
  "reviewing",
  "quoted",
  "deposit_pending",
  "in_production",
  "delivered",
  "completed",
  "rejected",
];

export default function AdminB2BPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await nullCommerceService.adminGetB2BQuotes();
      setQuotes(res?.data || []);
    } catch {
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateQuote = async (id, patch) => {
    try {
      await nullCommerceService.adminUpdateB2BQuote(id, patch);
      toast.success("Đã cập nhật hồ sơ báo giá B2B");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Lỗi cập nhật B2B");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <p className="null-eyebrow">NU:LL Corporate · Subtle Branding B2B</p>
        <h1 className="text-2xl font-serif font-normal mt-1">
          Quản lý Yêu cầu Báo giá & Hợp đồng B2B
        </h1>
      </div>

      {loading ? (
        <div className="h-48 bg-secondary animate-pulse border border-border" />
      ) : quotes.length === 0 ? (
        <div className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Chưa có yêu cầu báo giá doanh nghiệp nào.
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((q) => (
            <div key={q._id} className="border border-border bg-card p-5 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-sm">{q.quoteCode}</span>
                    <span className="px-2 py-0.5 bg-secondary border border-border uppercase">
                      {q.status}
                    </span>
                    <span className="text-muted-foreground">
                      Tổng SL: <strong>{q.totalEstimatedQty} sp</strong>
                    </span>
                  </div>
                  <p className="text-sm font-semibold">{q.companyName}</p>
                  <p className="text-muted-foreground">
                    Liên hệ: {q.contactName} · {q.contactEmail} · {q.contactPhone}
                    {q.taxCode ? ` · MST: ${q.taxCode}` : ""}
                  </p>
                  <p className="text-muted-foreground">
                    Mục đích: <strong>{q.useCase}</strong> · Nhận diện: <strong>{q.brandingStyle}</strong>
                  </p>
                  {q.notes && <p className="italic text-foreground/80 pt-1">“{q.notes}”</p>}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="font-mono text-sm font-bold mr-2">
                    {formatVnd(q.quotedTotalAmount)}
                  </span>
                  <select
                    value={q.status}
                    onChange={(e) => updateQuote(q._id, { status: e.target.value })}
                    className="h-9 px-3 border border-input bg-background text-xs"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {q.items?.length > 0 && (
                <div className="border-t border-border pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.items.map((it, idx) => (
                    <div key={idx} className="p-2.5 bg-secondary/40 border border-border flex justify-between">
                      <span>{it.productName} ({it.sizeBreakdown || "Chưa phân size"})</span>
                      <span className="font-mono font-semibold">×{it.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
