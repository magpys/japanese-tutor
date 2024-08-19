<script>
	import { goto } from '$app/navigation';

	export let data;
	$: ({ supabase } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}

		await goto('/');
	};
</script>

<header class="w-screen bg-teal-200 flex flex-row justify-between items-center gap-3 p-3">
	<h1 class="font-bold text-2xl"><a href="/">Japanese Tutor</a></h1>

	<nav class="flex flex-row gap-4 items-center">
		<a href="/tutor">Chat History</a>
		<button class="bg-red-300 rounded shadow p-2 hover:bg-red-600 ml-5" on:click={logout}>Logout</button>
	</nav>
</header>
<main>
	<slot />
</main>