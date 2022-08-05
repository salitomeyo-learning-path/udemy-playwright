import { expect, Locator, Page } from "@playwright/test";

export class PaymentPage {
    readonly page: Page
    readonly payeeSelectBox: Locator
    readonly payeeDetailBtn: Locator
    readonly payeeDetail: Locator
    readonly accountSelectBox: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentBtn: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.payeeSelectBox = page.locator('#sp_payee')
        this.payeeDetailBtn = page.locator('#sp_get_payee_details')
        this.payeeDetail = page.locator('#sp_payee_details')
        this.accountSelectBox = page.locator('#sp_account')
        this.amountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator('#sp_description')
        this.submitPaymentBtn = page.locator('#pay_saved_payees')
        this.message = page.locator('#alert_content > span')
    }

    async createPayment(payeeBoxOption: string, accountBoxOption: string, amount: string, date: string, description: string) {
        await this.payeeSelectBox.selectOption(payeeBoxOption)
        await this.payeeDetailBtn.click()
        await expect(this.payeeDetail).toBeVisible()
        await this.accountSelectBox.selectOption(accountBoxOption)
        await this.amountInput.type(amount)
        await this.dateInput.type(date)
        await this.descriptionInput.type(description)
        await this.submitPaymentBtn.click()
    }

    async assertSuccessMessage(message: string) {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText(message)
    }
}
