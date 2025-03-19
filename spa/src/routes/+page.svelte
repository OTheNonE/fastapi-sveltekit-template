<script lang="ts">
    import Debug from '$lib/components/debug.svelte';

    const { data } = $props()
    const { user } = data

</script>

<h1> Home </h1>

<div>
    <p> This is my message: </p>
    <Debug data={data.result}/>
</div>
