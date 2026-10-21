/**
 * Accessibility and interaction smoke test.
 *
 * Start a production server first:
 *   npm run build && npx next start -p 3010
 * Then run:
 *   npm run qa
 * Override the target with QA_BASE_URL and the browser with CHROME_PATH.
 */
import { chromium } from "playwright-core";
import { AxeBuilder } from "@axe-core/playwright";

const baseUrl = process.env.QA_BASE_URL || "http://localhost:3010";
const executablePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await chromium.launch({ executablePath, headless: true });
const results = {};

function watchConsole(page, bucket) {
  page.on("console", (msg) => {
    if (msg.type() === "error") bucket.push(msg.text());
  });
  page.on("pageerror", (err) => bucket.push(`pageerror: ${err.message}`));
}

async function analyze(page) {
  const report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  return report.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    nodes: v.nodes.length,
    help: v.help,
  }));
}

// 1. Keyboard, skip link, theme persistence and reduced motion
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  watchConsole(page, errors);

  await page.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  results.projects = await page.evaluate(() => {
    const buttons = [
      ...document.querySelectorAll(
        'section#work button[aria-label^="Open project details for "]'
      ),
    ];
    return {
      count: buttons.length,
      names: buttons.map((button) =>
        button.getAttribute("aria-label").replace("Open project details for ", "")
      ),
      moreGrids: document.querySelectorAll("section#work details").length,
    };
  });
  results.axeLight = await analyze(page);
  await page.keyboard.press("Tab");
  results.firstTab = await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    text: document.activeElement?.textContent?.trim(),
    href: document.activeElement?.getAttribute("href"),
  }));

  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
  results.skipLink = await page.evaluate(() => ({
    hash: location.hash,
    active: document.activeElement?.id,
  }));

  await page.click('button[aria-label="Toggle dark mode"]');
  await page.waitForTimeout(250);
  results.themeAfterClick = await page.evaluate(() => ({
    dark: document.documentElement.classList.contains("dark"),
    stored: localStorage.getItem("theme"),
  }));
  results.axeDark = await analyze(page);

  await page.reload({ waitUntil: "networkidle" });
  results.themeAfterReload = await page.evaluate(() => ({
    dark: document.documentElement.classList.contains("dark"),
    stored: localStorage.getItem("theme"),
  }));

  await page.click('button[aria-label="Toggle dark mode"]');
  await page.waitForTimeout(250);
  results.themeBackToLight = await page.evaluate(() => ({
    dark: document.documentElement.classList.contains("dark"),
    stored: localStorage.getItem("theme"),
  }));

  await page.click('button[aria-label="Open project details for RNFactory"]');
  await page.waitForTimeout(400);
  results.dialog = await page.evaluate(() => {
    const dialog = document.querySelector("dialog");
    return {
      open: dialog?.open,
      title: dialog?.querySelector("h2")?.textContent,
      focused: document.activeElement?.getAttribute("aria-label"),
    };
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  results.dialogClosed = await page.evaluate(
    () => !document.querySelector("dialog")?.open
  );

  results.consoleErrors = [...new Set(errors)];
  await context.close();
}

// 2. Honours prefers-reduced-motion
{
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });
  results.reducedMotion = await page.evaluate(() => {
    const bg = document.querySelector(".animate-backgroundMove");
    return {
      animationDuration: getComputedStyle(bg).animationDuration,
      animationIterationCount: getComputedStyle(bg).animationIterationCount,
      transitionDuration: getComputedStyle(bg).transitionDuration,
    };
  });
  await context.close();
}

// 3. Layouts at 320 / 768 / 1440
for (const width of [320, 768, 1440]) {
  const height = width === 320 ? 900 : 1000;
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  results[`layout${width}`] = await page.evaluate(() => {
    const nav = document.querySelector("nav");
    const style = nav ? getComputedStyle(nav) : null;
    return {
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      navWidth: style?.width,
      navBottom: style?.bottom,
      navHeight: style?.height,
    };
  });
  await page.screenshot({ path: `/tmp/vldm-${width}.png` });
  if (width === 320) {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);
    results.axe320 = await analyze(page);
  }
  await context.close();
}

