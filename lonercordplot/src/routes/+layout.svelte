<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-svh w-full flex-col bg-inherit">
	<header class="flex items-center space-x-3 bg-purple-900/[0.6] p-2 text-white">
		<img src="/images/LonerBox.png" alt="Lonerbox" class="w-20" />
		<h1 class="font-mono text-3xl font-bold">Lonercord's Psychopathy Scores</h1>
	</header>
	{@render children()}
	<footer class="flex w-full items-end justify-center bg-gray-800 p-4 text-center text-white">
		<p>&copy; 2024 Lonercord Users. All rights reserved.</p>
	</footer>
</div>
