import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'

test.describe("Search results", () => {
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)

        await homePage.visit()
    })

    test('Should find search result', async ({ page }) => {
        await homePage.searchFor('bank')

        const numberOfLinks = await page.locator('li > a')
        await expect(numberOfLinks).toHaveCount(2)
    })
})
