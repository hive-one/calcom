/* eslint-disable playwright/no-focused-test */
import { expect } from "@playwright/test";

import { randomString } from "@calcom/lib/random";

import { test } from "./lib/fixtures";
import {
  bookFirstEvent,
  bookTimeSlot,
  expectEmailsToHaveSubject,
  selectFirstAvailableTimeSlotNextMonth,
  testEmail,
  testName,
} from "./lib/testUtils";

const freeUserObj = { name: `Free-user-${randomString(3)}` };
test.describe.configure({ mode: "parallel" });
test.afterEach(async ({ users }) => {
  await users.deleteAll();
});

test.describe.only("free user", () => {
  test.beforeEach(async ({ page, users }) => {
    const free = await users.create(freeUserObj);
    await page.goto(`/${free.username}`);
  });

  test("book a call with an expert", async ({ page, users, emails }) => {
    const [user] = users.get();
    const bookerObj = { email: `testEmail-${randomString(4)}@example.com`, name: "testBooker" };
    await page.click('[id="call-charges"] a');

    await selectFirstAvailableTimeSlotNextMonth(page);

    await bookTimeSlot(page, bookerObj);

    // save booking url
    const bookingUrl: string = page.url();

    // Add payment details on stripe checkout page
    await page.fill("[id='cardNumber']", "4242424242424242");
    await page.fill("[id='cardExpiry']", "1225");
    await page.fill("[id='cardCvc']", "345");
    await page.fill("[id='billingName']", "testBooker");
    await page.click('[data-testid="hosted-payment-submit-button"]');

    // Make sure we're navigated to the success page
    await expect(page.locator("[data-testid=success-page]")).toBeVisible();
    const { title: eventTitle } = await user.getFirstEventAsOwner();

    await expectEmailsToHaveSubject({
      emails,
      organizer: user,
      booker: bookerObj,
      eventTitle,
    });

    /* await page.goto(bookingUrl);
    // book same time spot again
    await bookTimeSlot(page);
    await expect(page.locator("[data-testid=booking-fail]")).toBeVisible({ timeout: 30000 }); */
  });

  test("reschedule the meeting", async ({ page, users, emails }) => {
    const [user] = users.get();
    const bookerObj = { email: `testEmail-${randomString(4)}@example.com`, name: "testBooker" };
    await page.click('[id="call-charges"] a');

    await selectFirstAvailableTimeSlotNextMonth(page);

    await bookTimeSlot(page, bookerObj);

    // save booking url
    const bookingUrl: string = page.url();

    // Add payment details on stripe checkout page
    await page.fill("[id='cardNumber']", "4242424242424242");
    await page.fill("[id='cardExpiry']", "1225");
    await page.fill("[id='cardCvc']", "345");
    await page.fill("[id='billingName']", "testBooker");
    await page.click('[data-testid="hosted-payment-submit-button"]');

    // Make sure we're navigated to the success page
    await expect(page.locator("[data-testid=success-page]")).toBeVisible();
    // Reschedule Flow
    await page.locator('[data-testid="reschedule-link"]').click();
    await selectFirstAvailableTimeSlotNextMonth(page);

    await bookTimeSlot(page, bookerObj);
    await page.locator('[data-testid="confirm-reschedule-button"]').click();
    await expect(page.locator("[data-testid=success-page]")).toBeVisible();
  });

  test("cancel the meeting", async ({ page, users, emails }) => {
    const [user] = users.get();
    const bookerObj = { email: `testEmail-${randomString(4)}@example.com`, name: "testBooker" };
    await page.click('[id="call-charges"] a');

    await selectFirstAvailableTimeSlotNextMonth(page);

    await bookTimeSlot(page, bookerObj);

    // save booking url
    const bookingUrl: string = page.url();

    // Add payment details on stripe checkout page
    await page.fill("[id='cardNumber']", "4242424242424242");
    await page.fill("[id='cardExpiry']", "1225");
    await page.fill("[id='cardCvc']", "345");
    await page.fill("[id='billingName']", "testBooker");
    await page.click('[data-testid="hosted-payment-submit-button"]');

    // Make sure we're navigated to the success page
    await expect(page.locator("[data-testid=success-page]")).toBeVisible();
    // Cancellation flow
    await page.locator('[data-testid="cancel"]').click();
    await page.locator('[data-testid="confirm_cancel"]').click();
    // Make sure we're navigated to the cancelled page
    await expect(page.locator("[data-testid='cancelled-headline']")).toBeVisible();
  });
});

