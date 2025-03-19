import { createOpenApiClient } from "$lib/openapi"

export const load = async (event) => {
    const openapi = createOpenApiClient(event)

    const { data: contact, error, response } = await openapi.GET("/api/contact")

    if (error) {
        return { contact: null }
    }

    return { contact }
}

