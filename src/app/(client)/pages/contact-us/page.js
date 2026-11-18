"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Factory,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email hỗ trợ",
    value: "hotro@unlo.vn",
    sub: "Phản hồi trong 2–4 giờ làm việc",
  },
  {
    icon: Phone,
    label: "Hotline xưởng M2C",
    value: "1900 6826",
    sub: "Thứ 2 – Thứ 7, 8:00 – 18:00",
  },
  {
    icon: Factory,
    label: "Mạng lưới đối tác",
    value: "4 Nhà máy Tier-1",
    sub: "Hưng Yên, Bắc Ninh, Bình Dương, Hà Nội",
  },
  {
    icon: Clock,
    label: "Giờ làm việc văn phòng",
    value: "8:00 – 18:00",
    sub: "Tiếp nhận đơn hàng & hỗ trợ đổi trả",
  },
];

const TOPICS = [
  "Tra cứu đơn hàng & Tiến độ xuất xưởng",
  "Đặt hàng B2B / CLB từ 10 sản phẩm (Chiết khấu xưởng)",
  "Dịch vụ thêu tên & Cá nhân hóa",
  "Yêu cầu tự đổi trả 30 ngày tận nơi",
  "Đăng ký đối tác xưởng sản xuất M2C",
  "Góp ý chất lượng vải & đường may",
];

