import { test } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/LoginPage'
import { CurrencyPage } from '../../pages/CurrencyPage'

import { Navbar } from '../../pages/components/Navbar'

test.describe("Purchase foreign currency cash", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let currencyPage: CurrencyPage

    let navbar: Navbar

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        currencyPage = new CurrencyPage(page)

        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await homePage.visitTransferFunds()
    })

    test("Should purchase foreign cash", async () => {
        await navbar.clickOnTab('Pay Bills')
        await currencyPage.fillCurrencyForm('JPY', '600')

        await currencyPage.assertSuccessMessage()
    })
})
