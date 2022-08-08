import { test, expect } from "@playwright/test";

test.describe.parallel("API Testing", () => {
    const baseUrl = 'https://reqres.in/api'

    test('Single API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(baseUrl+'/users/2')
        expect(response.status()).toBe(200)
    })

    test('Single API Test - Assert invald endpoint', async ({ request }) => {
        const response = await request.get(baseUrl+'/users/non-existing-endpoint')
        expect(response.status()).toBe(404)
    })

    test('Get reques - Get user detail', async ({ request }) => {
        const response = await request.get(baseUrl+'/users/5')
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(5)
        expect(responseBody.data.first_name).toBe('Charles')
        expect(responseBody.data.email).toBeTruthy()  
    })
})
