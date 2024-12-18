<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let dataFile: any;
	let nameList: string;
	let { data }: { data: PageData } = $props();

	onMount(async () => {
		const response = await fetch('data/dataFile.json');

		if (!response.ok) {
			throw new Error(`Failed to fetch JSON: ${response.status} - ${response.statusText}`);
		}

		const dataFile = await response.json();

		document.getElementById('plot')?.append(plotData(dataFile));
		// document.querySelector('#plot')?.appendChild(plotData(dataFile));
	});

	function plotData(dataFile: any) {
		const width = 1050;
		const height = 750;
		const margin = { top: 20, right: 30, bottom: 50, left: 50 };
		const dataLength = dataFile.length;
		const xScale = d3
			.scaleLinear()
			.domain([1, 5])
			.range([margin.left, width - margin.right]);

		// Declare the y (vertical position) scale.
		const yScale = d3
			.scaleLinear()
			.domain([1, 5])
			.range([height - margin.bottom, margin.top]);
		// Create the SVG container.
		const svg = d3.create('svg').attr('width', width).attr('height', height);

		// Add x-axis to the SVG
		svg
			.append('g')
			.attr('transform', `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(xScale))
			.call((g) =>
				g
					.append('text')
					.attr('x', width - margin.right)
					.attr('y', -10)
					.attr('fill', 'white')
					.attr('text-anchor', 'end')
					.text('Secondary Psychopathy')
					.attr('color', 'white')
			);

		// Add y-axis to the SVG
		svg
			.append('g')
			.attr('transform', `translate(${margin.left},0)`)
			.call(d3.axisLeft(yScale))
			.call((g) =>
				g
					.append('text')
					.attr('x', 10)
					.attr('y', margin.top)
					.attr('fill', 'white')
					.attr('text-anchor', 'start')
					.text('Primary Psychopathy')
			);

		// Add circles for the scatter plot
		for (let i = 0; i < dataLength; i++) {
			svg
				.append('g')
				.selectAll('circle')
				.data(dataFile)
				.join('circle')
				.attr('cx', () => xScale(dataFile[i].coords[0]))
				.attr('cy', () => yScale(dataFile[i].coords[1]))
				.attr('r', 5)
				.attr('fill', 'steelblue');

			svg
				.append('g')
				.selectAll('text')
				.data(dataFile)
				.join('text')
				.attr('x', () => xScale(dataFile[i].coords[0])) // Slightly offset the label from the point
				.attr('y', () => yScale(dataFile[i].coords[1]) - 10)
				.attr('fill', 'white')
				.attr('font-size', '10px')
				.text((d) => dataFile[i].name);
		}

		// Return the SVG element.
		return svg.node();
	}
</script>

<div class="flex min-h-screen flex-col bg-inherit">
	<header class="flex items-center space-x-3 bg-purple-900/[0.6] p-2 text-white">
		<img src="/images/LonerBox.png" alt="Lonerbox" class="w-20" />
		<h1 class="font-mono text-3xl font-bold">Lonercord's Psychopathy Scores</h1>
	</header>

	<section class="flex flex-grow flex-col items-center p-8">
		<div>
			<h2 class="animate-slideUpAndFade mb-4 text-2xl font-bold text-white">Psychopathy Plot</h2>
		</div>
		<div class="animate-slideUpAndFade text-white" id="plot"></div>
	</section>

	<!-- <footer class="bg-gray-800 p-4 text-center text-white">
		<p>&copy; 2024 Lonercord Users. All rights reserved.</p>
	</footer> -->
</div>
