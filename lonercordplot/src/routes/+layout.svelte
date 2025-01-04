<script lang="ts">
	import '../app.css';
	import {
		Footer,
		FooterCopyright,
		FooterBrand,
		FooterLinkGroup,
		FooterLink
	} from 'flowbite-svelte';

	let { children } = $props();
</script>

<div class="flex min-h-svh w-full flex-col bg-inherit">
	<header class="flex items-center space-x-3 bg-purple-900/[0.6] p-2 text-white">
		<img src="/images/LonerBox.png" alt="Lonerbox" class="w-20" />
		<h1 class="font-mono text-3xl font-bold">Lonercord's Datagraphs</h1>
	</header>
	<div
		class="animate-slideUpAndFade flex"
	>
		<div class="flex h-full w-full items-center justify-center" style="height: 100%;">
			<section
				class="flex w-9/12 flex-col items-center justify-center rounded-xl border-4 border-black bg-zinc-800 p-0"
			>
				{@render children()}
			</section>
		</div>
	</div>

	<Footer
		class="absolute bottom-0 start-0 z-20 w-full border-t bg-slate-900/95 p-4 shadow md:flex md:items-center md:justify-between md:p-6 dark:border-gray-600 dark:bg-gray-800"
	>
		<FooterCopyright href="/" by="Flowbite™" year={2022} />
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
		>
			<FooterLink href="/">About</FooterLink>
			<FooterLink href="/">Privacy Policy</FooterLink>
			<FooterLink href="/">Licensing</FooterLink>
			<FooterLink href="/">Contact</FooterLink>
		</FooterLinkGroup>
	</Footer>
</div>
