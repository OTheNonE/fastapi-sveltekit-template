

export const load = async ({ fetch }) => {

    // I have access to SvelteKit's `fetch` that is captured by `handleFetch`.
    const result = await fetch("https://api.my-app.com/api/contact")

    const contact = await result.json()

    return { contact }
}