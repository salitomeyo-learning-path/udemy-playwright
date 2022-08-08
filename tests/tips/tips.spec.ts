import { test, expect } from "@playwright/test";

test.describe.only("Tips & Tricks section", () => {
    test('TestInfo Object', async ({ page }, testInfo) => {
        await page.goto('https://www.example.com')
        console.log(testInfo.title)
    })

    test('Test skip browser', async ({ page, browserName }) => {
        test.skip(browserName === "webkit", "Feature not ready in Chrome browser")
        await page.goto('https://www.example.com')
    })
})