const PARTNER_FACTORIES = [
  {
    name: "Xưởng Dệt Kim Số 04",
    specialty: "Áo thun Supima 260 GSM & Polo Tencel",
    location: "Khu công nghiệp Phố Nối, Hưng Yên",
  },
  {
    name: "Xưởng May Xuất Khẩu Kinh Bắc",
    specialty: "Sơ mi European Linen 185 GSM & Quần Chino",
    location: "Khu công nghiệp Thuận Thành, Bắc Ninh",
  },
  {
    name: "Xưởng Thuộc Da Thủ Công An Điền",
    specialty: "Đồ da bò Full-grain Ý & Túi công sở",
    location: "Thị xã Tân Uyên, Tỉnh Bình Dương",
  },
  {
    name: "Lò Gốm Men Hỏa Biến Cổ Điển",
    specialty: "Cốc gốm sứ cao lanh nung 1.280°C chuẩn LFGB",
    location: "Cụm Làng Nghề Bát Tràng, Gia Lâm, Hà Nội",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Vui lòng nhập họ và tên";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Email không hợp lệ";
    }
    if (!form.topic) errs.topic = "Vui lòng chọn chủ đề";
    if (!form.message.trim()) errs.message = "Vui lòng nhập nội dung tin nhắn";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSent(true);
    setLoading(false);
    toast.success("Yêu cầu của bạn đã được gửi tới đội ngũ vận hành UNLO!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 space-y-16 sm:space-y-20 pb-20">
        {/* Header Hero */}
        <section className="bg-[#15095D] text-white py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#EB6D48] bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              LIÊN HỆ &amp; HỖ TRỢ XƯỞNG
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Chúng Tôi Luôn Lắng Nghe Bạn
            </h1>
            <p className="text-sm sm:text-base text-[#D0D4EE] max-w-xl mx-auto leading-relaxed">
              Dù bạn là khách hàng tìm kiếm chiếc áo thun chuẩn phom, CLB cần đặt số lượng lớn
              hay nhà sản xuất muốn tham gia mạng lưới M2C, UNLO luôn sẵn sàng kết nối.
            </p>
          </div>
        </section>

        {/* 4 Contact Info Cards */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 -mt-10 sm:-mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white border border-[#DCE0E7] p-6 space-y-3 shadow-md hover:border-[#15095D] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#EFF2F9] text-[#15095D] grid place-items-center">
                    <Icon className="w-5 h-5 text-[#32259B]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#5E607E]">
                      {item.label}
                    </p>
                    <p className="font-serif font-bold text-base text-[#15095D] mt-0.5">
                      {item.value}
                    </p>
                    <p className="text-xs text-[#8C93A8] mt-1">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Form & Factory Locations */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 rounded-3xl bg-[#F6F7FC] border border-[#DCE0E7] p-6 sm:p-10 space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#15095D]">
                  Gửi Tin Nhắn Cho UNLO
                </h2>
                <p className="text-xs sm:text-sm text-[#5E607E] mt-1">
                  Đội ngũ chăm sóc và quản lý đơn hàng sẽ phản hồi trong vòng 2-4 giờ làm việc.
                </p>
              </div>

              {sent ? (
                <div className="rounded-2xl bg-white border border-[#48C07E] p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#EBF8F1] text-[#48C07E] grid place-items-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#15095D]">
                    Gửi tin nhắn thành công!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E607E] max-w-sm mx-auto">
                    Cảm ơn bạn đã liên hệ. Đội ngũ UNLO sẽ xem xét thông tin và phản hồi tới email{" "}
                    <strong>{form.email}</strong> trong thời gian sớm nhất.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", phone: "", topic: "", message: "" });
                    }}
                    className="h-10 px-6 rounded-full bg-[#15095D] text-white text-xs font-semibold hover:bg-[#1F0C85]"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#15095D]">Họ và tên *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full h-11 px-4 rounded-xl bg-white border border-[#DCE0E7] text-xs text-[#15095D] outline-none focus:border-[#15095D]"
                      />
                      {errors.name && <p className="text-[11px] text-[#A52735]">{errors.name}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#15095D]">Địa chỉ Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-11 px-4 rounded-xl bg-white border border-[#DCE0E7] text-xs text-[#15095D] outline-none focus:border-[#15095D]"
                      />
                      {errors.email && <p className="text-[11px] text-[#A52735]">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#15095D]">Số điện thoại</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        placeholder="0912 345 678"
                        className="w-full h-11 px-4 rounded-xl bg-white border border-[#DCE0E7] text-xs text-[#15095D] outline-none focus:border-[#15095D]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#15095D]">Chủ đề liên hệ *</label>
                      <select
                        value={form.topic}
                        onChange={(e) => setField("topic", e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-white border border-[#DCE0E7] text-xs text-[#15095D] outline-none focus:border-[#15095D]"
                      >
                        <option value="">-- Chọn chủ đề --</option>
                        {TOPICS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.topic && <p className="text-[11px] text-[#A52735]">{errors.topic}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#15095D]">Nội dung yêu cầu *</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      placeholder="Mô tả cụ thể yêu cầu của bạn..."
                      className="w-full p-4 rounded-xl bg-white border border-[#DCE0E7] text-xs text-[#15095D] outline-none focus:border-[#15095D]"
                    />
                    {errors.message && <p className="text-[11px] text-[#A52735]">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-full bg-[#15095D] hover:bg-[#1F0C85] text-white text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? "Đang gửi..." : "Gửi tin nhắn"}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: 4 Partner Factories Directory */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#625FBC]">
                  HỒ SƠ CÁC XƯỞNG ĐỐI TÁC
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#15095D]">
                  Địa Chỉ Nhà Máy OEM Tier-1
                </h3>
                <p className="text-xs text-[#5E607E]">
                  Mọi sản phẩm của UNLO đều xuất phát từ 4 xưởng may và thủ công chuẩn xuất khẩu.
                </p>
              </div>

              <div className="space-y-3.5">
                {PARTNER_FACTORIES.map((f) => (
                  <div
                    key={f.name}
                    className="rounded-2xl bg-white border border-[#DCE0E7] p-5 space-y-2 hover:border-[#32259B] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Factory className="w-4 h-4 text-[#32259B]" />
                      <h4 className="font-serif font-bold text-sm text-[#15095D]">{f.name}</h4>
                    </div>
                    <p className="text-xs font-medium text-[#EB6D48]">{f.specialty}</p>
                    <p className="text-xs text-[#5E607E] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8C93A8] shrink-0" />
                      <span>{f.location}</span>
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/factories"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#32259B] hover:text-[#15095D] transition-colors"
              >
                <span>Xem quy trình kiểm định 12 bước tại xưởng</span>
                <ShieldCheck className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <NullFooter />
    </div>
  );
}