// 4. Spanish page, axe light
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/es`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  results.axeEs = await analyze(page);
  results.es = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    title: document.title,
    h1: document.querySelector("h1")?.textContent?.trim(),
  }));
  await context.close();
}

// 5. Mobile preview route
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  watchConsole(page, errors);
  await page.goto(`${baseUrl}/en/movile`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const frame = page.frames().find((f) => f !== page.mainFrame());
  await page.keyboard.press("Tab");
  results.movile = {
    title: await page.title(),
    iframeSrc: await page.locator("iframe").getAttribute("src"),
    iframeUrl: frame?.url(),
    iframeH1: await frame?.locator("h1").textContent().catch(() => null),
    firstFocus: await page.evaluate(() => ({
      tag: document.activeElement?.tagName,
      text: document.activeElement?.textContent?.trim(),
      href: document.activeElement?.getAttribute("href"),
      headerInert: document.querySelector("header")?.inert,
      footerInert: document.querySelector("footer")?.inert,
      skipInert: document.querySelector(".skip-link")?.inert,
    })),
    axe: await analyze(page),
    consoleErrors: [...new Set(errors)],
  };
  await page.screenshot({ path: "/tmp/vldm-movile.png" });
  await page.getByRole("link", { name: "Back to the site" }).click();
  await page.waitForURL("**/en");
  await page.waitForTimeout(500);
  results.movile.afterBack = await page.evaluate(() => ({
    path: location.pathname,
    headerInert: document.querySelector("header")?.inert,
    footerInert: document.querySelector("footer")?.inert,
    skipInert: document.querySelector(".skip-link")?.inert,
  }));
  await context.close();
}

// 6. Scroll spy: the section line changes before a heading reaches the top
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  const errors = [];
  watchConsole(page, errors);
  await page.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });

  const active = () =>
    page
      .locator('nav a[aria-current="location"]')
      .textContent()
      .then((text) => text?.trim() ?? null);

  const positions = await page.evaluate(() =>
    Object.fromEntries(
      ["home", "experience", "work", "contact"].map((id) => {
        const element = document.getElementById(id);
        return [id, { top: element?.offsetTop ?? 0 }];
      })
    )
  );
  const bottom = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight
  );

  const at = async (y) => {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(220);
    return active();
  };

  results.scrollSpy = {
    atTop: await at(0),
    atExperience: await at(positions.experience.top + 50),
    atWork: await at(positions.work.top + 50),
    atContact: await at(positions.contact.top + 50),
    atBottom: await at(bottom),
    afterScrollingUp100px: await at(bottom - 100),
    consoleErrors: [...new Set(errors)],
  };
  await context.close();
}

// 7. Theme survives locale changes and starts before hydration
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  watchConsole(page, errors);

  const pressed = () =>
    page.locator("nav button[aria-pressed]").getAttribute("aria-pressed");

  await page.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });
  await page.click('button[aria-label="Toggle dark mode"]');
  await page.waitForTimeout(250);
  const before = {
    dark: await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    ),
    pressed: await pressed(),
  };

  await page.click('button[aria-label*="Switch to Spanish"]');
  await page.waitForURL("**/es");
  await page.waitForTimeout(500);
  const afterSwitch = {
    dark: await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    ),
    lang: await page.evaluate(() => document.documentElement.lang),
    pressed: await pressed(),
  };

  await page.reload({ waitUntil: "domcontentloaded" });
  const atDomContentLoaded = {
    dark: await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    ),
  };
  await page.waitForLoadState("networkidle");
  const afterReload = {
    dark: await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    ),
    pressed: await pressed(),
  };

  await page.click('button[aria-label*="Cambiar a inglés"]');
  await page.waitForURL("**/en");
  await page.waitForTimeout(500);
  const afterBack = {
    dark: await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    ),
    lang: await page.evaluate(() => document.documentElement.lang),
    pressed: await pressed(),
  };

  results.languageTheme = {
    before,
    afterSwitch,
    atDomContentLoaded,
    afterReload,
    afterBack,
    consoleErrors: [...new Set(errors)],
  };
  await context.close();
}

// 8. Mobile project sheet
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  const errors = [];
  watchConsole(page, errors);
  await page.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });
  await page.click('button[aria-label="Open project details for RNFactory"]');
  await page.waitForTimeout(450);

  results.mobileSheet = await page.evaluate(() => {
    const dialog = document.querySelector("dialog");
    if (!dialog) return null;
    const rect = dialog.getBoundingClientRect();
    const style = getComputedStyle(dialog);
    const image = dialog.querySelector("img");
    const imageRect = image?.getBoundingClientRect();

    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.width,
      viewportHeight: window.innerHeight,
      focused: document.activeElement?.getAttribute("aria-label") ?? null,
      radiusTop: style.borderTopLeftRadius,
      radiusBottom: style.borderBottomLeftRadius,
      imageAspect: imageRect
        ? Number((imageRect.width / imageRect.height).toFixed(2))
        : null,
      imageFit: image ? getComputedStyle(image).objectFit : null,
    };
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  results.mobileSheet.closedWithEscape = await page.evaluate(
    () => !document.querySelector("dialog")?.open
  );
  results.mobileSheet.consoleErrors = [...new Set(errors)];
  await context.close();
}

// 9. Metadata and social sharing tags
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });

  results.seo = await page.evaluate(() => {
    const content = (selector) =>
      document.querySelector(selector)?.getAttribute("content") ?? null;
    const href = (selector) =>
      document.querySelector(selector)?.getAttribute("href") ?? null;
    const schema = JSON.parse(
      document.querySelector('script[type="application/ld+json"]')
        ?.textContent ?? "{}"
    );
    const graph = schema["@graph"] ?? [];
    const projects = graph.find((entry) => entry["@type"] === "ItemList");

    return {
      title: document.title,
      description: content('meta[name="description"]'),
      canonical: href('link[rel="canonical"]'),
      ogType: content('meta[property="og:type"]'),
      ogImage: content('meta[property="og:image"]'),
      ogImageWidth: content('meta[property="og:image:width"]'),
      ogImageHeight: content('meta[property="og:image:height"]'),
      ogImageAlt: content('meta[property="og:image:alt"]'),
      twitterCard: content('meta[name="twitter:card"]'),
      twitterImage: content('meta[name="twitter:image"]'),
      hreflangs: [
        ...document.querySelectorAll('link[rel="alternate"][hreflang]'),
      ].map((link) => ({
        lang: link.getAttribute("hreflang"),
        href: link.getAttribute("href"),
      })),
      manifest: href('link[rel="manifest"]'),
      schemaTypes: graph.map((entry) => entry["@type"]),
      schemaProjects: projects?.itemListElement?.length ?? 0,
    };
  });

  const imageResponse = await page.request.get(`${baseUrl}/og-image.jpg`);
  results.seo.ogImageStatus = imageResponse.status();
  results.seo.ogImageType = imageResponse.headers()["content-type"];
  await context.close();
}

// 10. Locale switch returns smoothly to the top
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  const errors = [];
  watchConsole(page, errors);
  await page.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight)
  );
  await page.waitForTimeout(300);
  const before = await page.evaluate(() => window.scrollY);
  await page.click('button[aria-label*="Switch to Spanish"]');
  await page.waitForURL("**/es");
  await page.waitForTimeout(500);
  const after = await page.evaluate(() => window.scrollY);

  results.localeScroll = {
    before,
    after,
    lang: await page.evaluate(() => document.documentElement.lang),
    consoleErrors: [...new Set(errors)],
  };
  await context.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
