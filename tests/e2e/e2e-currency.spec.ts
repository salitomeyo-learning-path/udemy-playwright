import { test, expect } from '@playwright/test'

test.describe.only("Purchase foreign currency cash", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test("Should purchase foreign cash", async ({ page }) => {
        await page.click('#pay_bills_tab')
        await page.click("a[href='#ui-tabs-3']")
        await page.selectOption('#pc_currency', 'JPY')
        await page.waitForSelector('#sp_sell_rate')
        await page.type('#pc_amount', '600')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')
        await page.waitForSelector('#pc_conversion_amount')
        await page.click('#purchase_cash')

        const message = page.locator('#alert_content')
        await expect(message).toBeVisible()
        await expect(message).toHaveText('Foreign currency cash was successfully purchased.')
    })
})
