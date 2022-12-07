import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import React from 'react';

const codeSnippet = `import type { Command } from 'disploy';

export default {
	name: 'ping',
	description: 'pong!',

	async run(interaction) {
		return void interaction.reply({
			content: 'ok',
		})
	}
} satisfies Command;`;

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();

	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col-reverse lg:flex-row-reverse">
				<CodeBlock className="language-ts">{codeSnippet}</CodeBlock>
				<div>
					<h1 className="text-5xl font-bold">Disploy</h1>
					<p className="py-6 max-w-md">{siteConfig.tagline}</p>
					<Link className="btn btn-primary" to="/docs/introduction">
						Get started!
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function Home(): JSX.Element {
	return (
		<Layout title="Disploy" description="Flexible router for building HTTP interaction-based Discord bots with ease.">
			<HomepageHeader />
		</Layout>
	);
}
