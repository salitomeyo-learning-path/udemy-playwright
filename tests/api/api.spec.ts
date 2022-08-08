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

    test('GET request - Get user detail', async ({ request }) => {
        const response = await request.get(baseUrl+'/users/5')
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(5)
        expect(responseBody.data.first_name).toBe('Charles')
        expect(responseBody.data.email).toBeTruthy()  
    })

    test('POST Request - Create new user', async ({ request }) => {
        const response = await request.post(`${baseUrl}/user`, {
            data: {
                id: 100
            },
        })
        expect(response.status()).toBe(201)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(100)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test('POST Request - Login', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            },
        })
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.token).toBeTruthy()
    })

    test('POST Request - Login fail', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: "any_email@email.com",
                password: "random_password"
            },
        })
        expect(response.status()).toBe(400)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.error).toBe('user not found')
    })
})
