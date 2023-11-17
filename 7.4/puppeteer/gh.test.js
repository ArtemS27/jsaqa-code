let page;

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });
  
  test("The h1 header content", async () => {
    await page.waitForTimeout(1000);
    const firstLink = await page.$("header div div a");   
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  });

  test("The first link attribute", async () => {
    await page.waitForTimeout(1000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    await page.waitForTimeout(1000);
    const btnSelector = ".btn-muted-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});

beforeEach(async () => {
  page = await browser.newPage();
});

test("Title on the sing up page", async () => {
  await page.goto("https://github.com/join?plan=free&ref_cta=Sign%2520up%2520for%2520free&ref_loc=team-page-hero&ref_page=%2Fteam&setup_organization=true&source=team");
  await page.waitForTimeout(1000);
  const title = await page.title();
  expect(title).toEqual("Join GitHub · GitHub");
});

test("Title on Compar all plans page", async () => {
  await page.goto("https://github.com/pricing");
  await page.waitForTimeout(1000);
  const titleObj = await page.$('.h2-mktg');
  const title = await page.evaluate(el => el.textContent, titleObj);
  expect(title).toEqual("Get the complete developer platform.");
});

test("Title on GitHub Enterprise page", async () => {
  await page.goto("https://github.com/enterprise");
  await page.waitForTimeout(1000);
  const titleObj = await page.$('#hero-section-brand-heading');
  const title = await page.evaluate(el => el.textContent, titleObj);
  expect(title).toEqual("The AI-powereddeveloper platform.");
});
