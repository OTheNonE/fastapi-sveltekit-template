<script lang="ts">
	import '../app.css';
	let { children } = $props();

	const navs = [
		{
			href: "/",
			title: "Home"
		},
		{
			href: "/about",
			title: "About"
		},
		{
			href: "/contact",
			title: "Contact"
		}
	]

</script>

<div class="border-blue-700 border-2">
	<div class="flex gap-2 m-2">
		{#each navs as { href, title }}
			<a {href}> {title} </a>
		{/each}
	</div>
</div>

{@render children()}
