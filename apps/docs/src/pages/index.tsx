import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';

import styles from './index.module.css';

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">{siteConfig.title}</h1>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<div className={styles.buttons}>
					<Link className="button button--secondary button--lg" to="/docs/Guide/getting-started/introduction">
						Get started!
					</Link>
				</div>
			</div>
		</header>
	);
}

export default function Home(): JSX.Element {
	return (
		<Layout
			title="Disploy"
			description="Next.js for Discord applications - The ecosystem to help you create your Discord bot. Disploy is a framework for building HTTP Discord bots with ease. It's designed to make it easy to build, test and deploy Discord bots."
		>
			<HomepageHeader />
			{/* <main>
        <HomepageFeatures />
      </main> */}
		</Layout>
	);
}
