import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/LoginPage'
import { TransferPage } from '../../pages/TransferPage'

import { Navbar } from '../../pages/components/Navbar'

test.describe("Transfer funds and make payments", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let transferPage: TransferPage
    let navbar: Navbar

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        transferPage = new TransferPage(page)

        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await homePage.visitTransferFunds()
    })

    test("Transfer funds", async ( ) => {
        await navbar.clickOnTab('Transfer Funds')
        await transferPage.fillTranferForm('3', '500', 'Test message')
        await transferPage.assertSuccessMessage()
    })
})
