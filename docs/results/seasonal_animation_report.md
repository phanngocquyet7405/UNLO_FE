# BÁO CÁO NGHIỆM THU ANIMATION TỰ ĐỘNG CHUYỂN MÙA THEO THỜI GIAN
## ĐỒNG BỘ GIAO DIỆN DESKTOP & MOBILE — HỆ THỐNG 4 MÙA (XUÂN – HẠ – THU – ĐÔNG)

> **Dự án:** UNLO Storefront — Nền tảng Brandless M2C  
> **Thư mục lưu trữ:** `docs/results/seasonal_animation_report.md`  
> **Cập nhật lần cuối:** 20/11/2026  
> **Trạng thái:** HOÀN THÀNH 100% & ĐÃ KIỂM THỬ TOÀN DIỆN  

---

## 1. TỔNG QUAN YÊU CẦU & KẾT QUẢ XỬ LÝ

### Yêu cầu bổ sung từ người dùng:
1. **Khắc phục khoảng trắng lớn ở màn hình $\ge 1024px$ (Desktop):** Ở kích thước desktop, header trước đây bị gán nền trắng và đẩy cover xuống tạo ra một dải trắng lớn che khuất logo; yêu cầu đồng bộ 100% bản web desktop giống hệt bản mobile (header trong suốt phủ tràn viền lên trên video cover).
2. **Bỏ phần pause video:** Bỏ tính năng tạm dừng video khi rê chuột; video phải chuyển động liên tục và các mùa tự động chuyển tiếp qua lại nhịp nhàng từ **1 (Xuân) $\rightarrow$ 2 (Hạ) $\rightarrow$ 3 (Thu) $\rightarrow$ 4 (Đông) $\rightarrow$ 1 (Xuân)**.
3. **Tự động nhận diện tháng hiện tại làm điểm target ban đầu:** Hệ thống tự động kiểm tra tháng thực tế của khách hàng khi truy cập trang để chọn mùa tương ứng làm điểm xuất phát đầu tiên, sau đó tiếp tục luân chuyển qua các mùa tiếp theo theo thời gian.

---

## 2. CHI TIẾT KỸ THUẬT & GIẢI PHÁP ĐÃ THỰC HIỆN

### 2.1. Đồng bộ Header & Xóa bỏ triệt để khoảng trắng ở $\ge 1024px$
- **Nguyên nhân cũ:**
  - Trong `NullHeader.jsx`, lớp CSS `isTransparent` có khai báo `lg:bg-white lg:border-b lg:border-[#DDE0EC]` khiến màn hình $\ge 1024px$ bị ép nền trắng đặc.
  - Logo màu trắng (`brightness-0 invert`) bị chìm vào nền trắng của header desktop.
  - Trong `SeasonalHeroVideoCarousel.jsx`, thuộc tính `-mt-[var(--header-h)] lg:mt-0` bị reset ở desktop (`lg:mt-0`), đẩy video tụt xuống dưới.
- **Giải pháp xử lý:**
  - Loại bỏ hoàn toàn `lg:bg-white` và `lg:mt-0`.
  - Trên cả Desktop và Mobile, khi ở đầu trang, header luôn giữ chế độ **`bg-transparent border-transparent shadow-none`** phủ trực tiếp lên bìa Cover video.
  - Logo UNLO luôn giữ màu trắng sáng tinh tế kèm dải 4 mùa `XUÂN · HẠ · THU · ĐÔNG` ngay phía dưới logo.
  - Các nút công cụ bên phải (Language Switcher, Search, Account, Wishlist, Giỏ hàng) đều mang sắc trắng đồng bộ trên nền video.

### 2.2. Cơ chế Video Chuyển Động Liên Tục & Bỏ Pause Hover
- Loại bỏ cờ trạng thái `isHovered` và nút Pause.
- Video được thiết lập chạy liên tục (`autoplay loop muted playsInline`) và không bị ngắt quãng khi người dùng di chuột qua lại.
- Bộ đếm thời gian 30 giây (`SEASON_DURATION_MS = 30000`) và thanh tiến trình liên tục chạy mượt mà theo chu kỳ tự động.

