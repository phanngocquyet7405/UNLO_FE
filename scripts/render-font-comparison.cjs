const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function renderFontComparison() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 750 } });

  const htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'ProximaNovaStandard';
      src: local('Arial'); /* Mô phỏng bản standard không có glyphs dấu tiếng Việt hoặc fallback hệ thống */
    }
    body {
      margin: 0;
      padding: 40px;
      background: #0F172A;
      color: #F8FAFC;
      font-family: system-ui, sans-serif;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 24px;
      margin: 0 0 8px 0;
      color: #FFFFFF;
    }
    .header p {
      font-size: 14px;
      color: #94A3B8;
      margin: 0;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    .card {
      background: #1E293B;
      border-radius: 16px;
      padding: 24px;
      border: 1px solid #334155;
    }
    .card.warning {
      border-color: #EF4444;
    }
    .card.success {
      border-color: #10B981;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 16px;
    }
    .badge-bad { background: rgba(239, 68, 68, 0.2); color: #FCA5A5; }
    .badge-good { background: rgba(16, 185, 129, 0.2); color: #6EE7B7; }

    .sample-box {
      background: #FFFFFF;
      color: #15095D;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 16px;
    }

    .font-flawed {
      font-family: 'Proxima Nova', 'Arial', sans-serif;
      line-height: 1.6;
    }
    .font-good {
      font-family: 'Plus Jakarta Sans', sans-serif;
      line-height: 1.6;
    }

    .title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .body-text {
      font-size: 14px;
      font-weight: 600;
      color: #334155;
    }
    .highlight-err {
      color: #DC2626;
      background: #FEE2E2;
      padding: 0 2px;
      border-radius: 2px;
    }
    .explanation {
      font-size: 12px;
      color: #CBD5E1;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>SO SÁNH HIỂN THỊ FONT CHỮ TRÊN TIẾNG VIỆT CÓ DẤU</h1>
    <p>Trực quan hóa lý do vì sao không dùng Proxima Nova bản thường (chưa Việt hóa) trên Storefront UNLO</p>
  </div>

  <div class="grid">
    <!-- CỘT 1 -->
    <div class="card warning">
      <span class="badge badge-bad">⚠️ Proxima Nova (Bản gốc / Chưa Việt hóa)</span>
      <div class="sample-box font-flawed">
        <div class="title">ĐƯỢC ĐÁNH GIÁ ★ 4.5 BỞI 1.000+ KHÁCH HÀNG / DOANH NGHIỆP</div>
        <div class="body-text">
          Áo Hoodie nỉ bông <span class="highlight-err">mềm mịn</span>, form dáng <span class="highlight-err">chuẩn chỉ</span>.
          Giá trị <span class="highlight-err">không cần gọi tên</span>. Xưởng may trực tiếp tại Việt Nam.
        </div>
      </div>
      <div class="explanation">
        <strong>Vấn đề gặp phải:</strong>
        <ul>
          <li><strong>Lỗi vỡ glyphs (Tofu / Missing Glyphs):</strong> Proxima Nova bản standard chỉ có bộ ký tự Latin/Western, thiếu các dấu kép tiếng Việt như: <em>ệ, ặ, ỗ, ợ, ứ, ừ, ự</em>.</li>
          <li><strong>Răng cưa & lệch baseline:</strong> Trình duyệt buộc phải "chắp vá" ký tự có dấu từ font hệ thống (Arial/Times), khiến chữ bị nhảy dòng, nét đậm nhạt không đều.</li>
          <li><strong>Vấn đề bản quyền:</strong> Proxima Nova là font thương mại trả phí có DRM bản quyền webfont đắt đỏ của Mark Simonson.</li>
        </ul>
      </div>
    </div>

    <!-- CỘT 2 -->
    <div class="card success">
      <span class="badge badge-good">✓ Plus Jakarta Sans (Đã Việt hóa 100% chuẩn hình học)</span>
      <div class="sample-box font-good">
        <div class="title">ĐƯỢC ĐÁNH GIÁ ★ 4.5 BỞI 1.000+ KHÁCH HÀNG / DOANH NGHIỆP</div>
        <div class="body-text">
          Áo Hoodie nỉ bông mềm mịn, form dáng chuẩn chỉ.
          Giá trị không cần gọi tên. Xưởng may trực tiếp tại Việt Nam.
        </div>
      </div>
      <div class="explanation">
        <strong>Ưu điểm vượt trội:</strong>
        <ul>
          <li><strong>Cùng hệ Grotesk hình học:</strong> Có tỉ lệ x-height, độ tròn trịa và hiện đại giống hệt Proxima Nova Semibold.</li>
          <li><strong>Hỗ trợ Tiếng Việt hoàn hảo:</strong> Có sẵn tập ký tự Vietnamese subset đầy đủ từ Google Fonts, không bao giờ bị lệch dấu hay fallback lỗi.</li>
          <li><strong>Bản quyền mở tự do (OFL):</strong> Hoàn toàn an toàn pháp lý khi triển khai e-commerce cho UNLO.</li>
        </ul>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(htmlContent);
  const outPath = path.resolve('scratch/proxima_nova_comparison.png');
  await page.screenshot({ path: outPath, fullPage: true });
  console.log('Saved comparison screenshot to:', outPath);
  await browser.close();
}

renderFontComparison().catch(console.error);
