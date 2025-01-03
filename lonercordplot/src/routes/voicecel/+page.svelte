<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let { data }: { data: PageData } = $props();

	onMount(async () => {
		const svg = d3.select('#voicecel-plot');
		svg
		.append('circle')
		.attr('cx', '50%')
		.attr('cy', '50%')
		.attr('r', 20)
		.style('fill', 'red');
	});
</script>

<div class="flex h-full w-full bg-white">
	<div>
		<h1>Test</h1>
		<svg id="voicecel-plot" width="400" height="200"></svg>
	</div>
</div>