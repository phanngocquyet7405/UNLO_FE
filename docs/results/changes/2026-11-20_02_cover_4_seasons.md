# Báo Cáo Thay Đổi DOC-02: Cover 4 Mùa & Dải Marquee Chạy Chữ Xanh

**Ngày thực hiện:** 20/11/2026  
**Mục tiêu:** Cập nhật giao diện Cover 4 Mùa và Thanh Marquee dưới cover đúng 100% theo yêu cầu `FB_FLOW_WEB.docx`. Đảm bảo chụp và kiểm chứng trực tiếp trên bản chạy thật của Next.js App (`localhost:3005`), giữ nguyên 100% video nền điện ảnh, typography và bố cục thương hiệu gốc.

---

## 1. Bảng Đối Chiếu Thay Đổi

| Mã DOC | Khu Vực | Trước | Sau | File Đã Sửa |
| :--- | :--- | :--- | :--- | :--- |
| **DOC-02** | Nút CTA trên Hero Cover | `Xem Tất Cả Sản Phẩm` / `Khám Phá Ngay` hoặc còn nút `Shop Flashsale` | Chỉ còn 2 nút chuẩn: `Shop All` (trắng) và `Discover Now` (outline trong suốt dẫn tới `/pages/about-us`) | `src/components/null/SeasonalHeroVideoCarousel.jsx` |
| **DOC-02** | Nội dung thanh chạy Marquee dưới cover | Các cụm từ cũ: `GIÁ TRỊ KHÔNG CẦN GỌI TÊN`, `CHẤT LƯỢNG`, icon `✦` | Đúng từng chữ theo DOCX: `"GIẢM 20% KHI MUA TẠI WEBSITE – ƯU ĐÃI CHỈ ÁP DỤNG TẠI UNLO.VN – CHẤT LƯỢNG MINH BẠCH – GIAO TOÀN QUỐC"`, dấu gạch ngang phân tách `–` | `src/components/null/BrandMarquee.jsx` |
| **DOC-02** | Màu sắc & Bố cục Marquee | Nền viền xanh tím có viền kép | Nền xanh navy `#15095D`, chữ trắng `#FFFFFF`, đẩy lên sát đáy cover không khoảng hở | `src/components/null/BrandMarquee.jsx` |
| **DOC-02** | Tiến trình chuyển mùa | Chuyển cảnh 30s giữa Xuân - Hạ - Thu - Đông | Giữ nguyên thanh tiến trình 4 đoạn phía dưới, video tự chuyển mượt mà | `src/components/null/SeasonalHeroVideoCarousel.jsx` |

---

## 2. Bằng Chứng Hình Ảnh Trực Tiếp Từ Code Thật (Desktop 1440 & Mobile 390)

- **Desktop 1440px (Hero Cover + Header):** `scratch/real_header_desktop_1440.png`
- **Desktop 1440px (Cuộn xuống thấy Dải Chữ Xanh sát cover):** `scratch/cover_and_marquee_desktop.png`
- **Mobile 390px (Mobile Header + Hero):** `scratch/real_header_mobile_390.png`

---

## 3. Danh Sách "KHÔNG ĐỘNG TỚI" (Bảo Toàn Hệ Thống)

1. **Logo & Video Nền:** Giữ nguyên 100% logo chuẩn `/assets/logo/unlo-header.png` và 4 video MP4 bản quyền thương hiệu (`hero-dong.mp4`, `hero-xuan.mp4`, `hero-ha.mp4`, `hero-thu.mp4`).
2. **Opts 2 Hybrid Header:** Giữ nguyên hiệu ứng trong suốt trên cover và tự chuyển sang nền trắng khi cuộn xuống.
3. **Black Friday Block & Giỏ hàng:** Giữ nguyên logic countdown, deal xưởng và cart state.
4. **Không đổi tên component:** `SeasonalHeroVideoCarousel`, `BrandMarquee`, `NullHeader`, `NullHomeClient` vẫn giữ nguyên tên và export contract.

---

## 4. Kết Quả Kiểm Tra Kỹ Thuật

- `npm test`: **213/213 passed** (0 fail).
- `npm run lint`: **0 errors** (38 image warnings từ code cũ).
- `npm run build -- --webpack`: **Thành công 82/82 routes static & dynamic**.
