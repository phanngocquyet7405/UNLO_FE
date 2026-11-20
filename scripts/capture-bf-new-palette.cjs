const { chromium } = require('@playwright/test');
const path = require('path');

async function captureBf() {
  const browser = await chromium.launch();
  
  // 1. Desktop
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesktop.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
  await pageDesktop.waitForTimeout(2000);
  const bfDesktop = pageDesktop.locator('section[aria-label="Khuyến mại Black Friday Flashsale"]');
  await bfDesktop.scrollIntoViewIfNeeded();
  await pageDesktop.waitForTimeout(1000);
  const bfDesktopPath = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/bf_palette_desktop.png');
  await bfDesktop.screenshot({ path: bfDesktopPath });
  console.log('Saved BF Desktop:', bfDesktopPath);

  // 2. Mobile
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
  await pageMobile.waitForTimeout(2000);
  const bfMobile = pageMobile.locator('section[aria-label="Khuyến mại Black Friday Flashsale"]');
  await bfMobile.scrollIntoViewIfNeeded();
  await pageMobile.waitForTimeout(1000);
  const bfMobilePath = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/bf_palette_mobile.png');
  await bfMobile.screenshot({ path: bfMobilePath });
  console.log('Saved BF Mobile:', bfMobilePath);

  await browser.close();
}

captureBf().catch(console.error);
