# BÁO CÁO BASELINE TRƯỚC THỰC HIỆN (PRE-CHANGE BASELINE)
## GHI NHẬN HIỆN TRẠNG TOÀN BỘ CÁC KHU VỰC THUỘC PHẠM VI DOC-01 ĐẾN DOC-05

> **Dự án:** UNLO Storefront (Next.js App Router)  
> **Thời điểm lập:** 20/11/2026  
> **Tài liệu căn cứ:** `FB_FLOW_WEB.docx` (Nguồn sự thật cao nhất), Repo hiện trạng `null-web`, Prototype `unlo_vn_ui_ux_homepage_custom_studio_prototype.html`  
> **Độ phân giải đối chiếu:** Desktop 1440px & Mobile 390px  

---

## 1. KHU VỰC DOC-01: HEADER / THANH CÔNG CỤ

### 1.1. Hiện trạng Desktop (1440px)
- **Cấu trúc:** Header hybrid overlay trong suốt trên cover, chuyển nền trắng khi scroll > 24px.
- **Logo:** Logo UNLO ở chính giữa kèm dải 4 mùa `XUÂN · HẠ · THU · ĐÔNG`. Vấn đề: Logo bị sát thanh promo trên cùng, thiếu padding thông thoáng.
- **Cụm tiện ích bên phải:** Gồm `VN / ENG`, `Tìm kiếm`, `Tài khoản`, `Wishlist`, `Giỏ hàng`.
- **Nút:** Còn nút / link "Shop All", "Shop Flashsale", "Discover Now" xen lẫn tiếng Anh/Việt. Icon lấp lánh (✦, Sparkles) còn xuất hiện ở một số nhãn. Icon giỏ hàng chưa thuần nét line trắng tối giản.
- **Ngôn ngữ:** Chưa đạt tiêu chí 100% thuần một thứ tiếng (vẫn còn "Shop Flashsale", "Best Sellers", "Start a Return", "My Account").

### 1.2. Hiện trạng Mobile (390px)
- **Menu:** Nút 3 gạch bên trái, Logo UNLO ở giữa, Giỏ hàng bên phải.
- **Khoảng cách:** Logo bị ép sát mép trên do chiều cao thanh promo hẹp.
- **Drawer:** Mobile Drawer có lẫn các từ tiếng Anh (Bestsellers, Flash sale, Custom...).

---

## 2. KHU VỰC DOC-02: COVER 4 MÙA & MARQUEE DƯỚI COVER

### 2.1. Hiện trạng Desktop (1440px)
- **Cover:** `SeasonalHeroVideoCarousel.jsx` dùng video tự động chuyển theo tháng hiện tại (Mùa Đông) và chu kỳ 30s.
- **Title 4 tab mùa:** `XUÂN · HẠ · THU · ĐÔNG` hiển thị dưới logo, nhưng font title trong video/slide chưa chuẩn `Climate Crisis`, còn lỗi dấu tiếng Việt khi scale.
- **Nút CTA trên Cover:** Chưa đủ cặp nút chuẩn `Shop All` (hoặc `Xem tất cả`) và `Discover Now` (dẫn đến `/pages/about-us`).
- **Thanh chạy dưới Cover:** Đang là `BrandMarquee.jsx` nền xanh tím, nội dung cũ ("BRANDLESS M2C · MINH BẠCH GIÁ..."), chưa sát mép đáy cover và chưa khớp nội dung chuẩn theo DOC-02:
  > *"GIẢM 20% KHI MUA TẠI WEBSITE – ƯU ĐÃI CHỈ ÁP DỤNG TẠI UNLO.VN – CHẤT LƯỢNG MINH BẠCH – GIAO TOÀN QUỐC"*

### 2.2. Hiện trạng Mobile (390px)
- Video cover bị thu nhỏ scale, chữ trên cover có nguy cơ tràn dòng hoặc mất cân đối thị giác.
- Thanh chạy dưới cover cần ép sát chân cover với nền xanh chữ trắng rõ ràng.

---

## 3. KHU VỰC DOC-03: TRANG ABOUT US (DISCOVER NOW)

