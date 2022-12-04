// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Disploy',
	tagline: 'Flexible router for building HTTP interaction-based Discord bots with ease.',
	url: 'https://disploy.dev',
	baseUrl: '/',
	onBrokenLinks: 'warn',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'disploy', // Usually your GitHub org/user name.
	projectName: 'disploy', // Usually your repo name.

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/disploy/Disploy/tree/main/apps/docs/',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	plugins: [
		async function tailwind(context, options) {
			return {
				name: 'docusaurus-tailwindcss',
				configurePostCss(postcssOptions) {
					postcssOptions.plugins.push(require('tailwindcss'));
					postcssOptions.plugins.push(require('autoprefixer'));
					return postcssOptions;
				},
			};
		},
		[
			'docusaurus-plugin-typedoc',

			// Plugin / TypeDoc options
			{
				id: 'disploy',
				entryPoints: ['../../packages/disploy/src/index.ts'],
				tsconfig: '../../packages/disploy/tsconfig.json',
				out: 'Documentation/disploy',
				sidebar: {
					categoryLabel: 'disploy',
					position: 1,
					fullNames: true,
				},
			},
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'Disploy',
				logo: {
					alt: 'Disploy logo',
					src: 'img/logo.svg',
				},
				items: [
					{
						type: 'doc',
						docId: 'introduction',
						position: 'left',
						label: 'Guides',
					},
					{
						href: 'https://github.com/disploy/Disploy',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				links: [
					{
						title: 'Community',
						items: [
							{
								label: 'Discord',
								href: 'https://discord.gg/E3z8MDnTWn',
							},
						],
					},
					{
						title: 'More',
						items: [
							{
								label: 'Guides',
								to: '/docs/introduction',
							},
							{
								label: 'GitHub',
								href: 'https://github.com/disploy/Disploy',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Disploy. Built with Docusaurus.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
