# UNLO — Design System (Brandless M2C Apparel & Embroidery Custom Studio)

Tài liệu chuẩn hóa nhận diện thương hiệu UNLO theo yêu cầu từ `FB_FLOW_WEB.docx` (chị Linh Chi, K63.FTU) và định hướng Brandless M2C / Quince / Ersa Nails. Thay thế toàn bộ hệ thống thiệp cưới / Zazzle cũ.

---

## 1. Bản Sắc & Định Vị Thương Hiệu (Brand Identity)
- **Định vị:** Thời trang cơ bản Brandless M2C (Manufacturer to Consumer) chất lượng cao, minh bạch giá thành tại xưởng, kết hợp xưởng thêu thủ công cá nhân hóa theo yêu cầu.
- **Slogan & Giá trị cốt lõi:** *"Giá trị không cần gọi tên"* (Giá trị thật nằm ở chất liệu sợi tự nhiên, đường kim mũi chỉ và sự tôn trọng người mặc).
- **Nguyên tắc giao diện:** Tối giản, sang trọng, tập trung tối đa vào hình ảnh sản phẩm (giảm khối văn bản thừa trên trang chủ, chuyển thông tin chi tiết vào trang con `/pages/about-us`).

---

## 2. Hệ Thống Màu Sắc (Color Palette)
- **UNLO Midnight Navy (`--unlo-midnight` / `#15095D`)**: Màu mực chủ đạo của logo UNLO, thanh thông báo trạng thái, và các điểm nhấn nhận diện chính.
- **Deep Navy Bar (`#122348` / `#1D2F5D`)**: Thanh chạy ngang (marquee) chân thực ngay dưới cover 4 mùa.
- **White / Off-White (`#FFFFFF` / `#FAFAFA`)**: Nền tổng thể, thẻ sản phẩm, mang lại cảm giác thoáng đãng, sang trọng chuẩn quốc tế.
- **Border & Hairline (`#E8E8E8` / `#DCE0E7`)**: Đường viền siêu mảnh, tinh tế, phân tách các khối nội dung.
- **Action Black (`#000000`)**: Nút CTA chính (Mua hàng, Thêm vào giỏ, Xem ưu đãi, Xem tất cả danh mục).
- **Accent Red (`#C52222`)**: Tiêu đề nổi bật sự kiện Black Friday Flashsale.
- **Pill Active Accent (`#1E1B4B`)**: Tab được chọn (Xuân, Hạ, Thu, Đông; Nam, Nữ, Trẻ em; Kiểu dáng áo).

---

## 3. Hệ Thống Kiểu Chữ (Typography System)
Tuân thủ tuyệt đối quy định trong `FB_FLOW_WEB.docx`:
- **Tiêu đề lớn / Display Heading (`font-display`)**: **Climate Crisis** (Google Fonts / Variable Font), sử dụng cho tiêu đề chính 4 mùa Cover, tiêu đề Bộ sưu tập 2x2, và các stamp chủ đạo.
- **Chữ nhỏ / Body Copy & UI Controls (`font-sans`)**: **Proxima Nova Semibold** (và font dự phòng Sans-Serif chuẩn mực không chân), đảm bảo độ sắc nét, dễ đọc trên cả màn hình Retina Desktop và điện thoại di động.
- **Số liệu & Giá thành**: Sử dụng thuộc tính `tabular-nums` để số tiền và đồng hồ đếm ngược luôn thẳng hàng, không bị giật layout.

> [!NOTE]
> Đã loại bỏ hoàn toàn hệ thống phông chữ Libre Bodoni và phong cách thiệp cưới/Zazzle của phiên bản cũ để hai hệ font không cùng tồn tại, tránh xung đột nhận diện.

---

## 4. Kiến Trúc Trang & Luồng Chức Năng (Storefront Architecture)

