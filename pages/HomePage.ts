import { expect, Locator, Page} from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly signInBtn: Locator
    readonly feedbackBtn: Locator
    readonly searchBar: Locator

    constructor(page: Page) {
        this.page = page
        this.signInBtn = page.locator('#signin_button')
        this.feedbackBtn = page.locator('#feedback')
        this.searchBar = page.locator('#searchTerm')
    }

    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/')
    }

    async visitTransferFunds() {
        await this.page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    }

    async clickOnSignIn() {
        await this.signInBtn.click()
    }

    async clickOnFeedback() {
        await this.feedbackBtn.click()
    }

    async searchFor(phrase: string) {
        await this.searchBar.type(phrase)
        await this.page.keyboard.press('Enter')
    }
}

