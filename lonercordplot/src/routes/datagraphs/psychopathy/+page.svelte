<script lang="ts">
	import type { PageData } from './$types';
	import type { UserData } from '../../../types/psychopathyTypes';
	import { onMount } from 'svelte';
	import psychopathy from '$lib/data/dataFile.json';
	import * as d3 from 'd3';
	import Chart from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	let { data }: { data: PageData } = $props();

	onMount(async () => {
		let preparedData = splitNamesFromData(psychopathy);
		Chart.register(ChartDataLabels);
		const dataChart = new Chart('myChart', {
			type: 'scatter',
			data: {
				datasets: [
					{
						label: '',
						data: preparedData,
						borderWidth: 1
					}
				]
			},
			options: {
				parsing: {
					xAxisKey: 'x',
					yAxisKey: 'y'
				},
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
						},
						title: {
							display: true,
							color: 'white',
							font: {
								size: 20
							},
							text: 'Primary Psychopathy' // X-axis title
						}
					},
					y: {
						type: 'linear',
						min: 1,
						max: 5,
						ticks: {
							color: 'white'
						},
						title: {
							display: true,
							color: 'white',
							font: {
								size: 20
							},
							text: 'Secondary Psychopathy' // X-axis title
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
	 * 3. y - Secondary Psychopathy
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
		return mergeUsers(psychopathyValues, getIdenticalValues(psychopathyValues));
	}

	/**
	 * Removes all duplicates after merging the entries with the same coordinates.
	 * @param mergedData - Data set with the merged entries.
	 * @param usersWithIdentCoords - Tuples of entries with the same coordinates.
	 * @returns - The data set without duplicates.
	 */
	function removeDuplicates(
		mergedData: UserData[],
		usersWithIdentCoords: [string, string][]
	): UserData[] {
		for (let i = 0, j = 0; i < mergedData.length && j < usersWithIdentCoords.length; i++) {
			if (mergedData[i].user == usersWithIdentCoords[j][1]) {
				mergedData.splice(i, 1);
				j++;
			}
		}
		return mergedData;
	}

	/**
	 * Makes a deep copy of the original data set.
	 * @param dataSet - Data set to copy
	 * @returns - Deep copy of input data set. Type: UserData.
	 */
	function parseData(dataSet: UserData[]): UserData[] {
		let currentElement: UserData;
		let elements: UserData[] = [];
		for (let i = 0; i < dataSet.length; i++) {
			currentElement = {
				user: structuredClone(dataSet[i].user),
				x: structuredClone(dataSet[i].x),
				y: structuredClone(dataSet[i].y)
			};
			elements.push(currentElement);
		}
		return elements;
	}

	/**
	 * Merges users with the exact same coordinates.
	 * @param dataSet
	 * @returns - The list of merged names with coordinates.
	 */
	function mergeUsers(dataSet: UserData[], usersWithIdentCoords: [string, string][]): UserData[] {
		let currUserDate: UserData;
		let list = parseData(dataSet);

		for (let i = 0; i < usersWithIdentCoords.length; i++) {
			for (let j = 0; j < list.length; j++) {
				if (list[j].user.includes(usersWithIdentCoords[i][0])) {
					list[j].user = usersWithIdentCoords[i][1] + ' &\n' + list[j].user;
				}
			}
		}
		return removeDuplicates(list, usersWithIdentCoords);
	}

	/**
	 * Checks if multiple users have the same coordinates.
	 * Returns a list of tuples with the same coordinates.
	 * @param dataSet - Set of data that contains the names and their psychopathy scores (coordinates).
	 * @returns - Set of UserData tuples. Each set contains the names and coordinates of the entries with the same coordinates.
	 */
	function getIdenticalValues(dataSet: UserData[]): [string, string][] {
		const usersWithSameCoords: [string, string][] = [];
		for (let i = 0; i < dataSet.length; i++) {
			for (let j = i + 1; j < dataSet.length; j++) {
				if (comparator(dataSet[i].x, dataSet[j].x) && comparator(dataSet[i].y, dataSet[j].y)) {
					usersWithSameCoords.push([dataSet[i].user, dataSet[j].user]);
				}
			}
		}
		return usersWithSameCoords;
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

<h2 class="mt-4 px-5 text-2xl font-bold text-white">Psychopathy Graph</h2>
<!-- <div class="text-white" id="plot"></div> -->
<canvas id="myChart" class="p-3"></canvas>
