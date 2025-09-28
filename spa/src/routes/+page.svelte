<script lang="ts">
    import { browser } from '$app/environment';
    import { invalidateAll } from '$app/navigation';
    import { getRequestEvent } from '$app/server';
    import Debug from '$lib/components/debug.svelte';
    import { createOpenApiClient } from '$lib/openapi/index.js';
    import { getContact } from '$lib/remote-functions/data.remote.js';

    const { data } = $props()

    const something = $derived(getContact())

    const client = createOpenApiClient({ baseUrl: "https://api.something.dom" })

    async function getData() {
        const { fetch } = getRequestEvent()
        const result = await fetch("http://localhost:5173/api/contact")
    }

</script>

<h1> Home </h1>

<div>
    <svelte:boundary onerror={(err) => console.log(err)}>
        {#snippet pending()}
            <div>...loading...</div>
        {/snippet}

        {#snippet failed(error, reset)}
            <p> An error occured: </p>
            <p> {error} </p>
            <button onclick={() => {
                console.log("reset!")
                reset()
            }}> Try again </button>
        {/snippet}

        <p> This is my contact: </p>
        <Debug data={await something}/>

        <button onclick={() => invalidateAll()}> Refresh </button>

    </svelte:boundary>
</div>
