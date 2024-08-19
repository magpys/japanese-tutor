<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let loading = false;

	export let data: PageData;
	$: ({ chats } = data);
</script>

<div class="max-h-screen flex flex-col gap-6 m-4 box-border">
	<p class="bg-blue-200 rounded p-3">Your AI Japanese Tutor will ask you three questions. Work with them to get the right answers.</p>
	<form
		method="POST"
		class="flex items-center justify-center w-full"
		action="?/begin"
		use:enhance={() => {
			loading = true;

			return async ({ update }) => {
				await update()

				loading = false;
			}
		}}
	>
		<button class="bg-blue-300 rounded p-3 hover:bg-blue-600 text-4xl flex gap-3 items-center" disabled={loading}>
			{#if loading}
				<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_P7sC{transform-origin:center;animation:spinner_svv2 .75s infinite linear}@keyframes spinner_svv2{100%{transform:rotate(360deg)}}</style><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner_P7sC"/></svg>
				Creating...
			{:else}
				Begin new chat
			{/if}
		</button>
	</form>
	{#if chats.length > 0}
		<h3>Chat History</h3>
	{/if}
	{#each chats as chat}
		<div class="bg-pink-300 rounded p-3 flex justify-between gap-5 items-center">
			<p>Chat number {chat.id} - started {new Date(chat.created_at).toLocaleDateString()} at {new Date(chat.created_at).toLocaleTimeString()}.</p>
			<a href={`/tutor/${chat.id}`}>Go to chat</a>
		</div>

	{/each}
</div>

