const { chromium } = require('@playwright/test');
const path = require('path');

async function capture() {
  const browser = await chromium.launch();
  
  // 1. Desktop 1440x900
  console.log('Testing Desktop 1440x900...');
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesktop.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
  await pageDesktop.waitForTimeout(2000);

  // A. Seasonal Collections Section (Font kiểm tra chữ tiếng Việt: BỘ SƯU TẬP THEO MÙA)
  const seasonalSection = pageDesktop.locator('section[aria-label="Bộ sưu tập theo 4 mùa"]');
  await seasonalSection.scrollIntoViewIfNeeded();
  await pageDesktop.waitForTimeout(1000);
  const fontDesktopPath = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/seasonal_vietnamese_font_fixed.png');
  await seasonalSection.screenshot({ path: fontDesktopPath });
  console.log('Captured Seasonal Font Desktop:', fontDesktopPath);

  // B. Category Browser + Category Trust Policy Bar (4 cột chính sách dưới danh mục sản phẩm)
  const categorySection = pageDesktop.locator('section[aria-label="Tìm kiếm theo danh mục sản phẩm"]');
  await categorySection.scrollIntoViewIfNeeded();
  await pageDesktop.waitForTimeout(1000);
  const trustBarDesktopPath = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/homepage_palette_and_trust_policy.png');
  await categorySection.screenshot({ path: trustBarDesktopPath });
  console.log('Captured Trust Policy Desktop:', trustBarDesktopPath);

  // C. Product Detail Page (Chính sách mua hàng 4 thẻ)
  console.log('Navigating to Product Detail Page...');
  await pageDesktop.goto('http://localhost:3005/products/ao-thun-cotton-supima-260gsm-det-kim-nguyen-khoi', { waitUntil: 'networkidle', timeout: 30000 });
  await pageDesktop.waitForTimeout(2000);
  const pdpPolicyCard = pageDesktop.locator('div:has(h3:has-text("Chính sách mua hàng"))').last();
  await pdpPolicyCard.scrollIntoViewIfNeeded();
  await pageDesktop.waitForTimeout(1000);
  const pdpPolicyPath = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/pdp_purchase_policies.png');
  await pdpPolicyCard.screenshot({ path: pdpPolicyPath });
  console.log('Captured PDP Policies Desktop:', pdpPolicyPath);

  // D. Custom Studio Page (/ca-nhan-hoa)
  console.log('Navigating to Custom Studio Page...');
  await pageDesktop.goto('http://localhost:3005/ca-nhan-hoa', { waitUntil: 'networkidle', timeout: 30000 });
  await pageDesktop.waitForTimeout(2000);
  const customPolicyCard = pageDesktop.locator('div:has(h3:has-text("Chính sách mua hàng"))').last();
  await customPolicyCard.scrollIntoViewIfNeeded();
  await pageDesktop.waitForTimeout(1000);
  const customPolicyPath = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/custom_studio_policies.png');
  await customPolicyCard.screenshot({ path: customPolicyPath });
  console.log('Captured Custom Studio Policies Desktop:', customPolicyPath);

  // 2. Mobile 390x844
  console.log('Testing Mobile 390x844...');
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
  await pageMobile.waitForTimeout(2000);

  const categorySectionMobile = pageMobile.locator('section[aria-label="Tìm kiếm theo danh mục sản phẩm"]');
  await categorySectionMobile.scrollIntoViewIfNeeded();
  await pageMobile.waitForTimeout(1000);
  const trustBarMobilePath = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/homepage_trust_policy_mobile.png');
  await categorySectionMobile.screenshot({ path: trustBarMobilePath });
  console.log('Captured Trust Policy Mobile:', trustBarMobilePath);

  const seasonalSectionMobile = pageMobile.locator('section[aria-label="Bộ sưu tập theo 4 mùa"]');
  await seasonalSectionMobile.scrollIntoViewIfNeeded();
  await pageMobile.waitForTimeout(1000);
  const fontMobilePath = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/seasonal_vietnamese_font_mobile.png');
  await seasonalSectionMobile.screenshot({ path: fontMobilePath });
  console.log('Captured Seasonal Font Mobile:', fontMobilePath);

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
