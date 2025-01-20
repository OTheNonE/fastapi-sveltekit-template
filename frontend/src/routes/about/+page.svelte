<script lang="ts">

    import Debug from "$lib/components/debug.svelte"

    const { data } = $props()
    const { about } = data

</script>

<Debug data={about} />