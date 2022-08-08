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

    test('Test fixme annotation', async ({ page, browserName }) => {
        test.fixme(browserName === "webkit", "Test not stable needs revision")
        await page.goto('https://www.example.com')
    })

    const people = ["Mike", "judy", "Peter", "Elon"]
    for (const name of people) {
        test(`Runing test for ${name}`, async ({ page }) => {
            await page.goto("http://zero.webappsecurity.com/index.html")
            await page.type('#searchTerm', `${name}`)
            await page.waitForTimeout(3000)
        })
    }
})
