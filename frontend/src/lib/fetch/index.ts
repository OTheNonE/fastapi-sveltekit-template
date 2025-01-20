import type { paths } from "$lib/generated/types.js"
import openApiCreateClient from "openapi-fetch"

type Fetch = (input: Request) => Promise<Response>

export function createClient(fetch: Fetch) {
    const client = openApiCreateClient<paths>({ fetch })
    return client
}