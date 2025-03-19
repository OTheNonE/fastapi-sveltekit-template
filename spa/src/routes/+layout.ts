import { createOpenApiClient } from "$lib/openapi"

export const prerender = false
export const ssr = false

export const load = async (event) => {
    const openapi = createOpenApiClient(event)
    
    const { data: user, error } = await openapi.GET("/api/oauth/profile")

    console.log(user)

    return { user }

}