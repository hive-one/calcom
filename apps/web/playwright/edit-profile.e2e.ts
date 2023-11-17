/* eslint-disable playwright/no-focused-test */
import { expect } from "@playwright/test";

import { randomString } from "@calcom/lib/random";

import { test } from "./lib/fixtures";

const userObj = { name: `Free-user-${randomString(3)}` };

test.describe.configure({ mode: "parallel" });
test.afterEach(({ users }) => users.deleteAll());

test.describe.only("Edit Profile", () => {
  test.beforeEach(async ({ page, users }) => {
    const pro = await users.create(userObj);
    await pro.apiLogin();
    await page.goto(`/${pro.username}`);
    await page.waitForSelector('[href="/edit-profile"]');
    await page.locator('[href="/edit-profile"]').click();
    await page.waitForURL("/edit-profile");
  });

  test("edit profile data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=0").click();
    await page.locator('[class="editor-input"]').fill("some description");
    await page.locator('[id="react-select-2-live-region"]~div').click();
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("Enter");
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector('[id="call-charges"]');
    await expect(page.locator('[id="bio"] span')).toHaveText("some description");
    const charges = page.getByText("$1550/hr");
    await expect(charges).toBeVisible();
  });

  test("edit links data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=1").click();
    await page.getByText("Add link").click();
    await page.locator('[type="url"]').fill("https://twitter.com/elonmusk");
    await expect(page.locator('[value="Twitter"]')).toBeVisible();
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector('[id="link-TWITTER"]');
    await page.$eval('[id="link-TWITTER"]', (el) => el.removeAttribute("target"));
    await page.locator('[id="link-TWITTER"]').click();
    await page.waitForURL("https://twitter.com/elonmusk");
  });

  test("edit facts data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=2").click();
    await page.getByText("Add fact").click();
    await page
      .locator('[placeholder="e.g Published 500+ tech articles on Medium"]')
      .fill("Published 500+ tech articles on Medium");
    await page.locator('[type="url"]').fill("https://medium.com/@frank-andrade");
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector('[href="https://medium.com/@frank-andrade"]');
    await page.locator('[href="https://medium.com/@frank-andrade"]').click();
    await page.waitForURL("https://thepycoach.com/");
  });

  test("edit advice data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=3").click();
    await page.getByText("Add advice").click();
    await page
      .locator('[placeholder="e.g. How to get started with public speaking"][required]')
      .fill("Python");
    await page.getByText("Add advice").click();
    await page.locator('[required][value=""]').fill("Machine Learning");
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector('[id="advice"]');
    await expect(page.getByText("Python")).toBeVisible();
    await expect(page.getByText("Machine Learning")).toBeVisible();
  });

  test("edit projects data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=4").click();
    await page.getByText("Add project").click();
    await page
      .locator('[placeholder="e.g Social media app for private circles"][required]')
      .fill("LibreChat");
    await page.locator('[type="url"]').fill("https://github.com/danny-avila/LibreChat");
    await page
      .locator("textarea")
      .fill(
        "Enhanced ChatGPT Clone: Features OpenAI, Bing, Anthropic, OpenRouter, PaLM 2, AI model switching, message search, langchain, DALL-E-3, ChatGPT Plugins, OpenAI Functions, Secure Multi-User System, Presets, completely open-source for self-hosting."
      );
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector('[href="https://github.com/danny-avila/LibreChat"]');
    await page.$eval('[href="https://github.com/danny-avila/LibreChat"]', (el) =>
      el.removeAttribute("target")
    );
    await page.locator('[href="https://github.com/danny-avila/LibreChat"]').click();
    await page.waitForURL("https://github.com/danny-avila/LibreChat");
  });

  test("edit experience data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=5").click();
    await page.getByText("Add experience").click();
    await page.locator("[required]").locator("nth=0").fill("Borg GmbH");
    await page.locator('[type="url"]').fill("https://borg.id");
    await page.locator('[label="Role/Title"]').fill("Sr. Test Automation Engineer");
    await page.locator('[type="date"]').locator("nth=0").fill("2021-05-06");
    await page.locator('[type="checkbox"]').click();
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector('[class^="self-start"]');
    await expect(page.locator('[id="role"]')).toHaveText("Sr. Test Automation Engineer");
    await expect(page.locator('[id="company"]')).toHaveText("Borg GmbH");
  });

  test("edit publication data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=6").click();
    await page.getByText("Add publication").click();
    await page
      .locator('[placeholder="e.g How to build strong teams"]')
      .fill("Approaches to Quality Assurance of Micro-credentials");
    const link = "https://www.enqa.eu/publications/approaches-to-quality-assurance-of-micro-credentials/";
    await page.locator('[type="url"]').fill(link);
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector(`[href="${link}"]`);
    await page.$eval(`[href="${link}"]`, (el) => el.removeAttribute("target"));
    await page.locator(`[href="${link}"]`).click();
    await page.waitForURL(link);
  });

  test("edit podcasts data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=7").click();
    await page.getByText("Add podcast").click();
    await page
      .locator('[placeholder="e.g The Joe Rogan Experience"][required]')
      .fill("All you can eat economics");
    await page.locator('[type="url"]').fill("https://one.npr.org/?sharedMediaId=1197954459:1209151761");
    await page
      .locator('[placeholder="https://open.spotify.com/show/abc.png"]')
      .fill(
        "https://media.npr.org/assets/img/2022/10/24/pm_new_tile_2022_sq-b4af5aab11c84cfae38eafa1db74a6da943d4e7f.jpg?s=600"
      );
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector(`[id="podcasts"]`);
    await page.locator(`[href="https://one.npr.org/?sharedMediaId=1197954459:1209151761"]`).click();
    await page.waitForURL("https://one.npr.org/?sharedMediaId=1197954459:1209151761");
  });

  test("edit podcast appearence data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=8").click();
    await page.getByText("Add appearence").click();
    await page
      .locator('[placeholder="e.g State of the web 2021"]')
      .fill("War, AI, Aliens, Politics, Physics, Video Games, and Humanity");
    await page.locator('[type="url"]').fill("https://lexfridman.com/elon-musk-4");
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector(`[id="podcasts-appearances"]`);
    await page.$eval(`[href="https://lexfridman.com/elon-musk-4"]`, (el) => el.removeAttribute("target"));
    await page.locator(`[href="https://lexfridman.com/elon-musk-4"]`).click();
    await page.waitForURL("https://lexfridman.com/elon-musk-4");
  });

  test("edit books data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=9").click();
    await page.getByText("Add section").click();
    await page.locator('[label="ISBN"]').fill("9780061205699");
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector(`[id="books"]`);
    await expect(page.locator('[alt="Book Cover"]')).toBeVisible();
    await page
      .locator(
        `[href="http://books.google.com/books?id=M9lKHhLy1y0C&dq=isbn:9780061205699&hl=&source=gbs_api"]`
      )
      .click();
    await page.waitForSelector('[id="bookinfo"]');
  });

  test("edit videos data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=10").click();
    await page.getByText("Add section").click();
    await page.locator('[placeholder="Enter video title"]').fill("Fly Me To The Moon");
    await page
      .locator('[placeholder="e.g https://youtube.com/watch?v=1234"]')
      .fill("https://www.youtube.com/watch?v=ZEcqHA7dbwM");
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector(`[id="videos"]`);
    await expect(page.locator('[src="https://img.youtube.com/vi/ZEcqHA7dbwM/hqdefault.jpg"]')).toBeVisible();
    await page.locator(`[href="https://www.youtube.com/watch?v=ZEcqHA7dbwM"]`).click();
  });

  test("import linkedin data", async ({ page }) => {
    await page.locator('[class^="pb-3"] button').locator("nth=11").click();
    await page.locator("form input").fill("https://linkedin.com/in/danishabdullah");
    await page.locator("input+div button").click();
    await page.getByText("Add LinkedIn Data to Profile").click();
    await page.locator('[class^="sticky bottom"] button').click();
    await page.locator('[class^="sticky bottom"] a').click();
    await page.waitForSelector(`[id="name"]`);
    await expect(page.locator('[id="role"]')).toHaveText("Chief Technology Officer");
    await expect(page.locator('[id="company"]')).toHaveText("Borg Collective GmbH");
    await expect(page.getByText("Experience")).toBeVisible();
  });
});
