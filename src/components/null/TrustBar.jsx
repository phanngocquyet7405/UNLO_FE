"use client";

/**
 * TrustBar (.trust) — 4 Trụ Cột Niềm Tin M2C Chuẩn từ prototype index.html
 * 1. Xưởng thật, đã thẩm định
 * 2. Thanh toán giữ tạm
 * 3. Đổi trả 7 ngày
 * 4. Minh bạch thông số
 */
export default function TrustBar() {
  return (
    <section className="w-full bg-[#EAEBF2] border-y border-[#DDE0EC]">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0 sm:divide-x divide-[#BBC2DD]">
          {/* 1. Xưởng thật */}
          <div className="flex items-center gap-3.5 px-2 sm:px-6">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-8 h-8 sm:w-9 sm:h-9 text-[#15095D] shrink-0"
              aria-hidden="true"
            >
              <path d="M5 34V18l9 5v-5l9 5v-5l9 5v11z" />
              <path d="M28 13V6h4v9" />
              <path d="M11 29h4m6 0h4" />
            </svg>
            <div className="min-w-0">
              <b className="font-serif text-[15px] sm:text-base font-medium text-[#15095D] block leading-snug">
                Xưởng thật, đã thẩm định
              </b>
              <span className="text-xs text-[#5E607E] block mt-0.5">
                Kiểm tra pháp lý và năng lực tại xưởng
              </span>
            </div>
          </div>

          {/* 2. Thanh toán giữ tạm */}
          <div className="flex items-center gap-3.5 px-2 sm:px-6">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-8 h-8 sm:w-9 sm:h-9 text-[#15095D] shrink-0"
              aria-hidden="true"
            >
              <rect x="9" y="17" width="22" height="16" rx="2" />
              <path d="M14 17v-4a6 6 0 0 1 12 0v4" />
              <circle cx="20" cy="25" r="2" />
            </svg>
            <div className="min-w-0">
              <b className="font-serif text-[15px] sm:text-base font-medium text-[#15095D] block leading-snug">
                Thanh toán giữ tạm
              </b>
              <span className="text-xs text-[#5E607E] block mt-0.5">
                Xưởng nhận tiền khi bạn nhận hàng
              </span>
            </div>
          </div>

          {/* 3. Đổi trả 7 ngày */}
          <div className="flex items-center gap-3.5 px-2 sm:px-6">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-8 h-8 sm:w-9 sm:h-9 text-[#15095D] shrink-0"
              aria-hidden="true"
            >
              <path d="M20 5l13 7v16l-13 7-13-7V12z" />
              <path d="M7 12l13 7 13-7M20 19v16" />
            </svg>
            <div className="min-w-0">
              <b className="font-serif text-[15px] sm:text-base font-medium text-[#15095D] block leading-snug">
                Đổi trả 7 ngày
              </b>
              <span className="text-xs text-[#5E607E] block mt-0.5">
                Đối chiếu ảnh QC, hoàn tiền nhanh
              </span>
            </div>
          </div>

          {/* 4. Minh bạch thông số */}
          <div className="flex items-center gap-3.5 px-2 sm:px-6">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-8 h-8 sm:w-9 sm:h-9 text-[#15095D] shrink-0"
              aria-hidden="true"
            >
              <path d="M6 20V7h13l15 15-13 13z" />
              <circle cx="13" cy="13" r="2" />
              <path d="M17 23h8M17 27h5" />
            </svg>
            <div className="min-w-0">
              <b className="font-serif text-[15px] sm:text-base font-medium text-[#15095D] block leading-snug">
                Minh bạch thông số
              </b>
              <span className="text-xs text-[#5E607E] block mt-0.5">
                Sợi, gsm, size đo thật ở xưởng
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
