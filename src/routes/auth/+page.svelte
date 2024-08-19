<div class="flex items-center justify-center flex-col gap-8 h-screen">
	<h1 class="font-bold underline">Japanese Tutor</h1>
	<form method="POST" action="?/login" class="flex flex-col gap-3 justify-items-start">
		<div class="flex flex-col gap-1">
			<label for="email" class="text-gray-500">Email</label>
			<input name="email" type="email" />
		</div>
		<div class="flex flex-col gap-1">
			<label for="password" class="text-gray-500">Password</label>
			<input name="password" type="password" />
		</div>
		<button class="bg-blue-300 rounded shadow p-2 hover:bg-blue-600 mt-2">Login</button>
		<button formaction="?/signup" class="underline hover:bg-blue-600 rounded shadow border-2 p-2">Sign up</button>
	</form>
</div>