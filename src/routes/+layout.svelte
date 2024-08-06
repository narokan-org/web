<script lang="ts">
	import { setContext } from 'svelte';
	import Header from '$lib/components/header/index.svelte';
	import '../app.css';

	import { isLoggedIn, userClaims } from '$lib/stores/auth';
	export let data: { isLoggedIn: boolean; claims: any };

	isLoggedIn.set(data.isLoggedIn);
	userClaims.set(data.claims);

	setContext('auth', { isLoggedIn: data.isLoggedIn, claims: data.claims });
</script>

<Header />

<main class="mx-4">
	<slot></slot>
</main>
