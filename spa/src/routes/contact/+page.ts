import { loadOpenAPI } from "$lib/openapi"

export const load = loadOpenAPI(async ({ openapi }) => {

    const { data: contact, error, response } = await openapi.GET("/api/contact")

    if (error) {
        return { contact: null }
    }

    return { contact }
})

