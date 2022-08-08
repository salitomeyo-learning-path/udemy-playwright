import { test, expect } from "@playwright/test";

test.describe("Tips & Tricks section", () => {
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

    test('Mouse movement simulation', async ({ page }) => {
        await page.goto('https://www.example.com')
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.up()
    })

    test('Multiple browser tabs', async ({ browser }) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()

        await page1.goto('https://www.example.com')
        await page2.goto('https://www.google.com')
        await page3.goto('http://zero.webappsecurity.com/index.html')
        await page1.waitForTimeout(5000)
    })
})
