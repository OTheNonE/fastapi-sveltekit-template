
export async function load({ fetch }) {

    const response = await fetch("/api/about")
    const about = await response.json()

    return { about }

}