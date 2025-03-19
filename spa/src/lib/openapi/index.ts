import type { paths } from "$lib/generated/openapi"
import type { ServerLoad, ServerLoadEvent } from "@sveltejs/kit"
import openApiCreateClient, { type Client,  } from "openapi-fetch"

type Fetch = (input: Request) => Promise<Response>

type OpenApiServerLoad = (event: Parameters<ServerLoad>[0] & OpenAPIClientEvent) => ReturnType<ServerLoad>

interface OpenAPIClientEvent {
    /**
     * The OpenAPI client for typesafe fetching on API's supporting the OpenAPI standard.
     */
    openapi: OpenAPIClient
}

export type APIRoutes = keyof paths

/**
 * The OpenAPI client for typesafe fetching on API's supporting the OpenAPI standard.
 */
export type OpenAPIClient = Client<paths>

export function createOpenApiClient(event: { fetch: Fetch }) {
    const client = openApiCreateClient<paths>(event)
    return client
}

/**
 * Loads the OpenAPI client and sets it as part of the event parameter.
 */
export function loadOpenAPI<S extends OpenApiServerLoad, E extends ServerLoadEvent>(cb: S) {
    return async (event: E) => {
        const openapi = createOpenApiClient(event)
        const data = await cb({ ...event, openapi })
        return data
    }
}