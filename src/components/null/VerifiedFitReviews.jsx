"use client";

import { useState, useMemo } from "react";
import { Star, CheckCircle2, Ruler, MessageSquare, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

const FIT_LABELS = {
  runs_small: "Hơi ôm",
  true_to_size: "Vừa vặn chuẩn",
  runs_large: "Hơi rộng",
};

const DEFAULT_REVIEWS = [
  {
    id: "def-1",
    author: "Trần Quốc Bảo",
    date: "14/11/2026",
    rating: 5,
    heightCm: 172,
    weightKg: 68,
    sizeBought: "L",
    fitRating: "true_to_size",
    comment:
      "Mình cao 1m72 nặng 68kg chọn size L rất vừa vặn. Nhận hàng kiểm tra chất liệu tại chỗ thấy đúng thông số xưởng công bố.",
  },
  {
    id: "def-2",
    author: "Nguyễn Minh Khôi",
    date: "09/11/2026",
    rating: 5,
    heightCm: 168,
    weightKg: 61,
    sizeBought: "M",
    fitRating: "true_to_size",
    comment:
      "Cao 1m68 nặng 61kg mặc M chuẩn gọn. Giá M2C tiết kiệm hơn hẳn mà hoàn thiện đường may rất kỹ.",
  },
];

function recommendSize(heightCm, weightKg) {
  const h = Number(heightCm);
  const w = Number(weightKg);
  if (!h || !w) return null;
  if (w < 60 && h < 168) return "S";
  if (w < 69 && h < 175) return "M";
  if (w < 79 && h < 181) return "L";
  return "XL";
}

export default function VerifiedFitReviews({ product, factory }) {
  const [activeTab, setActiveTab] = useState("reviews");
  const [reviews, setReviews] = useState(() =>
    product?.fitReviews?.length ? product.fitReviews : DEFAULT_REVIEWS,
  );
  const [qaList, setQaList] = useState(() =>
    product?.makerQa?.length
      ? product.makerQa
      : [
          {
            id: "qa-default-1",
            question: "Sản phẩm có được mở kiểm tra chất liệu trước khi thanh toán không?",
            asker: "Khách hàng UNLO",
            answer:
              "Có ạ. Mọi đơn hàng xuất từ xưởng đối tác UNLO đều hỗ trợ kiểm tra chất liệu và đường hoàn thiện trước khi thanh toán cho shipper.",
            responder: factory?.maker?.name
              ? `${factory.maker.name} — ${factory.code}`
              : "Quản đốc kỹ thuật UNLO",
          },
        ],
  );

  // Smart Fit Finder inputs
  const [myHeight, setMyHeight] = useState("");
  const [myWeight, setMyWeight] = useState("");
  const [fitFilter, setFitFilter] = useState("all");

  // New review / Q&A forms
  const [newReview, setNewReview] = useState({
    author: "",
    heightCm: "",
    weightKg: "",
    sizeBought: "M",
    fitRating: "true_to_size",
    rating: 5,
    comment: "",
  });
  const [newQuestion, setNewQuestion] = useState("");

  const suggestedSize = useMemo(
    () => recommendSize(myHeight, myWeight),
    [myHeight, myWeight],
  );

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (fitFilter === "similar") {
        const h = Number(myHeight);
        const w = Number(myWeight);
        if (h && r.heightCm && Math.abs(r.heightCm - h) > 6) return false;
        if (w && r.weightKg && Math.abs(r.weightKg - w) > 6) return false;
      } else if (fitFilter !== "all" && r.fitRating !== fitFilter) {
        return false;
      }
      return true;
    });
  }, [reviews, fitFilter, myHeight, myWeight]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    setReviews((prev) => [
      {
        id: `rev-${Date.now()}`,
        author: newReview.author.trim() || "Khách hàng đã mua",
        date: "Vừa xong",
        rating: newReview.rating,
        heightCm: Number(newReview.heightCm) || undefined,
        weightKg: Number(newReview.weightKg) || undefined,
        sizeBought: newReview.sizeBought,
        fitRating: newReview.fitRating,
        comment: newReview.comment.trim(),
      },
      ...prev,
    ]);
    setNewReview({
      author: "",
      heightCm: "",
      weightKg: "",
      sizeBought: "M",
      fitRating: "true_to_size",
      rating: 5,
      comment: "",
    });
    toast.success("Đã ghi nhận đánh giá thực tế của bạn!");
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setQaList((prev) => [
      {
        id: `qa-${Date.now()}`,
        question: newQuestion.trim(),
        asker: "Bạn",
        answer:
          "Câu hỏi đã được chuyển thẳng tới Quản đốc kỹ thuật của xưởng. Dự kiến phản hồi trong vòng 2 giờ làm việc.",
        responder: factory?.maker?.name
          ? `${factory.maker.name} — ${factory.code}`
          : "Tổ kỹ thuật nhà máy UNLO",
      },
      ...prev,
    ]);
    setNewQuestion("");
    toast.success("Đã gửi câu hỏi trực tiếp tới Quản đốc xưởng!");
  };

  return (
    <section className="space-y-7">
      {/* Header + Tab Switch */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
            FIT DATA &amp; MAKER Q&amp;A
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#15095D]">
            Đánh Giá Theo Vóc Dáng &amp; Hỏi Đáp Quản Đốc Xưởng
          </h2>
        </div>

        <div className="inline-flex p-1 rounded-full bg-[#EFF2F9] border border-[#DCE0E7] self-start">
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`h-9 px-5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "reviews"
                ? "bg-[#15095D] text-[#FCFDF1]"
                : "text-[#4E567A] hover:text-[#15095D]"
            }`}
          >
            Đánh giá xác thực ({reviews.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("qa")}
            className={`h-9 px-5 rounded-full text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === "qa"
                ? "bg-[#15095D] text-[#FCFDF1]"
                : "text-[#4E567A] hover:text-[#15095D]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            Hỏi đáp Quản đốc ({qaList.length})
          </button>
        </div>
      </div>

      {activeTab === "reviews" ? (
        <div className="space-y-6">
          {/* Smart Fit Finder Bar */}
          <div className="rounded-3xl bg-[#EFF2F9] border border-[#DCE0E7] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#32259B] inline-flex items-center gap-1.5">
                <Ruler className="w-4 h-4" aria-hidden="true" />
                Smart Fit Finder — Tư vấn kích cỡ &amp; lọc đánh giá cùng vóc dáng
              </p>
              <p className="text-xs text-[#4E567A]">
                Nhập chiều cao &amp; cân nặng để xem size khuyến nghị và lọc đánh giá từ người mua có số đo tương đương (±6cm / ±6kg).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <input
                type="number"
                min={140}
                max={210}
                value={myHeight}
                onChange={(e) => setMyHeight(e.target.value)}
                placeholder="Chiều cao (cm)"
                aria-label="Chiều cao của bạn (cm)"
                className="w-36 h-10 px-3.5 rounded-full bg-white border border-[#BBC2DD] text-xs font-semibold text-[#15095D] outline-none focus:border-[#32259B]"
              />
              <input
                type="number"
                min={35}
                max={140}
                value={myWeight}
                onChange={(e) => setMyWeight(e.target.value)}
                placeholder="Cân nặng (kg)"
                aria-label="Cân nặng của bạn (kg)"
                className="w-36 h-10 px-3.5 rounded-full bg-white border border-[#BBC2DD] text-xs font-semibold text-[#15095D] outline-none focus:border-[#32259B]"
              />
              {suggestedSize && (
                <button
                  type="button"
                  onClick={() => setFitFilter("similar")}
                  className="h-10 px-4 rounded-full bg-[#32259B] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  Gợi ý Size {suggestedSize} · Lọc người giống tôi
                </button>
              )}
            </div>
          </div>

          {/* Fit Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "Tất cả đánh giá" },
              ...(myHeight || myWeight
                ? [{ id: "similar", label: `Vóc dáng giống tôi (${myHeight || "?"}cm · ${myWeight || "?"}kg)` }]
                : []),
              { id: "true_to_size", label: "Vừa vặn chuẩn" },
              { id: "runs_small", label: "Hơi ôm" },
              { id: "runs_large", label: "Hơi rộng" },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFitFilter(chip.id)}
                className={`h-9 px-4 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  fitFilter === chip.id
                    ? "bg-[#15095D] text-[#FCFDF1]"
                    : "bg-[#EFF2F9] text-[#4E567A] hover:text-[#15095D]"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Review Cards */}
            <div className="lg:col-span-7 space-y-4">
              {filteredReviews.length === 0 ? (
                <div className="rounded-2xl border border-[#DCE0E7] bg-[#EFF2F9]/50 p-8 text-center space-y-2">
                  <p className="text-sm font-semibold text-[#15095D]">
                    Chưa có đánh giá nào khớp bộ lọc vóc dáng này.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFitFilter("all")}
                    className="text-xs font-bold text-[#32259B] underline cursor-pointer"
                  >
                    Xem toàn bộ đánh giá
                  </button>
                </div>
              ) : (
                filteredReviews.map((rev) => (
                  <article
                    key={rev.id}
                    className="rounded-2xl border border-[#DCE0E7] bg-white p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#15095D]">{rev.author}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#32259B] bg-[#EFF2F9] px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                          Đã mua xác thực
                        </span>
                      </div>
                      <span className="text-xs text-[#8D8DC7]">{rev.date}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={`w-3.5 h-3.5 ${
                              n <= rev.rating
                                ? "fill-[#443EB1] text-[#443EB1]"
                                : "text-[#DCE0E7]"
                            }`}
                          />
                        ))}
                      </div>
                      {rev.heightCm && rev.weightKg && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FCFDF1] border border-[#DCE0E7] font-semibold text-[#15095D] tabular-nums">
                          Cao {rev.heightCm}cm · Nặng {rev.weightKg}kg
                        </span>
                      )}
                      {rev.sizeBought && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#EFF2F9] font-semibold text-[#32259B]">
                          Size {rev.sizeBought} · {FIT_LABELS[rev.fitRating] || "Vừa vặn"}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-[#15095D]/85 leading-relaxed">{rev.comment}</p>
                  </article>
                ))
              )}
            </div>

            {/* Submit Verified Fit Review */}
            <form
              onSubmit={handleSubmitReview}
              className="lg:col-span-5 rounded-3xl bg-[#FCFDF1] border border-[#DCE0E7] p-6 space-y-4"
            >
              <h3 className="font-serif text-xl font-semibold text-[#15095D]">
                Chia Sẻ Đánh Giá &amp; Số Đo Thực Tế
              </h3>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNewReview((p) => ({ ...p, rating: n }))}
                    aria-label={`Chọn ${n} sao`}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        n <= newReview.rating
                          ? "fill-[#443EB1] text-[#443EB1]"
                          : "text-[#BBC2DD]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={newReview.author}
                onChange={(e) => setNewReview((p) => ({ ...p, author: e.target.value }))}
                placeholder="Tên của bạn"
                className="w-full h-10 px-4 rounded-xl bg-white border border-[#BBC2DD] text-sm text-[#15095D] outline-none focus:border-[#32259B]"
              />

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={newReview.heightCm}
                  onChange={(e) => setNewReview((p) => ({ ...p, heightCm: e.target.value }))}
                  placeholder="Cao (cm)"
                  className="h-10 px-3 rounded-xl bg-white border border-[#BBC2DD] text-xs text-[#15095D]"
                />
                <input
                  type="number"
                  value={newReview.weightKg}
                  onChange={(e) => setNewReview((p) => ({ ...p, weightKg: e.target.value }))}
                  placeholder="Nặng (kg)"
                  className="h-10 px-3 rounded-xl bg-white border border-[#BBC2DD] text-xs text-[#15095D]"
                />
                <select
                  value={newReview.fitRating}
                  onChange={(e) => setNewReview((p) => ({ ...p, fitRating: e.target.value }))}
                  className="h-10 px-2.5 rounded-xl bg-white border border-[#BBC2DD] text-xs font-semibold text-[#15095D]"
                >
                  <option value="true_to_size">Vừa chuẩn</option>
                  <option value="runs_small">Hơi ôm</option>
                  <option value="runs_large">Hơi rộng</option>
                </select>
              </div>

              <textarea
                rows={3}
                required
                value={newReview.comment}
                onChange={(e) => setNewReview((p) => ({ ...p, comment: e.target.value }))}
                placeholder="Cảm nhận về chất liệu, độ dày và độ vừa vặn..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#BBC2DD] text-sm text-[#15095D] outline-none focus:border-[#32259B] resize-none"
              />

              <button
                type="submit"
                className="w-full h-11 rounded-full unlo-pill-primary text-xs font-bold uppercase tracking-[0.1em] cursor-pointer"
              >
                Gửi Đánh Giá Thực Tế
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Tab 2: Maker Q&A — Hỏi đáp trực tiếp cùng Quản đốc xưởng */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            {qaList.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-[#DCE0E7] bg-white p-5 space-y-3"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#625FBC]">
                    Câu hỏi từ {item.asker}
                  </span>
                  <h3 className="text-sm font-bold text-[#15095D]">{item.question}</h3>
                </div>
                <div className="rounded-2xl bg-[#EFF2F9] p-4 space-y-1.5 border border-[#DCE0E7]">
                  <p className="text-[11px] font-bold text-[#32259B]">{item.responder}</p>
                  <p className="text-sm text-[#15095D]/90 leading-relaxed">{item.answer}</p>
                </div>
              </article>
            ))}
          </div>

          <form
            onSubmit={handleSubmitQuestion}
            className="lg:col-span-5 rounded-3xl bg-[#FCFDF1] border border-[#DCE0E7] p-6 space-y-4"
          >
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-semibold text-[#15095D]">
                Hỏi Trực Tiếp Quản Đốc Xưởng
              </h3>
              <p className="text-xs text-[#4E567A]">
                Giải đáp thắc mắc kỹ thuật về chất vải, da thuộc, cách giặt ủi bảo quản hoặc độ co rút.
              </p>
            </div>
            <textarea
              rows={3}
              required
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="VD: Sản phẩm này giặt máy sấy nhiệt độ thấp có bị co không?"
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#BBC2DD] text-sm text-[#15095D] outline-none focus:border-[#32259B] resize-none"
            />
            <button
              type="submit"
              className="w-full h-11 rounded-full unlo-pill-primary text-xs font-bold uppercase tracking-[0.1em] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
              Gửi Câu Hỏi Tới Xưởng
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