### 4.1. Trang Chủ (Homepage - 9 Khối Chuẩn Hóa Theo Thứ Tự Docx)
1. **Seasonal Hero Cover (Cover 4 Mùa)**: Full tràn viền, tự chuyển Xuân → Hạ → Thu → Đông; 2 nút `Shop All` (Tất cả sản phẩm) và `Discover Now` (Khám phá - dẫn về `/pages/about-us`).
2. **Brand Marquee**: Dải băng xanh đậm chạy chữ trắng đẩy sát mép dưới cover: *"GIẢM 20% KHI MUA TẠI WEBSITE – ƯU ĐÃI CHỈ ÁP DỤNG TẠI UNLO.VN – CHẤT LƯỢNG MINH BẠCH – GIAO TOÀN QUỐC"*.
3. **Danh Mục Sản Phẩm (Category Browser)**: Lưới 6x2 (12 danh mục với hình ảnh chuẩn cắt từ docx) có thể lướt ngang trên mobile và hiển thị dạng grid thanh thoát trên desktop.
4. **Black Friday Flashsale**: Banner ngang tinh gọn theo đúng mẫu tham chiếu của khách (tiêu đề đỏ, nút đen `XEM ƯU ĐÃI`, 4 cột số đếm ngược lớn) — tối ưu kích thước để không chiếm màn hình điện thoại.
5. **Hàng Bán Chạy (Best Sellers)**: 3 tab lọc nhanh `NAM – NỮ – TRẺ EM`, lưới 4 sản phẩm/hàng kết hợp hiển thị thông tin giá xưởng minh bạch.
6. **Nút Điều Hướng Danh Mục**: Nút pill đen bo tròn *"XEM TẤT CẢ DANH MỤC SẢN PHẨM"* ngay dưới Best Sellers.
7. **Bộ Sưu Tập 4 Mùa**: Lưới 2x2 thể hiện 4 mùa với typography Climate Crisis chuẩn.
8. **UNLO Edit & Lookbook Cá Nhân Hóa**: Góc trái `UNLO EDIT – [ngày hôm nay]`, tiêu đề *"THÊM LỚP THÊM CHẤT"*, fan ảnh polaroid phối đồ, 4 tab kiểu dáng (Polo, Sweater, Hoodie, Áo khoác), dẫn link trực tiếp vào Studio.
9. **Đánh Giá & Chân Trang (Footer)**: Trích dẫn chứng thực viết thường *"Được đánh giá ★ 4.5 bởi 1.000+ khách hàng/doanh nghiệp"*, đoạn triết lý thương hiệu UNLO và hotline chính thức `0948586486`.

### 4.2. Trang Về UNLO (`/pages/about-us`)
- Thiết kế theo chuẩn luồng Quince About Us: Manifesto thương hiệu, footnote triết lý UNLO, 3 trụ cột giá trị (Chất lượng không thương hiệu, Giá xưởng minh bạch, Bền vững & Trách nhiệm), 2 sứ mệnh, và bảng so sánh giá xưởng M2C vs bán lẻ truyền thống.

### 4.3. UNLO Custom Studio (`/ca-nhan-hoa`)
- Cấu trúc tiêu đề chuẩn docx: `ÁO (HOODIE/POLO/SWEATER/ÁO KHOÁC) – UNISEX FORM RỘNG/BOXY VẢI NỈ MỀM MỊN – XÁM/BE/TRẮNG/ĐEN/XANH THAN`.
- Giá gốc: 300.000₫ (có đánh giá sao, nút yêu thích).
- Bộ chọn: 4 size (S/M/L/XL), 5 màu (Xám, Be, Đen, Xanh than, Trắng), 3 chất liệu vải (Cotton Nỉ Bông, Linen Mộc, Len Merino).
- Khung chuyển đổi 4 góc nhìn cố định: Mặt trước → Mặt sau → Ống tay áo → Model mặc thử (có chế độ tự động xoay góc nhìn).
- Tọa độ hotspot thêu định vị chính xác theo phần trăm SVG trên từng mặt áo, không bị xê dịch.
- Bảng giá dịch vụ: Thêu chữ (+15.000₫), Tải ảnh thiết kế từ Drive/Máy (+35.000₫ với icon máy ảnh).
- Modal tính size tự động *"Tìm size phù hợp cho tôi"* dựa trên chiều cao và cân nặng theo form boxy UNLO.
