import { test } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'

test.describe("Search results", () => {
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)

        await homePage.visit()
    })

    test('Should find search result', async () => {
        await homePage.searchFor('bank')

        await homePage.checkLinksQuantity(2)
    })
})
