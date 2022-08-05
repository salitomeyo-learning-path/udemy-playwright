import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

test.describe.only("Login / Logout flow", () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) =>{
        loginPage = new LoginPage(page)
        await loginPage.visit()
    })

    test('Negative Scenario for login', async ({ page }) => {
        await page.click('#signin_button')
        loginPage.login('wrong username', 'wrong password')
        loginPage.assertErrorMessage()
    })

    test('Positive Scenario for login + logout', async ({ page }) => {
        await page.click('#signin_button')
        loginPage.login('username', 'password')

        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})
