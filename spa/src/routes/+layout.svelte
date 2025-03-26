<script lang="ts">
    import type { APIRoutes } from '$lib/openapi';
	import '../app.css';
	
	let { children, data } = $props();
	const { user } = data

	const navs = [
		{
			href: "/",
			title: "Home"
		},
		{
			href: "/me",
			title: "Me"
		},
		{
			href: "/contact",
			title: "Contact"
		}
	] as const

	const login_nav = {
		href: "/api/oauth/login" satisfies APIRoutes,
		title: "Login"
	} as const

	const logout_nav = {
		href: "/api/oauth/logout" satisfies APIRoutes,
		title: "Logout"
	} as const

</script>

<div class="border-blue-700 border-2">
	<div class="flex m-2">
		<div class="flex gap-2">
			{#each navs as { href, title }}
				<a {href}> {title} </a>
			{/each}	
		</div>

		<div class="ml-auto flex gap-2">
			{#if user}
				{@const { href, title } = logout_nav}
				<div> Welcome {user.name} ({user.email}) </div>
				<a {href}> {title} </a>
			{:else}
				{@const { href, title } = login_nav}
				<a {href}> {title} </a>
			{/if}

		</div>
	</div>
</div>

{@render children()}
