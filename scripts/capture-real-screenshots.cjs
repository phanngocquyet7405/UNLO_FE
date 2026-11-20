const { chromium } = require('@playwright/test');
const path = require('path');

async function captureRealApp() {
  const browser = await chromium.launch();
  
  // 1. Desktop 1440
  console.log('Navigating to http://localhost:3005 on Desktop 1440x900...');
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesktop.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
  await pageDesktop.waitForTimeout(2000); // Wait for animations / fonts to settle
  
  const desktopOut = path.resolve('scratch/real_header_desktop_1440.png');
  await pageDesktop.screenshot({ path: desktopOut, clip: { x: 0, y: 0, width: 1440, height: 800 } });
  console.log('Captured REAL Desktop screenshot to:', desktopOut);

  // 2. Mobile 390
  console.log('Navigating to http://localhost:3005 on Mobile 390x844...');
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
  await pageMobile.waitForTimeout(2000);

  const mobileOut = path.resolve('scratch/real_header_mobile_390.png');
  await pageMobile.screenshot({ path: mobileOut, clip: { x: 0, y: 0, width: 390, height: 600 } });
  console.log('Captured REAL Mobile screenshot to:', mobileOut);

  await browser.close();
}

captureRealApp().catch(console.error);
