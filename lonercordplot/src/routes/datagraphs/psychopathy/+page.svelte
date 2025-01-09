<script lang="ts">
	import type { PageData } from './$types';
	import type { UserData } from '../../../types/psychopathyTypes';
	import { onMount } from 'svelte';
	import psychopathy from '$lib/data/dataFile.json';
	import * as d3 from 'd3';
	import Chart from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { xl } from 'flowbite-svelte';

	let dataFile: any;
	let nameList: string;
	let { data }: { data: PageData } = $props();

	onMount(async () => {
		let dataFile = psychopathy;
		const preparedData = splitNamesFromData(dataFile);
		Chart.register(ChartDataLabels);
		const dataChart = new Chart('myChart', {
			type: 'scatter',
			data: {
				datasets: [
					{
						label: 'Lonercord User',
						data: preparedData,
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

	/**
	 * Converts the dataset into objects that have three attributes:
	 * 1. user - Name of the user
	 * 2. x - Main Pyschopathy value
	 * 3. y -
	 * @param dataFile
	 * @returns The array of names and x and y coordinates of each data entry.
	 */
	function splitNamesFromData(dataFile: any): UserData[] {
		let currUserData: UserData;
		let psychopathyValues: UserData[] = [];

		for (let i = 0; i < dataFile.length; i++) {
			currUserData = {
				user: dataFile[i].name,
				x: dataFile[i].coords[0],
				y: dataFile[i].coords[1]
			};
			psychopathyValues.push(currUserData);
		}

		getIdenticalValues(dataFile);

		return psychopathyValues;
	}

	/**
	 * Merges users with the exact same coordinates.
	 * @param dataSet
	 * @returns - The list of merged names with coordinates.
	 */
	function mergeUsers(dataSet: [UserData, UserData][]): UserData[] {
		let currUserDate: UserData;
		const mergedUsers: UserData[] = [];
		for (let i = 0; i < dataSet.length; i++) {
			currUserDate = {
				user: dataSet[i][0].user + ' & \n' + dataSet[i][1].user,
				x: dataSet[i][0].x,
				y: dataSet[i][0].y
			};
			mergedUsers.push(currUserDate);
		}
		return mergedUsers;
	}

	/**
	 * Removes all entries that have the exact same coordinates.
	 * Returns a list without multiple entries with the same coordinates.
	 * @param dataSet
	 * @param sameCoords
	 */
	function removeIdenticalValues(dataSet: any[], sameCoords: [UserData, UserData][]) {
		dataSet.entries
	}
	/**
	 * Checks if multiple users have the same coordinates.
	 * Returns a list of tuples with the same coordinates.
	 * @param dataSet - Set of data that contains the names and their psychopathy scores (coordinates).
	 * @returns - Set of UserData tuples. Each set contains the names and coordinates of the entries with the same coordinates.
	 */
	function getIdenticalValues(dataSet: any[]): [UserData, UserData][] {
		const sameCoords: [UserData, UserData][] = [];
		for (let i = 0; i < dataSet.length; i++) {
			for (let j = i + 1; j < dataSet.length; j++) {
				if (
					comparator(dataSet[i].coords[0], dataSet[j].coords[0]) &&
					comparator(dataSet[i].coords[1], dataSet[j].coords[1])
				) {
					sameCoords.push([dataSet[i], dataSet[j]]);
				}
			}
		}
		return sameCoords;
	}

	/**
	 * Compares two elements and checks if they are equal.
	 * @param operand1 - First operand to compare with.
	 * @param operand2 - Second operand to compare to.
	 * @returns - Returns true if the elements are equal; false if not equal.
	 */
	function comparator(operand1: any, operand2: any): boolean {
		return operand1 == operand2 ? true : false;
	}
</script>

<h2 class="mt-4 px-5 text-2xl font-bold text-white">Voicecel Graph</h2>
<!-- <div class="text-white" id="plot"></div> -->
<canvas id="myChart" class="p-3"></canvas>
