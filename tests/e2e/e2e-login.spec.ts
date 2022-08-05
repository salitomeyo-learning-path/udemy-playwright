import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { HomePage } from '../../pages/HomePage'

test.describe("Login / Logout flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage

    test.beforeEach(async ({ page }) =>{
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
    })

    test('Negative Scenario for login', async ({ page }) => {
        await homePage.clickOnSignIn()
        await loginPage.login('wrong username', 'wrong password')
        await loginPage.assertErrorMessage()
    })

    test('Positive Scenario for login + logout', async ({ page }) => {
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')

        await homePage.visitTransferFunds()
        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})
