"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { nullCommerceService, formatVnd } from "@/app/services/api/nullCommerceService";

const STAGES = [
  "active",
  "moq_reached",
  "fabric_sourcing",
  "sewing",
  "qc_checking",
  "shipping",
  "completed",
];

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await nullCommerceService.getCampaigns({ all: "true" });
      setCampaigns(res?.data || []);
    } catch {
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStage = async (id, status) => {
    try {
      await nullCommerceService.updateCampaignStage(id, { status });
      toast.success(`Đã cập nhật tiến độ lô sang ${status}`);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Lỗi cập nhật tiến độ");
    }
  };

  const triggerRefund = async (camp) => {
    if (!window.confirm(`Xác nhận hủy lô "${camp.title}" do không đạt MOQ và tạo hoàn tiền 100%?`)) return;
    try {
      const res = await nullCommerceService.triggerCampaignMoqRefund(
        camp._id,
        "Không đạt MOQ tối thiểu sau khi đóng đợt gom đơn",
      );
      toast.success(res?.message || "Đã kích hoạt hoàn tiền minh bạch");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Không thể kích hoạt hoàn tiền");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <p className="null-eyebrow">NU:LL Supply Chain · Sản xuất lô nhỏ</p>
        <h1 className="text-2xl font-serif font-normal mt-1">
          Quản lý Chiến dịch Group-Buy & Pre-Order
        </h1>
      </div>

      {loading ? (
        <div className="h-48 bg-secondary animate-pulse border border-border" />
      ) : (
        <div className="space-y-4">
          {campaigns.map((camp) => (
            <div key={camp._id} className="border border-border bg-card p-5 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
                    <span className="px-2 py-0.5 bg-foreground text-background">{camp.type}</span>
                    <span className="px-2 py-0.5 bg-secondary border border-border">{camp.status}</span>
                  </div>
                  <h2 className="text-lg font-serif">{camp.title}</h2>
                  <p className="text-xs text-muted-foreground">
                    Đã gom: <strong className="text-foreground">{camp.currentOrderedQty} / {camp.moqTarget}</strong> ({camp.moqPercent}%) · Giá mở khóa:{" "}
                    <strong className="font-mono text-foreground">{formatVnd(camp.currentUnitPrice)}</strong>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={camp.status}
                    disabled={camp.status === "cancelled_moq_failed"}
                    onChange={(e) => updateStage(camp._id, e.target.value)}
                    className="h-9 px-3 border border-input bg-background text-xs"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {camp.status !== "cancelled_moq_failed" && camp.status !== "completed" && (
                    <button
                      type="button"
                      onClick={() => triggerRefund(camp)}
                      className="h-9 px-3.5 border border-destructive text-destructive-text text-xs uppercase tracking-wider hover:bg-destructive hover:text-destructive-foreground"
                    >
                      Hủy thiếu MOQ & Hoàn tiền
                    </button>
                  )}
                </div>
              </div>
              <div className="h-2 bg-secondary overflow-hidden">
                <div className="h-full bg-foreground" style={{ width: `${camp.moqPercent}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
