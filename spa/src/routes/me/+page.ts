import { loadOpenAPI, createOpenApiClient } from "$lib/openapi"
export const load = async (event) => {
    const openapi = createOpenApiClient(event)

    const { data: user, error } = await openapi.GET("/api/oauth/profile")

    return { user, hey: "there" }

}