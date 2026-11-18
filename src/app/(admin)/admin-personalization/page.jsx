"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { nullCommerceService, formatVnd } from "@/app/services/api/nullCommerceService";

const WORK_STATUSES = [
  { id: "pending_work", label: "Chờ nhận thêu" },
  { id: "in_embroidery", label: "Đang thêu / gắn nhãn" },
  { id: "qc_passed", label: "Đã đạt QC cá nhân hóa" },
  { id: "packed", label: "Đã đóng hộp sẵn giao" },
];

export default function AdminPersonalizationQueuePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await nullCommerceService.adminGetPersonalizationQueue();
      setTasks(res?.data || []);
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (task, workStatus) => {
    try {
      await nullCommerceService.adminUpdatePersonalizationStatus(
        task.orderId,
        task.lineId,
        workStatus,
      );
      toast.success(`Đã chuyển công đoạn sang: ${workStatus}`);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Lỗi cập nhật công đoạn");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <p className="null-eyebrow inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Postponement Atelier Queue
        </p>
        <h1 className="text-2xl font-serif font-normal mt-1">
          Hàng đợi Hoàn thiện Cá nhân hóa (Monogram / Nhãn / Hộp quà)
        </h1>
      </div>

      {loading ? (
        <div className="h-48 bg-secondary animate-pulse border border-border" />
      ) : tasks.length === 0 ? (
        <div className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Hiện không có dòng đơn hàng nào đang chờ hoàn thiện cá nhân hóa.
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((t) => (
            <div
              key={`${t.orderId}-${t.lineId}`}
              className="border border-border bg-card p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-sm">{t.orderCode}</span>
                  <span className="text-muted-foreground">· {t.customerName}</span>
                  <span className="px-2 py-0.5 bg-secondary border border-border font-mono">
                    SL: {t.quantity}
                  </span>
                </div>
                <p className="font-medium text-sm">
                  {t.productName}{" "}
                  {t.variantSummary?.size && (
                    <span className="text-muted-foreground font-normal">
                      ({t.variantSummary.colorName} / Size {t.variantSummary.size})
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-3 pt-1 text-muted-foreground">
                  {t.customization?.monogramText && (
                    <span>
                      Monogram: <strong className="text-foreground font-mono">{t.customization.monogramText}</strong>{" "}
                      ({t.customization.placement} · {t.customization.font} · {t.customization.threadColor})
                    </span>
                  )}
                  {t.customization?.innerLabelText && (
                    <span>
                      Nhãn trong: <strong className="text-foreground">{t.customization.innerLabelText}</strong>
                    </span>
                  )}
                  {t.customization?.giftBoxType && t.customization.giftBoxType !== "none" && (
                    <span>
                      Hộp quà: <strong className="text-foreground">{t.customization.giftBoxType}</strong>
                    </span>
                  )}
                  <span className="font-mono text-foreground">
                    Phụ phí: {formatVnd(t.personalizationFee)}
                  </span>
                </div>
              </div>

              <select
                value={t.customization?.workStatus || "pending_work"}
                onChange={(e) => updateStatus(t, e.target.value)}
                className="h-10 px-3 border border-input bg-background text-xs shrink-0"
              >
                {WORK_STATUSES.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