test.describe("pro user", () => {
  test.beforeEach(async ({ page, users }) => {
    const pro = await users.create();
    await page.goto(`/${pro.username}`);
  });

  /* test("pro user's page has at least 2 visible events", async ({ page }) => {
    const $eventTypes = page.locator("[data-testid=event-types] > *");
    expect(await $eventTypes.count()).toBeGreaterThanOrEqual(2);
  });

  test("book an event first day in next month", async ({ page }) => {
    await bookFirstEvent(page);
  }); */

  test("can reschedule a booking", async ({ page, users, bookings }) => {
    const [pro] = users.get();
    const [eventType] = pro.eventTypes;
    await bookings.create(pro.id, pro.username, eventType.id);

    await pro.apiLogin();
    await page.goto("/bookings/upcoming");
    await page.waitForSelector('[data-testid="bookings"]');
    await page.locator('[data-testid="edit_booking"]').nth(0).click();
    await page.locator('[data-testid="reschedule"]').click();
    await page.waitForURL((url) => {
      const bookingId = url.searchParams.get("rescheduleUid");
      return !!bookingId;
    });
    await selectFirstAvailableTimeSlotNextMonth(page);

    await page.locator('[data-testid="confirm-reschedule-button"]').click();
    await page.waitForURL((url) => {
      return url.pathname.startsWith("/booking");
    });
  });

  test("Can cancel the recently created booking and rebook the same timeslot", async ({
    page,
    users,
  }, testInfo) => {
    // Because it tests the entire booking flow + the cancellation + rebooking
    test.setTimeout(testInfo.timeout * 3);
    await bookFirstEvent(page);
    await expect(page.locator(`[data-testid="attendee-email-${testEmail}"]`)).toHaveText(testEmail);
    await expect(page.locator(`[data-testid="attendee-name-${testName}"]`)).toHaveText(testName);

    const [pro] = users.get();
    await pro.apiLogin();

    await page.goto("/bookings/upcoming");
    await page.locator('[data-testid="cancel"]').click();
    await page.waitForURL((url) => {
      return url.pathname.startsWith("/booking/");
    });
    await page.locator('[data-testid="confirm_cancel"]').click();

    const cancelledHeadline = page.locator('[data-testid="cancelled-headline"]');
    await expect(cancelledHeadline).toBeVisible();

    await expect(page.locator(`[data-testid="attendee-email-${testEmail}"]`)).toHaveText(testEmail);
    await expect(page.locator(`[data-testid="attendee-name-${testName}"]`)).toHaveText(testName);

    await page.goto(`/${pro.username}`);
    await bookFirstEvent(page);
  });

  /* test("can book an event that requires confirmation and then that booking can be accepted by organizer", async ({
    page,
    users,
  }) => {
    await bookOptinEvent(page);
    const [pro] = users.get();
    await pro.apiLogin();

    await page.goto("/bookings/unconfirmed");
    await Promise.all([
      page.click('[data-testid="confirm"]'),
      page.waitForResponse((response) => response.url().includes("/api/trpc/bookings/confirm")),
    ]);
    // This is the only booking in there that needed confirmation and now it should be empty screen
    await expect(page.locator('[data-testid="empty-screen"]')).toBeVisible();
  }); */

  test("can book with multiple guests", async ({ page, users }) => {
    const additionalGuests = ["test@gmail.com", "test2@gmail.com"];

    await page.click('[data-testid="event-type-link"]');
    await selectFirstAvailableTimeSlotNextMonth(page);
    await page.fill('[name="name"]', "test1234");
    await page.fill('[name="email"]', "test1234@example.com");
    await page.locator('[data-testid="add-guests"]').click();

    await page.locator('input[type="email"]').nth(1).fill(additionalGuests[0]);
    await page.locator('[data-testid="add-another-guest"]').click();
    await page.locator('input[type="email"]').nth(2).fill(additionalGuests[1]);

    await page.locator('[data-testid="confirm-book-button"]').click();

    await expect(page.locator("[data-testid=success-page]")).toBeVisible();

    const promises = additionalGuests.map(async (email) => {
      await expect(page.locator(`[data-testid="attendee-email-${email}"]`)).toHaveText(email);
    });
    await Promise.all(promises);
  });

  test("Time slots should be reserved when selected", async ({ context, page }) => {
    await page.click('[data-testid="event-type-link"]');

    const initialUrl = page.url();
    await selectFirstAvailableTimeSlotNextMonth(page);
    const pageTwo = await context.newPage();
    await pageTwo.goto(initialUrl);
    await pageTwo.waitForURL(initialUrl);

    await pageTwo.waitForSelector('[data-testid="event-type-link"]');
    const eventTypeLink = pageTwo.locator('[data-testid="event-type-link"]').first();
    await eventTypeLink.click();

    await pageTwo.waitForLoadState("networkidle");
    await pageTwo.locator('[data-testid="incrementMonth"]').waitFor();
    await pageTwo.click('[data-testid="incrementMonth"]');
    await pageTwo.waitForLoadState("networkidle");
    await pageTwo.locator('[data-testid="day"][data-disabled="false"]').nth(0).waitFor();
    await pageTwo.locator('[data-testid="day"][data-disabled="false"]').nth(0).click();

    // 9:30 should be the first available time slot
    await pageTwo.locator('[data-testid="time"]').nth(0).waitFor();
    const firstSlotAvailable = pageTwo.locator('[data-testid="time"]').nth(0);
    // Find text inside the element
    const firstSlotAvailableText = await firstSlotAvailable.innerText();
    expect(firstSlotAvailableText).toContain("9:30");
  });

  test("Time slots are not reserved when going back via Cancel button on Event Form", async ({
    context,
    page,
  }) => {
    const initialUrl = page.url();
    await page.waitForSelector('[data-testid="event-type-link"]');
    const eventTypeLink = page.locator('[data-testid="event-type-link"]').first();
    await eventTypeLink.click();
    await selectFirstAvailableTimeSlotNextMonth(page);

    const pageTwo = await context.newPage();
    await pageTwo.goto(initialUrl);
    await pageTwo.waitForURL(initialUrl);

    await pageTwo.waitForSelector('[data-testid="event-type-link"]');
    const eventTypeLinkTwo = pageTwo.locator('[data-testid="event-type-link"]').first();
    await eventTypeLinkTwo.click();

    await page.locator('[data-testid="back"]').waitFor();
    await page.click('[data-testid="back"]');

    await pageTwo.waitForLoadState("networkidle");
    await pageTwo.locator('[data-testid="incrementMonth"]').waitFor();
    await pageTwo.click('[data-testid="incrementMonth"]');
    await pageTwo.waitForLoadState("networkidle");
    await pageTwo.locator('[data-testid="day"][data-disabled="false"]').nth(0).waitFor();
    await pageTwo.locator('[data-testid="day"][data-disabled="false"]').nth(0).click();

    await pageTwo.locator('[data-testid="time"]').nth(0).waitFor();
    const firstSlotAvailable = pageTwo.locator('[data-testid="time"]').nth(0);

    // Find text inside the element
    const firstSlotAvailableText = await firstSlotAvailable.innerText();
    expect(firstSlotAvailableText).toContain("9:00");
  });
});

