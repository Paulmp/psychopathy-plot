import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			keyframes: {
				slideUpAndFade: {
					'0%': {transform: 'translateY(100%)', opacity: '0'},
					'100%': {transform: 'translateY(0%)', opacity: '1'},
				},
			},
			animation: {
				slideUpAndFade: 'slideUpAndFade 1s ease-out forwards',
			},
		},
	},

	plugins: [flowbitePlugin]
} satisfies Config;
