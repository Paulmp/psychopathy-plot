<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import voicecel from '$lib/data/voicecel.json';
	import Chart from 'chart.js/auto';

	let { data }: { data: PageData } = $props();


	function perpareData(voicecelData: any) {
		let label = [];
		let userHz = [];
		for (let i = 0; i < voicecelData.length; i++) {
			label[i] = voicecelData[i].name;
			userHz[i] = voicecelData[i].hz;
		}
		console.log(label);
		return { label, userHz };
	}

	onMount(async () => {

		const myChart = document.getElementById('myChart');
		const preparedDate = perpareData(voicecel);

		new Chart(myChart, {
			type: 'bar',
			data: {
				labels: preparedDate.label,
				datasets: [
					{
						label: 'Users',
						data: preparedDate.userHz,
						borderWidth: 1
					}
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});
</script>

<div>
	<h2 class="mt-4 text-2xl font-bold text-white">Voicecel Graph</h2>
</div>
<canvas id="myChart"></canvas>
