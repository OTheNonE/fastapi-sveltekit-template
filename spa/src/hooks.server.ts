

export const handleFetch = async ({ event, fetch, request }) => {

    if (request.url.startsWith("https://api.something.dom")) {
        request = new Request(
            request.url.replace("https://api.something.dom", 'http://localhost:8000'),
            request
        )
    }

    return fetch(request)
}