### 2.3. Tự động nhận diện Tháng hiện tại làm Điểm Target Khởi Đầu
Xây dựng thuật toán ánh xạ tự động 12 tháng vào 4 mùa chuẩn thời trang:
```javascript
export function getSeasonIndexByCurrentMonth(month = new Date().getMonth() + 1) {
  // Xuân (1): Tháng 1, 2, 3   -> index 0
  // Hạ   (2): Tháng 4, 5, 6   -> index 1
  // Thu  (3): Tháng 7, 8, 9   -> index 2
  // Đông (4): Tháng 10, 11, 12 -> index 3
  if (month >= 1 && month <= 3) return 0;
  if (month >= 4 && month <= 6) return 1;
  if (month >= 7 && month <= 9) return 2;
  return 3;
}
```
- **Ví dụ vận hành:**
  - Khách truy cập vào **Tháng 11** $\rightarrow$ Hệ thống tự động xác định `month = 11` $\rightarrow$ Target ngay **MÙA ĐÔNG (index 3)**.
  - Sau 30 giây $\rightarrow$ Tự động chuyển tiếp sang **MÙA XUÂN (index 0)** $\rightarrow$ **MÙA HẠ (index 1)** $\rightarrow$ **MÙA THU (index 2)** $\rightarrow$ **MÙA ĐÔNG (index 3)** tuần hoàn không ngừng.

---

## 3. KẾT QUẢ ĐO ĐẠC THỰC TẾ & ẢNH CHỤP NGHIỆM THU

### 3.1. Đo màu sắc Header Desktop $\ge 1024px$
- Phân tích pixel vùng Header Desktop tại kích thước `1280×900`:
  - **Màu nền trung bình:** `BGR: [49.9, 34.2, 40.8]` (Tone xanh tím navy trong suốt phủ trên video).
  - Hoàn toàn **KHÔNG CÒN NỀN TRẮNG** (`BGR: [255, 255, 255]`).
  - Giao diện bản Desktop và bản Mobile đã đồng bộ hoàn hảo 100%.

### 3.2. Ảnh Chụp Nghiệm Thu Đính Kèm
- **Desktop (1280px) Đã Đồng Bộ Không Còn Khoảng Trắng:**
  `screenshots/opts2_desktop_sync_1280.png`
- **Mobile (375px) Đồng Bộ:**
  `screenshots/opts2_mobile_sync_375.png`

---

## 4. BẢNG TỔNG HỢP TRẢI NGHIỆM TRÊN CẢ DESKTOP & MOBILE

| Tiêu Chí | Bản Mobile (<1024px) | Bản Desktop ($\ge 1024px$) | Đánh Giá Đồng Bộ |
| :--- | :--- | :--- | :---: |
| **Kiểu Header** | Trong suốt overlay trên Cover | Trong suốt overlay trên Cover | **ĐỒNG BỘ 100%** |
| **Vị trí Logo UNLO** | Căn giữa tuyệt đối | Căn giữa tuyệt đối | **ĐỒNG BỘ 100%** |
| **Dải 4 mùa dưới Logo** | `XUÂN · HẠ · THU · ĐÔNG` | `XUÂN · HẠ · THU · ĐÔNG` | **ĐỒNG BỘ 100%** |
| **Nút 3/4 kẻ ngang Menu** | Icon gạch mở Drawer | Đã ẩn hoàn toàn (`lg:hidden`) theo đề xuất | **TỐI ƯU DESKTOP** |
| **Thanh nav_bar chính** | Rút gọn trong Drawer | Đầy đủ 8 mục cha (kèm "Liên hệ") | **HIỆN ĐẠI & TRỰC QUAN** |
| **Mục "Liên hệ"** | Mục cha độc lập + Thẻ CSKH | Mục cha độc lập trên nav_bar | **DỄ TIẾP CẬN 100%** |
| **Target tháng ban đầu** | Tự động theo tháng thực | Tự động theo tháng thực | **ĐỒNG BỘ 100%** |
| **Chu kỳ chuyển tiếp** | 30s tuần hoàn tự động | 30s tuần hoàn tự động | **ĐỒNG BỘ 100%** |
| **Phát video** | Chuyển động liên tục | Chuyển động liên tục | **ĐỒNG BỘ 100%** |

---

