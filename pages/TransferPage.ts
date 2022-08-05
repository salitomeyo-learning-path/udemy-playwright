import { expect, Locator, Page } from "@playwright/test";

export class TransferPage {
    readonly page: Page
    readonly accountSelectBox: Locator
    readonly amountInput: Locator
    readonly descriptionInput: Locator
    readonly submitBtn: Locator
    readonly boardHeader: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page;
        this.accountSelectBox = page.locator('#tf_fromAccountId')
        this.amountInput = page.locator('#tf_amount')
        this.descriptionInput = page.locator('#tf_description')
        this.submitBtn = page.locator('#btn_submit')
        this.boardHeader = page.locator('h2.board-header')
        this.message = page.locator('.alert-success')
    }

    async fillTranferForm(accountOption: string, amount: string, description: string) {
        await this.accountSelectBox.selectOption(accountOption)
        await this.amountInput.type(amount)
        await this.descriptionInput.type(description)
        await this.submitBtn.click()
        await expect(this.boardHeader).toContainText('Verify')
        await this.submitBtn.click()
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('You successfully submitted your transaction')
    }
}
