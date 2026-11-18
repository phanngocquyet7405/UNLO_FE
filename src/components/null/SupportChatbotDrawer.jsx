"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  HelpCircle,
  Factory,
  ChevronRight,
} from "lucide-react";
import { formatVnd } from "@/app/services/api/nullCommerceService";

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "bot",
    text: "Xin chào! Tôi là Trợ Lý Tự Động của Hệ Thống Xưởng UNLO. Tôi có thể hỗ trợ bạn điều gì hôm nay?",
    timestamp: "Vừa xong",
  },
];

const QUICK_ACTIONS = [
  {
    id: "track_order",
    label: "Tra cứu đơn hàng",
    query: "Tôi muốn tra cứu tình trạng đơn hàng của mình",
    response:
      "Để tra cứu tiến trình đơn hàng (8 bước kiểm định QC tại xưởng dệt), bạn vui lòng nhập Mã đơn hàng (ví dụ: UNLO-8823) hoặc số điện thoại đặt hàng vào ô chat bên dưới.",
  },
  {
    id: "size_guide",
    label: "Hướng dẫn chọn size",
    query: "Làm sao để tôi chọn đúng size áo?",
    response:
      "Form áo của UNLO là Regular-Fit chuẩn vóc dáng người Việt:\n• Size S: 50–59kg (cao 1m58–1m67)\n• Size M: 60–68kg (cao 1m66–1m73)\n• Size L: 69–77kg (cao 1m72–1m79)\n• Size XL: 78–88kg (cao 1m78–1m86)\nNếu bạn thích mặc rộng thoải mái (Oversize), bạn có thể chọn tăng 1 size.",
  },
  {
    id: "b2b_pricing",
    label: "Báo giá thêu & đặt sỉ (B2B)",
    query: "Chính sách chiết khấu số lượng cho công ty/nhóm?",
    response:
      "UNLO hỗ trợ đặt hàng trực tiếp từ xưởng may không qua trung gian:\n• Từ 10–49 áo: Giảm 15% + Miễn phí thêu tên vi tính\n• Từ 50+ áo: Giảm 30% + Miễn phí thêu/in logo công ty\n• Đầy đủ hóa đơn VAT và bảo hành đường chỉ trọn đời.\nBạn có thể gửi yêu cầu báo giá tại trang B2B của chúng tôi.",
  },
  {
    id: "return_policy",
    label: "Chính sách đổi trả 30 ngày",
    query: "Chính sách đổi trả hàng như thế nào?",
    response:
      "UNLO áp dụng chính sách đổi trả miễn phí trong 30 ngày đối với mọi sản phẩm chưa qua giặt ủi nếu không vừa size hoặc có lỗi từ khâu kiểm định QC của xưởng may. Bưu tá sẽ đến lấy hàng tận nơi mà bạn không mất thêm chi phí.",
  },
];

export default function SupportChatbotDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");
    setIsTyping(true);

    // Bot response logic
    setTimeout(() => {
      let botResponse = "";

      const lower = text.toLowerCase();
      if (lower.includes("unlo-") || /^\d{4,10}$/.test(lower.trim())) {
        botResponse = `Đơn hàng #${text.toUpperCase().trim()} đang ở bước 04: "Kiểm định QC AQL 2.5 tại Xưởng Dệt Kim Số 04 (Hưng Yên)". Dự kiến đơn hàng sẽ được giao đến bạn trong vòng 24–48h tới.`;
      } else if (lower.includes("size") || lower.includes("cỡ")) {
        botResponse = QUICK_ACTIONS.find((q) => q.id === "size_guide")?.response;
      } else if (lower.includes("b2b") || lower.includes("sỉ") || lower.includes("clb") || lower.includes("công ty")) {
        botResponse = QUICK_ACTIONS.find((q) => q.id === "b2b_pricing")?.response;
      } else if (lower.includes("đổi") || lower.includes("trả") || lower.includes("bảo hành")) {
        botResponse = QUICK_ACTIONS.find((q) => q.id === "return_policy")?.response;
      } else {
        botResponse =
          "Cảm ơn câu hỏi của bạn. Hệ thống chăm sóc khách hàng của UNLO đã ghi nhận. Nếu bạn cần hỗ trợ khẩn cấp, vui lòng liên hệ hotline xưởng: 1900 6826 hoặc gửi email tới contact@unlo.vn.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickAction = (action) => {
    handleSend(action.query);
  };

  return (
    <>
      {/* Floating Trigger Button in bottom-right */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Đóng hộp trò chuyện" : "Mở trợ lý hỗ trợ khách hàng"}
          className="relative w-14 h-14 rounded-full bg-[#15095D] hover:bg-[#32259B] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer group"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-white" />
              {/* Green Pulse Online Dot */}
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D7A5F] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#1D7A5F] border-2 border-white" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Slide-over Chatbot Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] max-h-[580px] h-[78vh] bg-white rounded-3xl shadow-2xl border border-[#DCE0E7] flex flex-col overflow-hidden animate-slide-in-up">
          {/* Header */}
          <div className="bg-[#15095D] text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <Factory className="w-5 h-5 text-[#BBC2DD]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#1D7A5F] border border-[#15095D]" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-snug">
                  Trợ Lý Xưởng UNLO
                </h4>
                <p className="text-[10px] text-[#BBC2DD] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D7A5F]" />
                  <span>Trực tuyến 24/7 · Kết nối trực tiếp xưởng</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Thu nhỏ"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F6F7FC]">
            {messages.map((m) => {
              const isBot = m.sender === "bot";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isBot ? "items-start" : "items-end"} space-y-1`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed whitespace-pre-line ${
                      isBot
                        ? "bg-white text-[#15095D] border border-[#DCE0E7] shadow-xs rounded-tl-xs"
                        : "bg-[#15095D] text-white shadow-xs rounded-tr-xs"
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-[#8D8DC7] px-1">
                    {m.timestamp}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#DCE0E7] w-16">
                <span className="w-2 h-2 rounded-full bg-[#32259B] animate-bounce" />
                <span
                  className="w-2 h-2 rounded-full bg-[#32259B] animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-[#32259B] animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Chips */}
          <div className="p-2.5 bg-white border-t border-[#DCE0E7] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleQuickAction(action)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-[#EFF2F9] hover:bg-[#15095D] text-[#32259B] hover:text-white border border-[#BBC2DD] text-[10px] font-bold transition-all cursor-pointer"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#DCE0E7] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Nhập mã đơn hàng hoặc câu hỏi..."
              className="flex-1 h-10 px-3.5 rounded-full bg-[#EFF2F9] text-xs text-[#15095D] placeholder:text-[#8D8DC7] outline-none border border-[#BBC2DD] focus:border-[#32259B] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              aria-label="Gửi tin nhắn"
              className="w-10 h-10 rounded-full bg-[#15095D] hover:bg-[#32259B] disabled:opacity-40 text-white grid place-items-center shrink-0 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
