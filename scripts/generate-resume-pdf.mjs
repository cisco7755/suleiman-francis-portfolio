/**
 * Renders /resume to public/resume/Suleiman-Francis-Resume.pdf using the
 * site's own print styles, so the PDF and the web résumé always match.
 *
 * Usage: npm run build && npm run resume:pdf
 * Needs a Chromium build for playwright-core (`npx playwright install chromium`).
 */
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { startStaticServer } from './static-server.mjs';

const PORT = 4319;
const root = fileURLToPath(new URL('..', import.meta.url));
const output = `${root}public/resume/Suleiman-Francis-Resume.pdf`;
const extraCopy = process.argv[2]; // optional: also copy the PDF here

const server = await startStaticServer({
  port: PORT,
  outDir: fileURLToPath(new URL('../out/', import.meta.url)),
});

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server did not start at ${url}`);
}

try {
  const url = `http://127.0.0.1:${PORT}/resume`;
  await waitForServer(url);
  const browser = await chromium.launch();
  const page = await browser.newPage({ colorScheme: 'light' });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log(`Wrote ${output}`);
  if (extraCopy) {
    await copyFile(output, extraCopy);
    console.log(`Copied to ${extraCopy}`);
  }
} finally {
  server.closeAllConnections();
  server.close();
}
