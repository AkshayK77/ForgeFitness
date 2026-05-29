import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
const page = await ctx.newPage();

await page.goto('http://localhost:5174/dashboard');
await page.waitForTimeout(2500);
await page.screenshot({ path: 'C:/Users/aksha/AppData/Local/Temp/mobile-dashboard.png' });
console.log('dashboard screenshot saved');

const overflow = await page.evaluate(() => {
  const rows = Array.from(document.querySelectorAll('div'));
  const row = rows.find(el => el.style.justifyContent === 'space-between' && el.style.display === 'flex');
  if (!row) return 'row not found';
  return { clientWidth: row.clientWidth, scrollWidth: row.scrollWidth, overflows: row.scrollWidth > row.clientWidth };
});
console.log('greeting row:', JSON.stringify(overflow));

await page.goto('http://localhost:5174/gyms');
await page.waitForTimeout(2000);
await page.screenshot({ path: 'C:/Users/aksha/AppData/Local/Temp/mobile-gyms-initial.png' });
console.log('gyms initial screenshot saved');

await browser.close();
