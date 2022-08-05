import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/LoginPage'

test.describe("Purchase foreign currency cash", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await homePage.visitTransferFunds()
    })

    test("Should purchase foreign cash", async ({ page }) => {
        await page.click('#pay_bills_tab')
        await page.click("a[href='#ui-tabs-3']")
        await page.selectOption('#pc_currency', 'JPY')
        await page.waitForSelector('#sp_sell_rate')
        await page.type('#pc_amount', '600')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')
        await page.waitForSelector('#pc_conversion_amount')
        await page.click('#purchase_cash')

        const message = page.locator('#alert_content')
        await expect(message).toBeVisible()
        await expect(message).toHaveText('Foreign currency cash was successfully purchased.')
    })
})
