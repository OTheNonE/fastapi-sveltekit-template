import type { paths } from "$lib/generated/types.js"
import type { ServerLoad, ServerLoadEvent } from "@sveltejs/kit"
import openApiCreateClient, { type Client } from "openapi-fetch"

type Fetch = (input: Request) => Promise<Response>

/**
 * The OpenAPI client for typesafe fetching on API's supporting the OpenAPI standard.
 */
export type OpenAPIClient = Client<paths>

interface OpenAPIClientEvent {
    /**
     * The OpenAPI client for typesafe fetching on API's supporting the OpenAPI standard.
     */
    open_api: OpenAPIClient
}

export function createOpenApiClient(fetch: Fetch) {
    const client = openApiCreateClient<paths>({ fetch })
    return client
}


type OpenApiServerLoad = (event: Parameters<ServerLoad>[0] & OpenAPIClientEvent) => ReturnType<ServerLoad>

/**
 * Loads the OpenAPI client and sets it as part of the event parameter.
 */
export function loadOpenAPI<S extends OpenApiServerLoad, E extends ServerLoadEvent>(cb: S) {
    return async (event: E) => {
        const open_api = createOpenApiClient(event.fetch)
        const data = await cb({ ...event, open_api })
        return data
    }
}