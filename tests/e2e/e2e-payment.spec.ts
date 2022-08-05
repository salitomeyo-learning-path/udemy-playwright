import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/LoginPage'
import { PaymentPage } from '../../pages/PaymentPage'

import { Navbar } from '../../pages/components/Navbar'

test.describe("New payment", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage

    let navbar: Navbar

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        paymentPage = new PaymentPage(page)

        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await homePage.visitTransferFunds()
    })

    test("Should send new payment", async ( ) => {
        await navbar.clickOnTab('Pay Bills')
        await paymentPage.createPayment('apple', '6', '5000', '2022-08-05', 'some random message')

        await paymentPage.assertSuccessMessage('The payment was successfully submitted.')
    })
})
