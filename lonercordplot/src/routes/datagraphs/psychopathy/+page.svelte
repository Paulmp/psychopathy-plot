<script lang="ts">
	import type { PageData } from '../../psychopathy/$types';
	import { onMount } from 'svelte';
	import psychopathy from '$lib/data/dataFile.json'
	import * as d3 from 'd3';

	let dataFile: any;
	let nameList: string;
	let { data }: { data: PageData } = $props();

	onMount(async () => {
		const pageElement = document.getElementById('plot');
		document.querySelector('#plot')?.appendChild(plotData(psychopathy));
	});

	function plotData(dataFile: any) {
		const width = 750;
		const height = 700;
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
					.text('Primary Psychopathy')
					.attr('color', 'white')
					.attr('font-size', '20px')
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
					.text('Secondary Psychopathy')
					.attr('font-size', '20px')
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

<div>
	<h2 class="mt-4 text-2xl font-bold text-white">Psychopathy Plot</h2>
</div>
<div class="text-white" id="plot"></div>
