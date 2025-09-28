

export const handleFetch = async ({ event, fetch, request }) => {

    if (request.url.startsWith("https://api.my-app.com")) {
        request = new Request(
            request.url.replace("https://api.my-app.com", 'http://localhost:8000'),
            request
        )
        // ... and do more stuff regarding cookies and more ...
    }

    return fetch(request)
}