### 3.1. Hiện trạng
- Route hiện tại: `/pages/about-us` nằm trong `src/app/(client)/pages/about-us/page.js`.
- Bố cục: Đang là dạng bài viết văn bản dài, chưa tổ chức thành các block chuẩn theo flow của Quince (Giá trị cốt lõi, Tầm nhìn, Sứ mệnh, Minh bạch chi phí, Hình ảnh thực tế xưởng sản xuất).
- Chân trang / Footnote: Cần đồng bộ trích dẫn thương hiệu:
  > *"UNLO ra đời với niềm tin rằng giá trị thật không nằm ở nhãn mác, mà ở chất lượng bên trong. Chúng tôi gỡ bỏ logo để tập trung vào form dáng chuẩn, đường may chỉn chu và mức giá minh bạch..."*

---

## 4. KHU VỰC DOC-04: THỨ TỰ TRANG CHỦ DƯỚI COVER

### 4.1. Hiện trạng cấu trúc trang chủ hiện tại (`NullHomeClient.jsx`)
1. Seasonal Hero Video Carousel
2. Brand Marquee (chữ chạy)
3. Black Friday Countdown (dạng box giữa trang)
4. Best Sellers (8 tab chi tiết: Áo thun, Sơ mi, Nỉ, Quần...)
5. Danh mục 8 icon tròn (`Factory Essentials`)
6. Triết lý M2C (khối chữ lớn)
7. HomeEmbroideryStudio
8. Verified Factories (4 xưởng)
9. Banner Combo 3-5 món
10. Trust Bar
11. Footer

### 4.2. Vấn đề so với DOCX
- Quá nhiều chữ ("lướt mãi không thấy sản phẩm").
- Thứ tự sai lệch hoàn toàn so với chỉ đạo của docx:
  1. Thanh chạy chữ xanh (DOC-02)
  2. Danh mục sản phẩm (ảnh table từ docx)
  3. Black Friday (ảnh bên trái chữ BLACK FRIDAY + countdown bên cạnh, 1 hàng)
  4. Best Selling (thanh lọc 3 mục: NAM - NỮ - TRẺ EM, lưới 4 ảnh)
  5. Nút "XEM TẤT CẢ DANH MỤC SẢN PHẨM"
  6. Bộ sưu tập Xuân - Hạ - Thu - Đông
  7. Khối Custom ("THÊM LỚP THÊM CHẤT", UNLO EDIT - [ngày], 4 polaroid)
  8. Đánh giá sản phẩm ("Được đánh giá ★ 4.5 bởi 1.000+ khách hàng/doanh nghiệp")
  9. Footer chuẩn
- Các khối chữ rườm rà (Triết lý dài dòng, danh sách nhà máy) cần đưa vào trang con (/pages/about-us, /factories) theo đúng nguyên tắc bảo toàn dữ liệu.

---

## 5. KHU VỰC DOC-05: TRANG CUSTOM STUDIO & CHI TIẾT SẢN PHẨM

### 5.1. Hiện trạng
- `PersonalizationStudio.jsx` & `HomeEmbroideryStudio.jsx` đang có tính năng thêu chữ nhưng:
  + Hotspot vị trí thêu bị lệch tọa độ giữa các form áo khác nhau.
  + Thiếu chuyển tab các mặt: Mặt trước / Mặt sau / Ống tay áo / Model mặc thử.
  + Chưa có chức năng upload ảnh thiết kế riêng qua icon Camera (từ Drive / File / Thư viện) kèm tính phí minh bạch (+35.000đ vs +15.000đ thêu chữ).
  + Ô chọn vải chưa hiển thị Cotton / Linen / Len.
  + Giá sản phẩm hiển thị trong docx là "300VNĐ" (nghi thiếu ba số 0 -> cần xác nhận 300.000đ).
  + Thiếu nút "Tìm size phù hợp cho tôi" và modal tính toán size nhanh theo Chiều cao / Cân nặng.

---

## 6. KẾT QUẢ KIỂM TRA CHẤT LƯỢNG BAN ĐẦU
- **Lint:** Pass 100% (0 errors, 38 warnings liên quan đến Next/Image).
- **Unit Tests:** Pass 213/213 tests (0 failures).
- **Build Webpack:** Pass khi kích hoạt cờ môi trường `$env:CI="true"; $env:ALLOW_SITEMAP_FALLBACK="true"`.
