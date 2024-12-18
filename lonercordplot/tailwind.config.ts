import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

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

	plugins: []
} satisfies Config;
