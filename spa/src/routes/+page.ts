export async function load({ fetch }) {

    const response = await fetch("/api/hello")

    const result = await response.json()

    return { result }

}