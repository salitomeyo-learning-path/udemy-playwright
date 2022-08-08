import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage"
import { LoginPage } from "../../pages/LoginPage"

test.describe('Login page visual test', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
    })

    test('Login form', async ({ page }) => {
        await loginPage.snapshotLoginForm()
    })

    test('Login Error Message', async ({ page }) => {
        await loginPage.login('fail', 'some invalid password')
        await loginPage.snapshotErrorMessage()
    })
})
