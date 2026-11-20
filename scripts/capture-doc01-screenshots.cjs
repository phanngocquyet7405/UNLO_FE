const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function captureHeaderScreenshots() {
  const browser = await chromium.launch();
  
  // 1. Desktop 1440px
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Start local next server or mock the header component directly via standalone preview
  // Let's create a visual HTML snapshot containing the exact HTML of the new Header to screenshot cleanly
  const headerHtmlDesktop = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Climate+Crisis&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; background: #0B2056; }
  </style>
</head>
<body class="relative">
  <!-- Promo -->
  <div class="bg-[#15095D] text-[#E8E9FA] text-xs tracking-[0.14em] uppercase font-medium border-b border-[#1F0C85]">
    <div class="flex max-w-[1760px] mx-auto px-6 items-center justify-center gap-8 py-2.5">
      <span>· Black Friday 27.11 · Giảm đến 50%</span>
      <span>· Miễn phí giao hàng cho kiện từ 499.000đ</span>
      <span>· Giá xưởng giảm theo số lượng từ 10 sản phẩm</span>
    </div>
  </div>

  <!-- Header Hybrid Overlay -->
  <header class="w-full bg-[#15095D]/90 backdrop-blur-md border-b border-white/15">
    <div class="relative max-w-[1760px] mx-auto px-8 min-h-[82px] py-3.5 flex items-center justify-between">
      <div class="w-12"></div>

      <!-- Center Logo & 4 Seasons -->
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pt-2">
        <a href="#" class="py-1">
          <span class="text-3xl font-extrabold text-white tracking-[0.18em]">UNLO</span>
        </a>
        <nav class="flex items-center gap-6 pt-1">
          <span class="text-xs font-extrabold text-white uppercase tracking-[0.18em] border-b-2 border-white pb-0.5">Xuân</span>
          <span class="text-xs font-semibold text-white/70 uppercase tracking-[0.18em]">Hạ</span>
          <span class="text-xs font-semibold text-white/70 uppercase tracking-[0.18em]">Thu</span>
          <span class="text-xs font-semibold text-white/70 uppercase tracking-[0.18em]">Đông</span>
        </nav>
      </div>

      <!-- Right Tools -->
      <div class="flex items-center gap-3">
        <!-- Lang Pill -->
        <div class="inline-flex items-center p-0.5 rounded-full border border-white/30 bg-black/25 text-white">
          <span class="px-2.5 py-0.5 rounded-full bg-white text-[#15095D] text-xs font-bold">VN</span>
          <span class="px-2.5 py-0.5 rounded-full text-white/75 text-xs font-semibold">EN</span>
        </div>
        <!-- Search -->
        <div class="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"/></svg>
        </div>
        <!-- Account -->
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium hover:bg-white/15">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.5-1.632z"/></svg>
          <span>Tài khoản</span>
        </div>
        <!-- Wishlist -->
        <div class="relative w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
        </div>
        <!-- Cart Line Bag Icon -->
        <div class="relative w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center">
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
          <span class="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#EB6D48] text-white text-[10px] font-bold flex items-center justify-center">1</span>
        </div>
      </div>
    </div>

    <!-- ROW 2 Nav -->
    <div class="border-t border-white/15 px-8 py-2.5 max-w-[1760px] mx-auto flex items-center justify-between text-white text-xs font-semibold tracking-wide">
      <div class="flex items-center gap-8">
        <a href="#" class="border-b-2 border-white pb-0.5">Tất cả sản phẩm</a>
        <a href="#" class="text-white/80 hover:text-white">Bộ sưu tập</a>
        <a href="#" class="text-white/80 hover:text-white">Trang phục</a>
        <a href="#" class="text-white/80 hover:text-white">Phụ kiện & Đời sống</a>
        <a href="#" class="text-white/80 hover:text-white">Cá nhân hóa</a>
        <a href="#" class="text-white/80 hover:text-white">Doanh nghiệp / CLB</a>
        <a href="#" class="text-white/80 hover:text-white">Về UNLO</a>
        <a href="#" class="text-white/80 hover:text-white">Liên hệ</a>
      </div>
      <div class="relative flex items-center">
        <input type="text" placeholder="Tìm sản phẩm, xưởng..." class="w-56 h-8 pl-3.5 pr-8 rounded-full bg-white/15 border border-white/20 text-white placeholder-white/60 text-xs outline-none">
        <button class="absolute right-1 w-6 h-6 rounded-full bg-[#EB6D48] flex items-center justify-center text-white">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"/></svg>
        </button>
      </div>
    </div>
  </header>
</body>
</html>
  `;

  await pageDesktop.setContent(headerHtmlDesktop);
  const desktopOut = path.resolve('scratch/doc01_header_desktop_1440.png');
  await pageDesktop.screenshot({ path: desktopOut, clip: { x: 0, y: 0, width: 1440, height: 180 } });
  console.log('Saved Desktop Header screenshot to:', desktopOut);

  // 2. Mobile 390px
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const headerHtmlMobile = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; background: #0B2056; }
  </style>
</head>
<body class="relative">
  <!-- Promo -->
  <div class="bg-[#15095D] text-[#E8E9FA] text-[11px] tracking-[0.1em] uppercase font-medium border-b border-[#1F0C85] px-3 py-2 text-center">
    Black Friday 27.11 · Giảm đến 50%
  </div>

  <!-- Header Mobile -->
  <header class="w-full bg-[#15095D]/95 backdrop-blur-md border-b border-white/15 px-4 py-3 flex items-center justify-between">
    <!-- Menu Button -->
    <div class="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
    </div>

    <!-- Center Logo & 4 Seasons -->
    <div class="flex flex-col items-center pt-1">
      <span class="text-2xl font-extrabold text-white tracking-[0.16em]">UNLO</span>
      <div class="flex items-center gap-3 pt-0.5 text-[10px] font-bold uppercase tracking-wider text-white/80">
        <span class="text-white border-b border-white">Xuân</span>
        <span>Hạ</span>
        <span>Thu</span>
        <span>Đông</span>
      </div>
    </div>

    <!-- Right: Lang + Cart Line -->
    <div class="flex items-center gap-2">
      <div class="inline-flex items-center p-0.5 rounded-full border border-white/30 bg-black/20 text-white text-[10px] font-bold">
        <span class="px-2 py-0.5 rounded-full bg-white text-[#15095D]">VN</span>
        <span class="px-2 py-0.5 rounded-full text-white/70">EN</span>
      </div>
      <div class="relative w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center">
        <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
        <span class="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#EB6D48] text-white text-[9px] font-bold flex items-center justify-center">1</span>
      </div>
    </div>
  </header>
</body>
</html>
  `;

  await pageMobile.setContent(headerHtmlMobile);
  const mobileOut = path.resolve('scratch/doc01_header_mobile_390.png');
  await pageMobile.screenshot({ path: mobileOut, clip: { x: 0, y: 0, width: 390, height: 140 } });
  console.log('Saved Mobile Header screenshot to:', mobileOut);

  await browser.close();
}

captureHeaderScreenshots().catch(console.error);
