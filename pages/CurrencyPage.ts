import { expect, Locator, Page } from "@playwright/test";

export class CurrencyPage {
    readonly page: Page
    readonly currencyExchangeTab: Locator
    readonly currencySelectBox: Locator
    readonly sellRate: Locator
    readonly amountInput: Locator
    readonly inDollarsRadioBtn: Locator
    readonly calculateBtn: Locator
    readonly conversionAmount: Locator
    readonly purchaseBtn: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.currencyExchangeTab = page.locator("a[href='#ui-tabs-3']")
        this.currencySelectBox = page.locator('#pc_currency')
        this.sellRate = page.locator('#sp_sell_rate')
        this.amountInput = page.locator('#pc_amount')
        this.inDollarsRadioBtn = page.locator('#pc_inDollars_true')
        this.calculateBtn = page.locator('#pc_calculate_costs')
        this.conversionAmount = page.locator('#pc_conversion_amount')
        this.purchaseBtn = page.locator('#purchase_cash')
        this.message = page.locator('#alert_content')
    }

    async fillCurrencyForm(currencyOption: string, amount: string) {
        await this.currencyExchangeTab.click()
        await this.currencySelectBox.selectOption(currencyOption)
        await expect(this.sellRate).toBeVisible()
        await this.amountInput.type(amount)
        await this.inDollarsRadioBtn.click()
        await this.calculateBtn.click()
        await expect(this.conversionAmount).toBeVisible()
        await this.purchaseBtn.click()
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('Foreign currency cash was successfully purchased.')
    }
}
