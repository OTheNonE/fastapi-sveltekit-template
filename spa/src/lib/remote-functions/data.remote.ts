import { getRequestEvent, query, form, command } from "$app/server";

export const getContact = query(async () => {
    const { fetch } = getRequestEvent()

    const result = await fetch("https://api.my-app.com/api/contact")
    const contact = await result.json()

    return contact
})