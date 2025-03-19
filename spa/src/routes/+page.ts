import { createOpenApiClient } from "$lib/openapi"

export const load = async (event) => {
    const openapi = createOpenApiClient(event)

    const { data, error } = await openapi.GET("/api/hello")

    if (error) {
        return { result: null }
    }

    return { result: data }

}