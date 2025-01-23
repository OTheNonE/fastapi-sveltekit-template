import { loadOpenAPI } from "$lib/openapi"

export const load = loadOpenAPI(async ({ open_api }) => {

    const { data: contact, error, response } = await open_api.GET("/api/contact")

    if (error) {
        return { contact: null }
    }

    return { contact }
})

