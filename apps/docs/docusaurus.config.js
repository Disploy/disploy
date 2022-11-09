// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Disploy',
	tagline: 'Disploy is a whole ecosystem of tools to help you create your next Discord HTTP Interaction bot.',
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
						docId: 'Guide/getting-started/introduction',
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
				style: 'dark',
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
								to: '/docs/Guide/getting-started/introduction',
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
