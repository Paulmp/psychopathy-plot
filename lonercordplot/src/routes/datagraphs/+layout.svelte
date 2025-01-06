<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<section
	class="animate-slideUpAndFade flex w-4/6 flex-col rounded-xl border-4 border-black bg-zinc-800"
>
	{@render children()}
</section>
