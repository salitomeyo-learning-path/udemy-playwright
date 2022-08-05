import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { FeedbackPage } from '../../pages/FeedbackPage'

test.describe('Feedback form', () => {
    let homePage: HomePage
    let feedbackPage: FeedbackPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homePage.visit()
        await homePage.clickOnFeedback()
    })

    test("Reset feedback form", async () => {
        await feedbackPage.fillForm('some name', 'some email@email.com', 'some subject', 'some nice comment about the application')

        await feedbackPage.resetForm()
        await feedbackPage.assertReset()
    })

    test("Submit feedback form", async () => {
        await feedbackPage.fillForm('some name', 'some email@email.com', 'some subject', 'some nice comment about the application')

        await feedbackPage.submitForm()
        await feedbackPage.feedbackFormSent()
    })
})
