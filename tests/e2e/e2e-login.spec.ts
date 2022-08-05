import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { HomePage } from '../../pages/HomePage'

import { Navbar } from '../../pages/components/Navbar'

test.describe("Login / Logout flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage

    let navbar: Navbar

    test.beforeEach(async ({ page }) =>{
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        navbar = new Navbar(page)

        await homePage.visit()
    })

    test('Negative Scenario for login', async () => {
        await homePage.clickOnSignIn()
        await loginPage.login('wrong username', 'wrong password')
        await loginPage.wait(3000)
        await loginPage.assertErrorMessage()
    })

    test('Positive Scenario for login + logout', async ({ page }) => {
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')

        await homePage.visitTransferFunds()
        await navbar.clickOnTab('Account Summary')

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})
