# Báo Cáo Thay Đổi DOC-05 & Tinh Chỉnh Hoàn Thiện: Custom Studio Canvas Thực Tế, Black Friday & Header Ticker

**Ngày thực hiện:** 21/11/2026  
**Mã yêu cầu:** DOC-01 (Header), DOC-04 Mục 3 (Black Friday), DOC-04 Mục 7 (Lookbook), DOC-05 (Custom Studio)  
**Cơ sở yêu cầu:** `FB_FLOW_WEB.docx` (chị Linh Chi, K63.FTU), file mã nguồn mẫu `unlo-seasonal-custom-v2.zip` và hình ảnh phản hồi trực tiếp từ khách hàng.

---

## 1. Bảng Đối Chiếu Thay Đổi

| Mã DOC | Khu Vực | Trước | Sau | File Đã Sửa |
| :--- | :--- | :--- | :--- | :--- |
| **DOC-01** | Thanh thông báo trên cùng (Top Promo Bar) | 3 thông điệp cố định trên desktop, chữ Black Friday có gạch chân | **Luân phiên chạy từng khối một theo thời gian cố định (4s)** trên cả Desktop & Mobile; **bỏ hoàn toàn gạch chân** cho Black Friday; hiển thị sang trọng, tối giản. | `src/components/null/NullHeader.jsx` |
| **DOC-04 Mục 3** | Khối Black Friday Flashsale | Chưa có ảnh bên trái chữ Black Friday | **Thêm ảnh thời trang bên TRÁI chữ Black Friday Flashsale** (theo đúng quy tắc docx & yêu cầu quan trọng của khách); bên cạnh là cụm subtitle + tiêu đề đỏ serif + nút đen `XEM ƯU ĐÃI`; bên phải là 4 cột số đếm ngược lớn (NGÀY, GIỜ, PHÚT, GIÂY). | `src/components/null/BlackFridayCountdown.jsx` |
| **DOC-05** | Trang Custom Studio (`/ca-nhan-hoa`) | Dùng ảnh ngoại cảnh có các đốm tròn nhấp nháy trên mặt người mẫu (ảnh 4) | **Kết hợp hoàn hảo bản cũ từ file zip và bản mới hiện đại:**<br>1. **Khung áo canvas chân thực (ảnh 3 / zip):** Hiển thị áo phẳng thật (`autumn-flat.webp`, `winter-flat.webp`, `summer-flat.webp`) và người mẫu mặc thử (`model.webp`).<br>2. **Bỏ toàn bộ các dấu chấm sáng nhấp nháy** ở gấu áo và bo tay theo yêu cầu.<br>3. **Tính toán tọa độ giải phẫu học chính xác:** Neo đúng điểm tại Ngực trái (`x: 63%, y: 27%`), Giữa ngực (`x: 50%, y: 36%`), Giữa lưng (`x: 50%, y: 30%`), và Bo tay áo (`x: 86%, y: 87%`).<br>4. **Hiệu ứng thêu nổi cao cấp:** Thêu chữ (`H.L`, tên bạn...) hoặc gắn logo tải lên (+35k với icon camera) có đổ bóng chỉ may chân thực.<br>5. **Giữ nguyên 100% bản thiết kế mới bên phải:** Kiểu dáng áo (Hoodie, Polo, Sweater, Áo khoác), 5 Màu sắc (tự động tint màu áo), 3 Loại vải (thay ô tìm hiểu), Size + Modal tìm size tự động, Nút Mua ngay & Thêm vào giỏ. | `src/app/(client)/ca-nhan-hoa/CustomStudioClient.jsx` |

---

## 2. Bằng Chứng Hình Ảnh Trực Tiếp Từ Code Thật (`localhost:3005`)

Tất cả ảnh chụp được thực hiện trực tiếp từ ứng dụng Next.js đang chạy trên cổng 3005:
1. **Thanh Header Ticker (Không gạch chân, xoay vòng 4s):** `header_rotating_promo.png`
2. **Khối Black Friday Desktop (Có ảnh bên trái):** `bf_with_left_image_desktop.png`
3. **Khối Black Friday Mobile (Siêu gọn, ảnh trái + số đếm):** `bf_with_left_image_mobile.png`
4. **Custom Studio Desktop (Khung áo thật từ zip + panel thuộc tính mới):** `custom_studio_combined_desktop.png`
5. **Custom Studio Mobile (Tối ưu vuốt chạm, thêu chữ nổi chuẩn xác):** `custom_studio_combined_mobile.png`

---

## 3. Danh Sách "KHÔNG ĐỘNG TỚI" (Bảo Toàn 100%)

- **Các route hiện có:** `/products`, `/factories`, `/b2b`, `/bundles`, `/returns`, `/pages/*`, `/cart`, `/checkout` được giữ nguyên vẹn.
- **Các component cốt lõi:** `NullHeader`, `NullHomeClient`, `SeasonalHeroVideoCarousel`, `NullProductCard`, `NullFooter`, `NullProductDetailClient` không bị đổi tên hay xóa bỏ.
- **Hệ thống thanh toán & giỏ hàng:** Toàn bộ API contracts, Axios middleware, giỏ hàng, wishlist, thanh toán SePay/VietQR giữ nguyên logic nghiệp vụ.

---

## 4. Kết Quả Kiểm Tra Kỹ Thuật (Lint / Test / Build)

- **`npm test`**: **213/213 passed** (0 fail, 100% tests vượt qua).
- **`npm run lint`**: **0 errors**, 41 warnings kế thừa từ thẻ `<img>` của codebase ban đầu.
- **`npm run build -- --webpack`**: **Compiled successfully**; 82/82 static & dynamic routes xuất xưởng hoàn hảo.
