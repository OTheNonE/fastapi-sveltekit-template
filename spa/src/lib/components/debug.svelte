<script lang="ts">

    type Props = {
        data: {} | null | undefined
    }

    const { data }: Props = $props()

</script>

<pre> 
    {JSON.stringify(data, undefined, 4)}
</pre>