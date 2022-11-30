module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
	},
	darkMode: ['class', '[data-theme="dark"]'],
	plugins: [require('daisyui')],
	corePlugins: {
		preflight: false,
	},
	daisyui: {
		themes: [
			{
				dark: {
					primary: '#5865F2',
					secondary: '#748ad8',
					accent: '#eb459e',
					neutral: '#5865F2',
					'base-100': '#23272A',
					info: '#5865F2',
					success: '#4b5bab',
					warning: '#f2a65e',
					error: '#b0305c',
				},
				light: {
					primary: '#5865F2',
					secondary: '#748ad8',
					accent: '#eb459e',
					neutral: '#5865F2',
					'base-100': '#fff',
					info: '#5865F2',
					success: '#4b5bab',
					warning: '#f2a65e',
					error: '#b0305c',
				},
			},
		],
	},
};
