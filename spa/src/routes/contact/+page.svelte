<script lang="ts">

    const { data } = $props()
    const { contact } = data

</script>


{#if contact}
    <div>
        <label>
            Name
            <input value={contact.name}>
        </label>
    </div>
    <div>
        <label>
            Age
            <input value={contact.age}>
        </label>
    </div>
{:else}
    <div>
        Failed fetching contacts.
    </div>
{/if}

