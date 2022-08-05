import { expect, Locator, Page } from "@playwright/test";

export class FilterPage {
    readonly page: Page
    readonly accountSelectBox: Locator
    readonly accountResults: Locator
    readonly accountNoResults: Locator

    constructor(page: Page) {
        this.page = page
        this.accountSelectBox = page.locator('#aa_accountId')
        this.accountResults = page.locator('#all_transactions_for_account tbody tr')
        this.accountNoResults = page.locator('.well')
    }

    async selectAccount(accountId: string) {
        await this.accountSelectBox.selectOption(accountId)
    }

    async checkAccountResults(accountsQuantity: number) {
        await expect(this.accountResults).toHaveCount(accountsQuantity)
    }

    async checkAccountNoResults() {
        await expect(this.accountNoResults).toBeVisible()
    }
}
