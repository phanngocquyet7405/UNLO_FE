# BÁO CÁO THỰC HIỆN THAY ĐỔI: DOC-01 (HEADER / THANH CÔNG CỤ)

> **Mã tài liệu:** `docs/results/changes/2026-11-20_01_header_toolbar.md`  
> **Hạng mục:** DOC-01 — Header / Thanh công cụ & Chuyển đổi ngôn ngữ  
> **Thời điểm:** 20/11/2026  
> **Kỹ sư chịu trách nhiệm:** Senior Front-end Engineer + UI/UX Designer  

---

## 1. SO SÁNH TRƯỚC VÀ SAU (BEFORE & AFTER)

### 1.1. Trên Desktop (1440px)
| Tiêu chí | Trước khi sửa (Baseline) | Sau khi sửa (Đạt chuẩn DOC-01) |
| :--- | :--- | :--- |
| **Khoảng cách Logo** | Logo UNLO bị ép sát thanh promo phía trên do chiều cao header chỉ 70px và thiếu padding trên. | Tăng chiều cao lên 82px, bổ sung padding trên `pt-2`, logo UNLO có khoảng thở êm ái, cân đối chính giữa. |
| **Chuyển đổi ngôn ngữ** | Nút đơn `VN/ENG` bấm lặp, chưa hỗ trợ đồng bộ SSR cookie `NULL_LOCALE`. | Nâng cấp thành cụm pill đôi `[VN \| EN]`, hiển thị rõ trạng thái đang chọn, kết nối trực tiếp Server Action `setLocale`. |
| **Thống nhất ngôn ngữ** | Xen lẫn từ tiếng Anh: "Shop All", "Shop Flashsale", "Best Sellers", "My Account", "Start a Return". | Thuần nhất 100%: khi chọn VN hiển thị 100% tiếng Việt; khi chọn EN hiển thị 100% tiếng Anh chuẩn. |
| **Nút Flashsale & Icon AI** | Còn nút "Shop Flashsale" và icon lấp lánh `Sparkles` (✦) ở nhãn Cá nhân hóa và Promo. | Đã loại bỏ hoàn toàn nút "Shop Flashsale"; xóa 100% icon `Sparkles` và ký tự `✦` (thay bằng bullet `·`). |
| **Icon Giỏ hàng** | Dùng icon túi mặc định có nét vẽ dày hoặc đen khi scroll. | Thay bằng SVG `CartLineBagIcon` line trắng mảnh 1.8px thanh lịch, sắc sảo. |
| **Bố cục Opts 2** | Duy trì Header Hybrid: Trong suốt overlay khi ở đầu trang, chuyển nền trắng khi scroll > 24px. | Duy trì 100% cơ chế Opts 2, biến `--header-h` tự động co giãn không sinh khoảng trắng. |

### 1.2. Trên Mobile (390px)
| Tiêu chí | Trước khi sửa (Baseline) | Sau khi sửa (Đạt chuẩn DOC-01) |
| :--- | :--- | :--- |
| **Header thanh gọn** | Logo bị dính sát mép trên; Drawer có lẫn từ tiếng Anh. | Thêm đệm `pt-1`, logo UNLO cân đối; Drawer hỗ trợ đổi ngôn ngữ tức thì và loại bỏ icon Sparkles. |
| **Icon Giỏ hàng đáy & Drawer** | Icon giỏ hàng cũ chưa đồng nhất nét line. | Đồng bộ toàn bộ icon giỏ hàng trong Header, Drawer và `NullMobileBottomNav` thành túi line tối giản. |

---

## 2. BẢNG CHI TIẾT THAY ĐỔI THEO MÃ DOC

