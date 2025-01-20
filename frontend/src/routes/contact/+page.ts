import { createClient } from "$lib/fetch"

export async function load({ fetch }) {

    const client = createClient(fetch)

    const { data: contact, error, response } = await client.GET("/api/contact")

    if (error) {
        return { contact: null }
    }

    return { contact }
}