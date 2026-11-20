# Báo Cáo Thay Đổi DOC-03 & DOC-04: Cải Tổ Song Ngữ Thuần & Thứ Tự 9 Khối Trang Chủ

**Ngày thực hiện:** 20/11/2026  
**Mục tiêu:** 
1. Cải tổ hệ thống ngôn ngữ VN ⇄ EN triệt để: Mặc định Tiếng Việt thuần 100% (không đan xen tiếng Anh); khi chuyển sang EN thuần 100% tiếng Anh.
2. Hoàn thiện DOC-03: Trang About Us chuẩn Quince flow (triết lý, giá trị cốt lõi, sứ mệnh, footnote UNLO).
3. Hoàn thiện DOC-04: Sắp xếp đúng 9 khối trang chủ dưới cover theo yêu cầu của chị Linh Chi trong `FB_FLOW_WEB.docx`.

---

## 1. Bảng Đối Chiếu Thay Đổi

| Mã DOC | Khu Vực | Trước | Sau | File Đã Sửa |
| :--- | :--- | :--- | :--- | :--- |
| **DOC-01..04** | Ngôn ngữ hệ thống (i18n) | Đan xen tiếng Anh và tiếng Việt (`SHOP ALL`, `DISCOVER NOW`, `FACTORY DIRECT`, `Shop by collections`, `OUR VALUES`, `(About Us)`...) | Cải tổ 100% bằng `useLanguage()`: Ở chế độ VI hiển thị thuần tiếng Việt; ở chế độ EN hiển thị thuần tiếng Anh | `src/i18n/useLanguage.js`, `NullHeader.jsx`, `SeasonalHeroVideoCarousel.jsx`, `BrandMarquee.jsx` |
| **DOC-03** | Trang About Us (`/pages/about-us`) | Còn đan xen tiếng Anh ở thẻ đề mục | Chuẩn hóa theo Quince: Big Idea & Key Message, Nguồn cảm hứng khởi nguyên (footnote UNLO), 3 trụ cột giá trị, 2 sứ mệnh so le với ảnh thợ may, biểu đồ so sánh giá | `src/app/(client)/pages/about-us/page.js` |
| **DOC-04 Mục 2** | Thanh tìm theo danh mục SP | Dạng icon tròn cũ 8 mục | `CategoryBrowser.jsx`: Lưới 6x2 (12 danh mục theo docx: Áo khoác, Áo nỉ/len, Sơ mi, Polo, Áo thun, Quần, Quần dài/short, Đồ lót/mặc nhà, Đồ ngủ, Phụ kiện, BST Hợp tác, Thẻ quà tặng) | `src/components/null/CategoryBrowser.jsx` |
| **DOC-04 Mục 3** | Black Friday Flash Sale | Chiếm nhiều diện tích dọc | `BlackFridayCountdown.jsx`: Thu về 1 hàng tinh gọn: Ảnh người mẫu bên trái + Đồng hồ đếm ngược + 4 Deal nhanh | `src/components/null/BlackFridayCountdown.jsx` |
| **DOC-04 Mục 4-5** | Best Sellers (Hàng bán chạy) | Tabs phân theo danh mục sản phẩm | `BestSellersSection.jsx`: 3 Tabs đối tượng `NAM – NỮ – TRẺ EM` bên phải; lưới 4 cột x 2 hàng; Nút viên thuốc `XEM TẤT CẢ DANH MỤC SẢN PHẨM` ngay dưới | `src/components/null/BestSellersSection.jsx` |
| **DOC-04 Mục 6** | Bộ sưu tập theo mùa | Tên cũ `Shop by collections` | `SeasonalCollectionsSection.jsx`: Tiêu đề Climate Crisis `BỘ SƯU TẬP THEO MÙA` (Xuân - Hạ - Thu - Đông), lưới 2x2 ảnh editorial | `src/components/null/SeasonalCollectionsSection.jsx` |
| **DOC-04 Mục 7** | Khối custom studio | Form studio dài dòng trên trang chủ | `CustomLookbookEdit.jsx`: UNLO EDIT - ngày hôm nay, Tiêu đề `Thêm lớp. Thêm chất.`, Subtitle, Nút `TÌM BẢN PHỐI CỦA BẠN →`, quạt 3 ảnh polaroid, dải tabs Polo/Sweater/Hoodie/Áo khoác | `src/components/null/CustomLookbookEdit.jsx` |
| **DOC-04 Mục 8** | Đánh giá sản phẩm | Không có khối đánh giá chuyên biệt | `CustomerTestimonials.jsx`: `ĐÁNH GIÁ SẢN PHẨM`, câu quote viết thường `"Được đánh giá ★ 4.5 bởi 1.000+ khách hàng/doanh nghiệp"`, 4 thẻ review | `src/components/null/CustomerTestimonials.jsx` |
| **DOC-04 Mục 9** | Footer UNLO | Footer chung thiếu triết lý và hotline | `NullFooter.jsx`: Logo UNLO + Đoạn giá trị triết lý docx + Hotline `0948586486` | `src/components/null/NullFooter.jsx` |

---

## 2. Bằng Chứng Hình Ảnh Trực Tiếp Từ Code Thật (`localhost:3005`)

- **Danh mục 6x2 & Black Friday 1 hàng:** `doc04_categories_bf.png`
- **Hàng bán chạy (3 tab Nam/Nữ/Trẻ em) & Nút Xem tất cả:** `doc04_bestsellers_cards.png`
- **Bộ sưu tập theo mùa (Lưới 2x2 font Climate Crisis):** `doc04_custom_lookbook.png`
- **Khối "Thêm lớp. Thêm chất." (Quạt 3 ảnh Polaroid):** `doc04_footer_manifesto.png`
- **Đánh giá sản phẩm & Footer Triết lý + Hotline 0948586486:** `doc04_testimonials_and_footer.png`

---

## 3. Danh Sách "KHÔNG ĐỘNG TỚI" (Bảo Toàn Hệ Thống)

1. **Routing & Core APIs:** Giữ nguyên các route `/products`, `/factories`, `/b2b`, `/bundles`, `/returns`, `/ca-nhan-hoa`.
2. **Logic Giỏ Hàng & Checkout:** Toàn bộ `CartContext`, `WishlistContext`, `tokenMiddleware`, Axios contracts nguyên vẹn 100%.
3. **Admin & Merchant:** Giữ nguyên 100% routes `/admin-*` và `/manager/*`.

---

## 4. Kết Quả Kỹ Thuật

- `npm test`: **213/213 passed** (0 fail).
- `npm run lint`: **0 errors** (40 warnings kế thừa từ code cũ).
- `npm run build -- --webpack`: **Thành công 82/82 routes**.
