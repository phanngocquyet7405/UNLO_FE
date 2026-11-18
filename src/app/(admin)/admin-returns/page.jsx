"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { nullCommerceService, formatVnd } from "@/app/services/api/nullCommerceService";

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await nullCommerceService.adminGetReturns();
      setReturns(res?.data || []);
    } catch {
      setReturns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const processRma = async (id, status) => {
    try {
      await nullCommerceService.adminProcessReturn(id, { status });
      toast.success(`Đã cập nhật RMA sang ${status}`);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Lỗi xử lý RMA");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <p className="null-eyebrow">Hậu mãi linh hoạt · Đổi Size & Hoàn trả</p>
        <h1 className="text-2xl font-serif font-normal mt-1">
          Quản lý Yêu cầu Đổi Size / Trả hàng (RMA)
        </h1>
      </div>

      {loading ? (
        <div className="h-48 bg-secondary animate-pulse border border-border" />
      ) : returns.length === 0 ? (
        <div className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Chưa có yêu cầu đổi size / hoàn trả nào.
        </div>
      ) : (
        <div className="space-y-4">
          {returns.map((r) => (
            <div key={r._id} className="border border-border bg-card p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-sm">{r.rmaCode}</span>
                  <span className="px-2 py-0.5 bg-foreground text-background uppercase text-[10px]">
                    {r.type === "exchange_size" ? "Đổi Size" : "Hoàn tiền"}
                  </span>
                  <span className="px-2 py-0.5 bg-secondary border border-border uppercase text-[10px]">
                    {r.status}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Đơn: <strong className="font-mono text-foreground">{r.orderId?.orderId}</strong> · Khách:{" "}
                  {r.userId?.name || r.userId?.email} · Lý do: {r.reason}
                </p>
                {r.items?.map((it, idx) => (
                  <p key={idx} className="text-foreground">
                    • {it.productName} ({it.originalVariantSummary}
                    {it.targetVariantSummary ? ` → ${it.targetVariantSummary}` : ""}) ×{it.quantity}
                  </p>
                ))}
                {r.refundAmount > 0 && (
                  <p className="font-mono font-semibold">
                    Hoàn tiền dự kiến: {formatVnd(r.refundAmount)}
                  </p>
                )}
              </div>

              {!["completed", "rejected"].includes(r.status) && (
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => processRma(r._id, "approved")}
                    className="px-3 py-2 border border-border text-xs hover:border-foreground"
                  >
                    Duyệt
                  </button>
                  <button
                    type="button"
                    onClick={() => processRma(r._id, "completed")}
                    className="px-3.5 py-2 bg-primary text-primary-foreground text-xs uppercase tracking-wider"
                  >
                    Hoàn tất (Đổi kho / Hoàn tiền)
                  </button>
                  <button
                    type="button"
                    onClick={() => processRma(r._id, "rejected")}
                    className="px-3 py-2 border border-destructive text-destructive-text text-xs"
                  >
                    Từ chối
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
