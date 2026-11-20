const { chromium } = require('@playwright/test');
const path = require('path');

async function testScreenshots() {
  const browser = await chromium.launch();
  
  // 1. Desktop /ca-nhan-hoa
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesktop.goto('http://localhost:3005/ca-nhan-hoa', { waitUntil: 'networkidle', timeout: 30000 });
  await pageDesktop.waitForTimeout(2000);
  const customStudioDesktopPath = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/custom_studio_fixed_desktop.png');
  await pageDesktop.screenshot({ path: customStudioDesktopPath, fullPage: false });
  console.log('Saved custom studio desktop to:', customStudioDesktopPath);

  // 2. Mobile /ca-nhan-hoa
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('http://localhost:3005/ca-nhan-hoa', { waitUntil: 'networkidle', timeout: 30000 });
  await pageMobile.waitForTimeout(2000);
  const customStudioMobilePath = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/custom_studio_fixed_mobile.png');
  await pageMobile.screenshot({ path: customStudioMobilePath, fullPage: false });
  console.log('Saved custom studio mobile to:', customStudioMobilePath);

  // 3. Homepage (ảnh 2 Black Friday + ảnh 3 Tìm theo danh mục)
  await pageDesktop.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
  await pageDesktop.waitForTimeout(2000);
  const homeCategoryBf = pageDesktop.locator('main').first();
  const homeCheckPath = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/homepage_sections_2_and_3.png');
  await pageDesktop.screenshot({ path: homeCheckPath });
  console.log('Saved homepage check to:', homeCheckPath);

  await browser.close();
}

testScreenshots().catch(console.error);
