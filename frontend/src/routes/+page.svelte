<script lang="ts">
    import Debug from '$lib/components/debug.svelte';

    const { data } = $props()

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div>
    <p> This is my message: </p>
    <Debug data={data.result}/>
</div>