/* test.describe("prefill", () => {
  test("logged in", async ({ page, users }) => {
    const prefill = await users.create({ name: "Prefill User" });
    await prefill.apiLogin();
    await page.goto("/pro/30min");

    await test.step("from session", async () => {
      await selectFirstAvailableTimeSlotNextMonth(page);
      await expect(page.locator('[name="name"]')).toHaveValue(prefill.name || "");
      await expect(page.locator('[name="email"]')).toHaveValue(prefill.email);
    });

    await test.step("from query params", async () => {
      const url = new URL(page.url());
      url.searchParams.set("name", testName);
      url.searchParams.set("email", testEmail);
      await page.goto(url.toString());

      await expect(page.locator('[name="name"]')).toHaveValue(testName);
      await expect(page.locator('[name="email"]')).toHaveValue(testEmail);
    });
  });

  test("logged out", async ({ page, users }) => {
    await page.goto("/pro/30min");

    await test.step("from query params", async () => {
      await selectFirstAvailableTimeSlotNextMonth(page);

      const url = new URL(page.url());
      url.searchParams.set("name", testName);
      url.searchParams.set("email", testEmail);
      await page.goto(url.toString());

      await expect(page.locator('[name="name"]')).toHaveValue(testName);
      await expect(page.locator('[name="email"]')).toHaveValue(testEmail);
    });
  });
});

test.describe("Booking on different layouts", () => {
  test.beforeEach(async ({ page, users }) => {
    const user = await users.create();
    await page.goto(`/${user.username}`);
  });

  test("Book on week layout", async ({ page }) => {
    // Click first event type
    await page.click('[data-testid="event-type-link"]');

    await page.click('[data-testid="toggle-group-item-week_view"]');

    await page.click('[data-testid="incrementMonth"]');

    await page.locator('[data-testid="calendar-empty-cell"]').nth(0).click();

    // Fill what is this meeting about? name email and notes
    await page.locator('[name="name"]').fill("Test name");
    await page.locator('[name="email"]').fill(`${randomString(4)}@example.com`);
    await page.locator('[name="notes"]').fill("Test notes");

    await page.click('[data-testid="confirm-book-button"]');

    await page.waitForURL((url) => {
      return url.pathname.startsWith("/booking");
    });

    // expect page to be booking page
    await expect(page.locator("[data-testid=success-page]")).toBeVisible();
  });

  test("Book on column layout", async ({ page }) => {
    // Click first event type
    await page.click('[data-testid="event-type-link"]');

    await page.click('[data-testid="toggle-group-item-column_view"]');

    await page.click('[data-testid="incrementMonth"]');

    await page.locator('[data-testid="time"]').nth(0).click();

    // Fill what is this meeting about? name email and notes
    await page.locator('[name="name"]').fill("Test name");
    await page.locator('[name="email"]').fill(`${randomString(4)}@example.com`);
    await page.locator('[name="notes"]').fill("Test notes");

    await page.click('[data-testid="confirm-book-button"]');

    await page.waitForURL((url) => {
      return url.pathname.startsWith("/booking");
    });

    // expect page to be booking page
    await expect(page.locator("[data-testid=success-page]")).toBeVisible();
  }); 
}); */
