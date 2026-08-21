import puppeteer from "puppeteer";
const text = process.argv[2];
const label = process.argv[3] || "shot";
const browser = await puppeteer.launch({ headless: "new" });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1200));
  const handle = await page.evaluateHandle((t) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      if (n.textContent.trim().toLowerCase().includes(t.toLowerCase())) {
        return n.parentElement.closest("section");
      }
    }
    return null;
  }, text);
  const el = handle.asElement();
  if (!el) { console.log("not found"); }
  else {
    await el.scrollIntoView();
    await new Promise((r) => setTimeout(r, 1000));
    await el.screenshot({ path: `scripts/${label}-desktop.png` });
    console.log("captured " + label);
  }
} finally { await browser.close(); }
