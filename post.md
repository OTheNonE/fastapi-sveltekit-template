I’m trying to figure out how to handle data flow with remote functions when using a separate backend (e.g., FastAPI with automatic OpenAPI documentation). From what I can tell, `.remote` functions are missing some of the capabilities that `+page.ts` provides with SSR, specifically:
- There’s no way to access `fetch` in a context that runs on both server and client (as `+page.ts` does).
- `handleFetch` can’t intercept requests for a fetch function that works seamlessly across server and client (unlike the `fetch` provided to the `load` function in `+page.ts`).

### My use-case
I have SvelteKit running on `http://localhost:3000` and FastAPI running on `http://localhost:8000`. The SvelteKit is served behind `https://my-app.com` and FastAPI behind `https://api.my-app.com`.

I don’t want to recreate every API endpoint in SvelteKit. Instead, I’d like to directly consume FastAPI’s endpoints:
- On the server, requests should go to `http://localhost:8000`.
- On the client, requests should go to `https://api.my-app.com`.

### Using `load` functions
A fetch example:
```ts
// routes/+page.ts
export const load = async ({ fetch }) => {
    // SvelteKit’s `fetch` is intercepted by `handleFetch`.
    // On the server: request is rewritten to http://localhost:8000
    // On the client: request goes to https://api.my-app.com
    const result = await fetch("https://api.my-app.com/api/contact")
    const contact = await result.json()

    return { contact }
}
```

The rewrite is handled in `hooks.server.ts`:
```ts
// hooks.server.ts
export const handleFetch = async ({ event, fetch, request }) => {

    // If i am calling my API from the server, call the API server process directly instead.
    if (request.url.startsWith("https://api.my-app.com")) {
        request = new Request(
            request.url.replace("https://api.my-app.com", 'http://localhost:8000'),
            request
        )
        // ... and do more stuff regarding cookies and more ...
    }

    return fetch(request)
}
```

### with `.remote.ts` functions
With .remote functions (without load), I can’t find a way to achieve the same behavior:
- I can’t access SvelteKit’s `getRequestEvent().fetch` in a universal server/client context.
- As a result, I can’t transparently swap between the local backend and the public API.

So currently I see two options:
- Always call the public API (`https://api.my-app.com`) from the client.
- Create a new `.remote` function in SvelteKit (duplicating the FastAPI endpoint) and fetch data SSR through that.

What is the recommended approach here? Is there a way to use `.remote` functions while still leveraging the same `fetch`/`handleFetch` mechanics as `+page.ts`?

Or do I need to adjust my approach— is the recommended practice to essentially re-create all of my API endpoints within SvelteKit using `.remote` functions?