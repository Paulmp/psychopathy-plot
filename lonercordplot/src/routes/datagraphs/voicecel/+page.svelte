<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import voicecel from '$lib/data/voicecel.json';
	import { Colors, Chart } from 'chart.js/auto';

	let { data }: { data: PageData } = $props();

	function perpareData(voicecelData: any) {
		let label = [];
		let userHz = [];
		for (let i = 0; i < voicecelData.length; i++) {
			label[i] = voicecelData[i].name;
			userHz[i] = voicecelData[i].hz;
		}
		return { label, userHz };
	}

	onMount(async () => {
		const preparedDate = perpareData(voicecel);
		Chart.register(Colors);

		let currChart = new Chart('myChart', {
			type: 'bar',
			data: {
				labels: preparedDate.label,
				datasets: [
					{
						label: 'Users',
						data: preparedDate.userHz,
						borderWidth: 1,
					}
				],
			},
			options: {
				plugins: {
                    legend: {
                        labels: {
                            color: 'white' // Change the color of the legend text
                        }
                    }
                },
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							color: 'white'
						}
					},
					x: {
						beginAtZero: true,
						ticks: {
							color: 'white'
						}
					}
				}
			}
		});
	});
</script>

<h2 class="mt-4 px-5 text-2xl font-bold text-white">Voicecel Graph</h2>
<canvas id="myChart" class="p-3"></canvas>