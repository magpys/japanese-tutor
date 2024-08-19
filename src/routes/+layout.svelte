<script>
	import "../app.css";
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<!--tailwind seems to have a bug when used with sveltekit that means colour classes sometimes fail to get included.-->
<!--This 'hack' makes the compiler include the colours.-->
<div class="hidden">
	<div class="bg-teal-300"></div>
	<div class="bg-red-300"></div>
	<div class="bg-yellow-300"></div>
	<div class="bg-green-300"></div>
	<div class="bg-blue-300"></div>
	<div class="bg-purple-300"></div>
	<div class="bg-orange-300"></div>
</div>

<slot />