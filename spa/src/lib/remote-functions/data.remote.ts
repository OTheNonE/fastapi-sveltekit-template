import { getRequestEvent, query } from "$app/server";
import { error } from "@sveltejs/kit";
import { createOpenApiClient } from "$lib/openapi";
import { z } from "zod/v4"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getContact = query(async () => {

    await sleep(1000)

    const client = createOpenApiClient({ baseUrl: "http://localhost:8000" })

    const { data, error: err } = await client.GET("/api/contact")

    if (err) {
        error(404, "Not found")
    }

    return data
})