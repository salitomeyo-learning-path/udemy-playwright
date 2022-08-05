import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage{
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitBtn: Locator
    readonly errorMessage: Locator
    readonly loginForm: Locator

    constructor (page: Page) {
        super(page)
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitBtn = page.locator('text=Sign in')
        this.errorMessage = page.locator('.alert-error')
        this.loginForm = page.locator('#login_form')
    }

    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitBtn.click()
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText('Login and/or password are wrong.')
    }

    async snapshotLoginForm() {
        expect(await this.loginForm.screenshot()).toMatchSnapshot('login-form.png')
    }

    async snapshotErrorMessage() {
        expect(await this.errorMessage.screenshot()).toMatchSnapshot('login-error.png')
    }
}