| Mã DOC | Khu vực | Trước | Sau | File đã sửa |
| :--- | :--- | :--- | :--- | :--- |
| **DOC-01.1** | Khoảng cách Logo | `min-h-[58px] ... lg:min-h-[70px]`, thiếu padding trên | `min-h-[66px] ... lg:min-h-[82px] py-3.5`, thêm `pt-2` | `src/components/null/NullHeader.jsx` |
| **DOC-01.2** | Chuyển đổi ngôn ngữ | Nút đơn `VN/ENG`, config chỉ cho phép locale `"vi"` | Cụm pill đôi `[VN \| EN]`, mở rộng `SUPPORTED_LOCALES = ["vi", "en"]` | `src/i18n/config.js`<br>`src/components/null/NullHeader.jsx` |
| **DOC-01.3** | Thống nhất ngôn ngữ | Trộn lẫn Anh/Việt trên menu và promo banner | Tách song ngữ `NAV_GROUPS` (`labelVi`, `labelEn`), thuần nhất 100% | `src/components/null/NullHeader.jsx` |
| **DOC-01.4** | Bỏ Flashsale & Icon AI | Nút `Shop Flashsale` + icon `Sparkles` (✦) | Bỏ hoàn toàn nút Flashsale và các icon `Sparkles`, đổi `✦` thành `·` | `src/components/null/NullHeader.jsx`<br>`src/components/null/SeasonalHeroVideoCarousel.jsx` |
| **DOC-01.5** | Icon giỏ hàng | Dùng Lucide `ShoppingBag` | SVG `CartLineBagIcon` line trắng nét mảnh 1.8px tối giản | `src/components/null/NullHeader.jsx`<br>`src/components/null/NullMobileBottomNav.jsx` |

---

## 3. DANH SÁCH "KHÔNG ĐỘNG TỚI" (BẢO TOÀN NGUYÊN VẸN)
- Giữ nguyên 100% cấu trúc logic giỏ hàng (`CartContext`, `cartCount`, `useCart`).
- Giữ nguyên 100% danh sách yêu thích (`WishlistContext`).
- Giữ nguyên 100% luồng đăng nhập / đăng xuất (`AppContext`, `user`, `logout`).
- Giữ nguyên 100% route `/products`, `/bundles`, `/factories`, `/b2b`, `/returns`.
- Giữ nguyên toàn bộ cấu hình SEO, metadata, favicon.

---

## 4. KẾT QUẢ KIỂM THỬ KỸ THUẬT (VERIFICATION)
1. **Lint:** `npm run lint` $\rightarrow$ **0 errors** (38 warnings Next/Image cũ).
2. **Unit Tests:** `npm test` $\rightarrow$ **213/213 test PASS 100%** (0 fails).
3. **Build Webpack:** `npm run build -- --webpack` $\rightarrow$ **Build thành công 82/82 routes**, không có lỗi biên dịch.

---

## 5. TỒN ĐỌNG VÀ CÂU HỎI XÁC NHẬN CHO KHÁCH
- **Đã xác nhận:**
  + Vấn đề 1: Đồng ý hiển thị giá tiền tệ VNĐ chuẩn xác theo từng dòng sản phẩm (dòng nỉ cơ bản 300.000đ).
  + Vấn đề 2: Bỏ qua mục "cần bỏ" bị trống, giữ đầy đủ flow sản phẩm như ref.
  + Vấn đề 3: Đã xuất ảnh so sánh trực quan lý do chưa nên dùng Proxima Nova bản thường (tránh vỡ dấu tiếng Việt).
- **DOC-01:** Đã hoàn thành 100% các tiêu chí yêu cầu trong docx.

---

## 6. BẢNG TIẾN ĐỘ TOÀN BỘ DỰ ÁN (DOC-01 $\rightarrow$ DOC-05)

| Mã DOC | Tên hạng mục | Trạng thái | Ghi chú |
| :---: | :--- | :---: | :--- |
| **DOC-01** | Header / Thanh công cụ & Chuyển đổi ngôn ngữ | **XONG** | Đã test lint, unit test, build pass 100% |
| **DOC-02** | Cover 4 Mùa & Marquee dải xanh chữ trắng | **ĐANG LÀM** | Chuẩn bị triển khai tiếp theo |
| **DOC-03** | Trang About Us chuẩn flow Quince | **CHƯA LÀM** | Sẽ làm sau DOC-02 |
| **DOC-04** | Thứ tự Trang Chủ dưới Cover (9 khối chuẩn) | **CHƯA LÀM** | Đã có tài nguyên ảnh trích xuất từ docx |
| **DOC-05** | Trang Custom Studio & Chi tiết sản phẩm | **CHƯA LÀM** | Đã có prototype tương tác tham chiếu |
