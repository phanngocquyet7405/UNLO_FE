# Báo Cáo Nghiệm Thu Thay Đổi: Font Tiếng Việt, Palette Nền UNLO & Chính Sách Mua Hàng

**Ngày thực hiện:** 21/11/2026  
**Mã yêu cầu:** `DOC-02-FONT`, `PALETTE-01`, `POLICY-HOME`, `POLICY-PDP`  
**Dựa trên tài liệu & hình ảnh tham chiếu:**
- `FB_FLOW_WEB.docx`
- `media_1795194400116_b60a788a.jpg` (Ảnh báo lỗi vỡ font tiếng Việt có dấu ở các tiêu đề mùa)
- `media_1795194451116_218090a2.jpg` (Ảnh mẫu danh mục sản phẩm + thanh chính sách mua hàng 4 cột + dải ticker)
- `media_1795194606953_8a83ee5c.jpg` (Bảng màu nhận diện UNLO - Milky Way Ivory Canvas `#FCFDF1`)
- `media_1795194670251_9c88adf3.png` (Khối 4 thẻ cam kết chính sách mua hàng trên trang chi tiết sản phẩm)

---

## 1. Chi Tiết Thực Hiện

### 1.1. Khắc Phục Triệt Để Lỗi Font Tiếng Việt
- **Vấn đề trước khi sửa:** Font `Climate Crisis` chỉ có bảng ký tự Latin không dấu. Khi render các cụm từ tiếng Việt như `BỘ SƯU TẬP THEO MÙA`, `BỘ SƯU TẬP XUÂN/HẠ/THU/ĐÔNG`, `ẤM ÊM NGÀY ĐÔNG LẠNH`, các ký tự có dấu `Ộ, Ư, Ậ, Đ, Ô, Ấ, Ê, Ạ` bị fallback sang font hệ thống Arial nét mỏng làm tiêu đề bị méo mó, chữ to chữ bé cọc cạch.
- **Giải pháp:**
  - Tích hợp bộ font Display Google Fonts `Montserrat` (weight 800/900 Black) và `Libre Bodoni` (Serif thời trang cao cấp) với subset `["latin", "vietnamese"]` đầy đủ 100%.
  - Cấu hình `--font-display: var(--font-montserrat), var(--font-climate-crisis), 'Plus Jakarta Sans', sans-serif;` trong `src/app/layout.js` và `globals.css`.
  - Giờ đây mọi tiêu đề mùa tiếng Việt đều hiển thị đồng nhất, nét chữ dày dặn, béo, sang trọng đúng tinh thần poster thời trang hiện đại mà không có bất kỳ ký tự nào bị rớt font.

### 1.2. Chuyển Nền Trắng Sang Nền Palette UNLO (`#FCFDF1`)
- **Vấn đề trước khi sửa:** Trang web dùng nền trắng toát `#FFFFFF` tạo cảm giác chói gắt, thiếu độ ấm áp của thương hiệu thời trang M2C.
- **Giải pháp:**
  - Chuyển token `--background: #fcfdf1;` (Milky Way Ivory từ Moodboard UNLO) trong `src/app/globals.css`.
  - Cập nhật wrapper của `NullHomeClient.jsx` sang `bg-[#FCFDF1]`, kết hợp với các thẻ Card nền trắng bo góc viền mảnh `#DCE0E7` tạo chiều sâu thị giác êm ái, thanh lịch.

### 1.3. Thêm Chính Sách Mua Hàng Theo Mẫu Ref
- **A. Dưới Danh Mục Sản Phẩm (Trang Chủ - theo Image 3):**
  - Tạo component `src/components/null/CategoryTrustBar.jsx` nhúng ngay dưới lưới 12 danh mục sản phẩm của `CategoryBrowser.jsx`.
  - 4 cột chính sách nổi bật:
    1. **Miễn phí giao hàng** — `Cho đơn từ 499.000đ`
    2. **Đổi trả trong 7 ngày** — `Đổi size, đổi mẫu dễ dàng`
    3. **Chính hãng 100%** — `Cam kết bởi UNLO Official`
    4. **Hỗ trợ 24/7** — `Tư vấn size & phối đồ`
  - Dải ticker viền nhẹ phía dưới:
    `UNLO OFFICIAL · FREESHIP ĐƠN TỪ 499K · ĐỔI TRẢ 7 NGÀY · 100% SỢI TỰ NHIÊN · UNISEX FOR EVERYONE · MẶC SAO CŨNG ĐƯỢC, MIỄN THOẢI MÁI · GIÁ TRỊ KHÔNG CẦN GỌI TÊN`.
- **B. Trên Trang Chi Tiết Sản Phẩm & Custom Studio (theo Image 5):**
  - Tạo component `src/components/null/ProductPurchasePolicies.jsx` gồm 4 thẻ cam kết viền mảnh:
    1. **Cam kết hình ảnh giống mô tả**: Ảnh thực tế từ xưởng may, chuẩn màu sắc & chất liệu.
    2. **Hỗ trợ đổi trả**: Đổi size, đổi màu trong vòng 7 ngày.
    3. **Ưu đãi giảm giá**: Giá xưởng M2C, chiết khấu lũy tiến từ 10 sản phẩm.
    4. **Đội ngũ tư vấn 24/7**: Chuyên viên & thợ may hỗ trợ thông số đo thực tế 24/7.
  - Nhúng trực tiếp vào `NullProductDetailClient.jsx` (dưới nút Mua ngay) và `CustomStudioClient.jsx`.

---

## 2. Kết Quả Kiểm Thử Kỹ Thuật

- **ESLint (`npm run lint`):** 0 errors (41 warnings thẻ `<img>` cũ).
- **Unit Tests (`npm test`):** 213/213 test pass (100%).
- **Build (`npm run build -- --webpack`):** 82/82 routes tĩnh & động compile thành công.
