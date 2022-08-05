import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitBtn: Locator
    readonly errorMessage: Locator

    constructor (page: Page) {
        this.page = page
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitBtn = page.locator('text=Sign in')
        this.errorMessage = page.locator('.alert-error')
    }

    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitBtn.click()
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText('Login and/or password are wrong.')
    }
}
