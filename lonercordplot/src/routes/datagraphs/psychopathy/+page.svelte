<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import psychopathy from '$lib/data/dataFile.json';
	import * as d3 from 'd3';
	import Chart from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	let dataFile: any;
	let nameList: string;
	let { data }: { data: PageData } = $props();

	onMount(async () => {
		const preparedData = splitNamesFromData();
		Chart.register(ChartDataLabels);
		const dataChart = new Chart('myChart', {
			type: 'scatter',
			data: {
				labels: preparedData.labels,
				datasets: [
					{
						label: 'Users',
						data: preparedData.psychopathyValues,
						borderWidth: 1
					}
				]
			},
			options: {
				plugins: {
					legend: {
						labels: {
							color: 'white' // Change the color of the legend text
						}
					},
					datalabels: {
						align: 'top', // Align labels above the points
						anchor: 'end', // Position relative to the point
						color: 'white',
						formatter(value, context) {
							return value.user;
						}
					}
				},
				scales: {
					x: {
						type: 'linear',
						position: 'bottom',
						min: 1,
						max: 5,
						ticks: {
							color: 'white'
						}
					},
					y: {
						type: 'linear',
						min: 1,
						max: 5,
						ticks: {
							color: 'white'
						}
					}
				}
			}
		});
	});

	function splitNamesFromData() {
		let dataFile = psychopathy;
		let psychopathyValues = [];

		for (let i = 0; i < dataFile.length; i++) {
			psychopathyValues.push({
				user: dataFile[i].name,
				x: dataFile[i].coords[0],
				y: dataFile[i].coords[1]
			});
		}

		return { psychopathyValues };
	}

	function checkIdenticalValues() {}
</script>

<h2 class="mt-4 px-5 text-2xl font-bold text-white">Voicecel Graph</h2>
<!-- <div class="text-white" id="plot"></div> -->
<canvas id="myChart" class="p-3"></canvas>
