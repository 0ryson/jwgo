/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/tailwind-datepicker-react/dist/**/*.js'
	],
	theme: {
		fontFamily: {
			base: ['Roboto'],
		},
		extend: {
			boxShadow: {
			'top': '0 -10px 15px -3px rgb(0 0 0 / 0.05)',
		}
	},
	},
	plugins: [
		function ({ addVariant }) {
			addVariant('child', '& > *');
			addVariant('child-hover', '& > *:hover');
		}
	],
	darkMode: 'class',
}