## 5. BỔ SUNG TINH CHỈNH THEO ĐỀ XUẤT MỚI NHẤT

### 5.1. Bỏ thanh Menu 4 hàng ngang bên trái tầng 1 trên Desktop
- Trên màn hình Desktop ($\ge 1024px$), người dùng đã có thanh `nav_bar` chính để chuyển trang nhanh chóng, nên nút Menu 4 hàng ngang (hamburger) bên trái tầng 1 được ẩn hoàn toàn (`lg:hidden`).
- Logo UNLO và dải 4 mùa `XUÂN · HẠ · THU · ĐÔNG` ở giữa tiếp tục giữ vị trí trung tâm tuyệt đối, tạo bố cục cân đối và thoáng mắt.
- Trên Mobile & Tablet ($< 1024px$), nút Menu vẫn hiển thị để mở Drawer điều hướng kèm Thẻ Liên Hệ & Hỗ Trợ Xưởng trực tiếp.

### 5.2. Đưa "Liên hệ" từ "Về UNLO" lên làm Cha trực tiếp trên thanh `nav_bar`
- Tách `Liên hệ` ra khỏi danh sách con của dropdown `Về UNLO`.
- Đưa `Liên hệ` (`/pages/contact-us`) thành mục cha cấp 1 (Parent link) trực tiếp trên thanh `nav_bar`:
  1. `Tất cả sản phẩm`
  2. `Bộ sưu tập`
  3. `Trang phục`
  4. `Phụ kiện & Đời sống`
  5. `Cá nhân hóa`
  6. `Doanh nghiệp`
  7. `Về UNLO`
  8. **`Liên hệ`** (Mục cha mới)
- Trên Mobile Drawer: `Liên hệ` cũng hiển thị trực tiếp là mục menu cấp 1 ở danh sách liên kết.

### 5.3. Đánh giá & Hướng xử lý hiện tượng mất Logo khi gửi link qua Zalo / Messenger
1. **Nguyên nhân:**
   - **Vercel Preview Protection (SSO/Password):** Với các link preview branch dạng `unlo-fe-git-feat-header-hybrid-*.vercel.app`, mặc định Vercel có thể bật chế độ bảo vệ (Deployment Protection). Crawler bot của Zalo hoặc Facebook khi truy cập link này sẽ nhận mã `401 Unauthorized` hoặc chuyển hướng đăng nhập Vercel, khiến bot không cào được thẻ `<meta property="og:image">`.
   - **Cơ chế Cache của Zalo:** Zalo lưu bộ đệm preview cực kỳ lâu. Nếu lần đầu chia sẻ link mà website chưa build xong hoặc bot chưa cào kịp, Zalo sẽ ghi nhớ trạng thái rỗng (như hình chụp ngày 19/11 khi gửi lần đầu không có logo, nhưng gửi lại bên dưới thì đã có logo vuông tím UNLO chuẩn xác).
2. **Hướng xử lý & Kiểm tra:**
   - Đã cấu hình đầy đủ `metadataBase`, thẻ chuẩn `openGraph.images` và `twitter.images` kèm file hình ảnh vuông nhận diện `unlo-icon-512.png` và `opengraph-image.png`.
   - Đối với domain chính thức `https://unlo.vn`: Zalo và Messenger đã nhận diện logo UNLO chuẩn xuất khẩu.
   - Đối với link Preview: Nếu muốn gửi test trên Zalo hiển thị ngay lập tức, chỉ cần thêm tham số đổi đuôi: ví dụ `?v=2` hoặc `?share=zalo` để buộc Zalo xóa cache và tải lại thẻ hình ảnh.

---

## 6. TRẠNG THÁI KIỂM THỬ MÃ NGUỒN

- **Unit Tests:** `npm test` $\rightarrow$ **213/213 test pass** (100%).
- **ESLint:** `npx eslint` $\rightarrow$ **0 errors**.
- **Playwright Verification:**
  - `menuBtnHiddenOnDesktop: true` (Nút menu tầng 1 đã ẩn trên desktop).
  - `navLinks`: Đầy đủ 8 mục bao gồm `Liên hệ` là mục cha.
  - `contactHref`: `/pages/contact-us`.
  - `Mobile menu button exists: true` & Drawer chứa `Liên hệ`.
