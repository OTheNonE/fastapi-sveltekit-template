<script lang="ts">

    import Debug from "$lib/components/debug.svelte"

    const { data } = $props()
    const { contact } = data

</script>

<Debug data={contact} />