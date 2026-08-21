import puppeteer from "puppeteer";

const label = process.argv[2] || "shot";
const url = "http://localhost:3000/";

const browser = await puppeteer.launch({ headless: "new" });
try {
  // Desktop
  const desktop = await browser.newPage();
  await desktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await desktop.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500)); // let motion settle
  await desktop.screenshot({ path: `scripts/${label}-desktop.png` });

  // Mobile
  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await mobile.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  await mobile.screenshot({ path: `scripts/${label}-mobile.png` });

  console.log(`captured ${label}`);
} finally {
  await browser.close();
}
