import { test } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/LoginPage'
import { FilterPage } from '../../pages/FilterPage'

import { Navbar } from '../../pages/components/Navbar'

test.describe("Filter transactions", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let filterPage: FilterPage

    let navbar: Navbar

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        filterPage = new FilterPage(page)

        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await homePage.visitTransferFunds()
    })

    test("Verify the results for each account", async() => {
        await navbar.clickOnTab('Account Activity')
        await filterPage.selectAccount('2')
        await filterPage.checkAccountResults(3)

        await filterPage.selectAccount('4')
        await filterPage.checkAccountResults(2)

        await filterPage.selectAccount('6')
        await filterPage.checkAccountNoResults()
    })
})
