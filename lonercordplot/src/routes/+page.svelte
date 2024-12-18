<script lang="ts">
	import type { PageData } from './$types';
	import { select, scaleLinear, axisBottom, axisLeft } from 'd3';

	let { data }: { data: PageData } = $props();
</script>

<main class="flex min-h-screen flex-col bg-inherit">
	<header class="flex items-center bg-purple-900/[0.6] p-3 text-white space-x-3 p-2">
		<img src="/images/LonerBox.png" alt="Lonerbox" class="w-20" />
		<h1 class="font-mono text-3xl font-bold">Lonercord's Psychopathy Scores</h1>
	</header>

	<section class="flex flex-grow flex-col items-center justify-center p-8">
		<div>
			<h2 class="mb-4 text-2xl text-white">Test</h2>
		</div>
	</section>

	<!-- <footer class="bg-gray-800 p-4 text-center text-white">
		<p>&copy; 2024 Lonercord Users. All rights reserved.</p>
	</footer> -->
</main>
