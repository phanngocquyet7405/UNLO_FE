const { chromium } = require('@playwright/test');
const path = require('path');

async function captureLookbook() {
  const browser = await chromium.launch();
  
  // 1. Desktop 1440
  console.log('Navigating to http://localhost:3005 on Desktop 1440x900...');
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesktop.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
  await pageDesktop.waitForTimeout(2000);
  
  const lookbook = pageDesktop.locator('section[aria-label="UNLO Edit - Phối đồ và cá nhân hóa"]');
  await lookbook.scrollIntoViewIfNeeded();
  await pageDesktop.waitForTimeout(1000);

  const desktopOut = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/lookbook_exact_desktop.png');
  await lookbook.screenshot({ path: desktopOut });
  console.log('Captured lookbook Desktop screenshot to:', desktopOut);

  // 2. Mobile 390
  console.log('Navigating to http://localhost:3005 on Mobile 390x1000...');
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 1100 } });
  await pageMobile.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
  await pageMobile.waitForTimeout(2000);

  // Hide fixed bottom nav during component screenshot so it doesn't overlap
  await pageMobile.evaluate(() => {
    const bottomNav = document.querySelector('nav.fixed, .fixed.bottom-0');
    if (bottomNav) bottomNav.style.display = 'none';
  });

  const lookbookMobile = pageMobile.locator('section[aria-label="UNLO Edit - Phối đồ và cá nhân hóa"]');
  await lookbookMobile.scrollIntoViewIfNeeded();
  await pageMobile.waitForTimeout(1000);

  const mobileOut = path.resolve('C:/Users/Admin/.gemini/antigravity/brain/48b55a03-b406-403a-9d1e-c268d2662705/lookbook_exact_mobile.png');
  await lookbookMobile.screenshot({ path: mobileOut });
  console.log('Captured lookbook Mobile screenshot to:', mobileOut);

  await browser.close();
}

captureLookbook().catch(console.error);
