<script lang="ts">
	import type { PageData } from './$types';
	import type { UserData } from '../../../types/psychopathyTypes';
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
				datasets: [
					{
						label: 'Lonercord User',
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
		let currUserData: UserData;
		let psychopathyValues = [];

		for (let i = 0; i < dataFile.length; i++) {
			currUserData = {
				user: dataFile[i].name,
				x: dataFile[i].coords[0],
				y: dataFile[i].coords[1]
			};
			psychopathyValues.push(currUserData);
		}

		checkIdenticalValues(dataFile);
		// console.log('after algo')

		return { psychopathyValues };
	}

	// Merges all users with the same same coordinates.
	function mergeSameCoords() {}

	// Checks if multiple users have the same coordinates
	// Returns a list of tuples with the same coordinates
	function checkIdenticalValues(dataSet: any[]) {
		let sameCoords: [UserData, UserData][] = [];
		for (let i = 0; i < dataSet.length; i++) {
			for (let j = i + 1; j < dataSet.length; j++) {
				if (
					comparator(dataSet[i].coords[0], dataSet[j].coords[0]) &&
					comparator(dataSet[i].coords[1], dataSet[j].coords[1])
				) {
					sameCoords.push([dataSet[i], dataSet[j]]);
					console.log(sameCoords);
				}
			}
		}
		return sameCoords;
	}

	function comparator(operant1: any, operant2: any) {
		return operant1 == operant2 ? true : false;
	}
</script>

<h2 class="mt-4 px-5 text-2xl font-bold text-white">Voicecel Graph</h2>
<!-- <div class="text-white" id="plot"></div> -->
<canvas id="myChart" class="p-3"></canvas>
