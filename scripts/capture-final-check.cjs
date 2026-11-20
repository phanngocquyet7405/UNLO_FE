const { chromium } = require('@playwright/test');
const path = require('path');

async function captureFinalCheck() {
  const browser = await chromium.launch();
  
  // 1. Desktop 1440
  console.log('Navigating to http://localhost:3005 on Desktop 1440x900...');
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesktop.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
  await pageDesktop.waitForTimeout(2000);
  
  // A. Top Promo Bar
  const promoBar = pageDesktop.locator('div.bg-\\[\\#15095D\\]').first();
  const promoOut = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/header_rotating_promo.png');
  await promoBar.screenshot({ path: promoOut });
  console.log('Captured Promo bar screenshot to:', promoOut);

  // B. Black Friday with left image
  const bf = pageDesktop.locator('section[aria-label="Khuyến mại Black Friday Flashsale"]');
  await bf.scrollIntoViewIfNeeded();
  await pageDesktop.waitForTimeout(1000);
  const bfDesktopOut = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/bf_with_left_image_desktop.png');
  await bf.screenshot({ path: bfDesktopOut });
  console.log('Captured BF Desktop screenshot to:', bfDesktopOut);

  // C. Custom Studio on /ca-nhan-hoa
  console.log('Navigating to http://localhost:3005/ca-nhan-hoa on Desktop...');
  await pageDesktop.goto('http://localhost:3005/ca-nhan-hoa', { waitUntil: 'networkidle', timeout: 30000 });
  await pageDesktop.waitForTimeout(2000);
  const customDesktopOut = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/custom_studio_combined_desktop.png');
  await pageDesktop.screenshot({ path: customDesktopOut });
  console.log('Captured Custom Studio Desktop screenshot to:', customDesktopOut);

  // 2. Mobile 390
  console.log('Navigating to http://localhost:3005 on Mobile 390x844...');
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
  await pageMobile.waitForTimeout(2000);

  const bfMobile = pageMobile.locator('section[aria-label="Khuyến mại Black Friday Flashsale"]');
  await bfMobile.scrollIntoViewIfNeeded();
  await pageMobile.waitForTimeout(1000);
  const bfMobileOut = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/bf_with_left_image_mobile.png');
  await bfMobile.screenshot({ path: bfMobileOut });
  console.log('Captured BF Mobile screenshot to:', bfMobileOut);

  // Custom Studio Mobile
  console.log('Navigating to http://localhost:3005/ca-nhan-hoa on Mobile...');
  await pageMobile.goto('http://localhost:3005/ca-nhan-hoa', { waitUntil: 'networkidle', timeout: 30000 });
  await pageMobile.waitForTimeout(2000);
  const customMobileOut = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/custom_studio_combined_mobile.png');
  await pageMobile.screenshot({ path: customMobileOut });
  console.log('Captured Custom Studio Mobile screenshot to:', customMobileOut);

  await browser.close();
}

captureFinalCheck().catch(console.error);
