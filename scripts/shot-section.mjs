import puppeteer from "puppeteer";

const text = process.argv[2] || "What We Handle";
const label = process.argv[3] || "section";
const browser = await puppeteer.launch({ headless: "new" });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1200));
  // find the <section> ancestor of the heading with matching text
  const handle = await page.evaluateHandle((t) => {
    const el = [...document.querySelectorAll("h2")].find((h) => h.textContent.trim() === t);
    return el ? el.closest("section") : null;
  }, text);
  const el = handle.asElement();
  if (!el) { console.log("section not found"); }
  else {
    await el.scrollIntoView();
    await new Promise((r) => setTimeout(r, 800));
    await el.screenshot({ path: `scripts/${label}-desktop.png` });
    console.log("captured " + label);
  }
} finally { await browser.close(); }
