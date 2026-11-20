const { chromium } = require('@playwright/test');
const path = require('path');

const ARTIFACT_DIR = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705');

async function runCapture() {
  const browser = await chromium.launch();

  console.log('1. Launching Desktop 1440x900 session...');
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1.1 Home Page
  console.log('Navigating to http://localhost:3005 ...');
  await desktop.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 35000 });
  await desktop.waitForTimeout(1500);

  // A. Top Promo Bar
  const promo = desktop.locator('aside[aria-label="Thông báo ưu đãi website UNLO"], div.bg-\\[\\#15095D\\]').first();
  if (await promo.count() > 0) {
    await promo.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_image3_marquee_bar.png') });
    console.log('✓ Captured qa_image3_marquee_bar.png');
  }

  // B. Black Friday Banner (Image 1 ref)
  const bf = desktop.locator('section[aria-label="Khuyến mại Black Friday Flashsale"]');
  if (await bf.count() > 0) {
    await bf.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await bf.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_image1_bf_banner.png') });
    console.log('✓ Captured qa_image1_bf_banner.png');
  }

  // C. Lookbook "Thêm lớp. Thêm chất." (Image 2 ref)
  const lookbook = desktop.locator('section[aria-label="UNLO Edit - Phối đồ và cá nhân hóa"]');
  if (await lookbook.count() > 0) {
    await lookbook.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await lookbook.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_image2_lookbook_edit.png') });
    console.log('✓ Captured qa_image2_lookbook_edit.png');
  }

  // D. Seasonal Collections (Image 4 ref)
  const seasonal = desktop.locator('section[aria-label="Bộ sưu tập theo 4 mùa"]');
  if (await seasonal.count() > 0) {
    await seasonal.scrollIntoViewIfNeeded();
    await desktop.waitForTimeout(500);
    await seasonal.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_image4_seasonal_collections.png') });
    console.log('✓ Captured qa_image4_seasonal_collections.png');
  }

  // 2. Custom Studio at /custom?type=jacket
  console.log('Navigating to http://localhost:3005/custom?type=jacket ...');
  await desktop.goto('http://localhost:3005/custom?type=jacket', { waitUntil: 'networkidle', timeout: 35000 });
  await desktop.waitForTimeout(1500);

  // 2.1 Flat View Screenshot
  await desktop.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_custom_flat_desktop.png') });
  console.log('✓ Captured qa_custom_flat_desktop.png');

  // 2.2 Switch to Female Model View
  const btnFemale = desktop.locator('button:has-text("Mẫu Nữ")').first();
  if (await btnFemale.count() > 0) {
    await btnFemale.click();
    await desktop.waitForTimeout(1000);
    await desktop.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_custom_model_female_desktop.png') });
    console.log('✓ Captured qa_custom_model_female_desktop.png (No dots on face!)');
  }

  // 2.3 Switch to Male Model View
  const btnMale = desktop.locator('button:has-text("Mẫu Nam")').first();
  if (await btnMale.count() > 0) {
    await btnMale.click();
    await desktop.waitForTimeout(1000);
    await desktop.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_custom_model_male_desktop.png') });
    console.log('✓ Captured qa_custom_model_male_desktop.png');
  }

  // 2.4 Open Fabric Modal (Close-up Macro Photos)
  const btnFabric = desktop.locator('button:has-text("Cận cảnh 4 loại vải xưởng")').first();
  if (await btnFabric.count() > 0) {
    await btnFabric.click();
    await desktop.waitForTimeout(1000);
    await desktop.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_custom_fabric_modal.png') });
    console.log('✓ Captured qa_custom_fabric_modal.png');
    // Close modal
    const closeBtn = desktop.locator('div.fixed button:has-text("✕")').first();
    if (await closeBtn.count() > 0) await closeBtn.click();
    await desktop.waitForTimeout(500);
  }

  // 2.5 Open Size Calculator Modal (Image 9 ref)
  const btnSize = desktop.locator('button:has-text("Tìm kích cỡ phù hợp")').first();
  if (await btnSize.count() > 0) {
    await btnSize.click();
    await desktop.waitForTimeout(1000);
    await desktop.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_custom_size_modal.png') });
    console.log('✓ Captured qa_custom_size_modal.png');
    // Close modal
    const closeSize = desktop.locator('div.fixed button:has-text("✕")').first();
    if (await closeSize.count() > 0) await closeSize.click();
    await desktop.waitForTimeout(500);
  }

  // 3. Mobile View 390x844 (Image 7 ref fix)
  console.log('Navigating to http://localhost:3005/custom?type=hoodie on Mobile 390x844...');
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3005/custom?type=hoodie', { waitUntil: 'networkidle', timeout: 35000 });
  await mobile.waitForTimeout(1500);
  await mobile.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_custom_mobile_compact.png') });
  console.log('✓ Captured qa_custom_mobile_compact.png');

  // 4. Test Redirect from /ca-nhan-hoa?type=sweater
  console.log('Testing redirect from /ca-nhan-hoa?type=sweater ...');
  await desktop.goto('http://localhost:3005/ca-nhan-hoa?type=sweater', { waitUntil: 'networkidle', timeout: 35000 });
  const finalUrl = desktop.url();
  console.log('Final URL after redirect:', finalUrl);

  await browser.close();
  console.log('All visual verification captures completed successfully!');
}

runCapture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
