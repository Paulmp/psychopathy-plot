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

<div class="flex h-screen flex-col bg-inherit">
	<header class="flex items-center space-x-3 bg-purple-900/[0.6] p-2 text-white">
		<img src="/images/LonerBox.png" alt="Lonerbox" class="w-20" />
		<h1 class="font-mono text-3xl font-bold">Lonercord's Datagraphs</h1>
		<div class="flex flex-row justify-items-center space-x-1 py-3">
			<div class="rounded-md bg-purple-700 px-3">
				<a href="/">Home</a>
			</div>
			<div class="rounded-md bg-purple-700 px-3">
				<a href="/datagraphs/psychopathy">Psychopathy</a>
			</div>
			<div class="rounded-md bg-purple-700 px-3">
				<a href="/datagraphs/voicecel">Voicecel</a>
			</div>
		</div>
	</header>
	<div class="flex flex-grow items-center justify-center">
		{@render children()}
	</div>
	<Footer
		class="absolute bottom-0 start-0 w-full border-t bg-slate-900/95 p-4 shadow md:flex md:items-center md:justify-between md:p-6 dark:border-gray-600 dark:bg-gray-800"
	>
		<FooterCopyright href="https://lonerbox.gg/" by="Bonerbox™" year={2025} />
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
