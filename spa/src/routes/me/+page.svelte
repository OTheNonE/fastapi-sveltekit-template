<script lang="ts">

    import Debug from "$lib/components/debug.svelte"


    const { data } = $props()
    const { user } = data

</script>

<Debug data={user} />