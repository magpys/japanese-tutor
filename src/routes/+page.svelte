<script>
	import { goto } from '$app/navigation';
</script>
<div class="flex items-center justify-center flex-col gap-3.5 h-screen">
	<h1 class="text-3xl font-bold underline">Japanese Tutor</h1>
	<p class="text-lg font-bold text-gray-500 text-center">Practise Japanese with your very own AI Tutor</p>
	<button class="bg-blue-300 rounded shadow p-2 hover:bg-blue-600" on:click={() => { goto(`/auth`) }}>Log in or Sign up</button>
</div>