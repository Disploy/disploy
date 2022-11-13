// We will use this script to generate a changelog for v1.0.0.
// From then on, we will use git-cliff to generate changelogs.
import { execSync } from 'node:child_process';

const commits = [];
const gitLog = execSync('git log --pretty=format:"%h|%an|%s"').toString().trim().split('\n');

for (const commit of gitLog) {
	try {
		const [hash, author, message] = commit.split('|');
		const type = message.split('(')[0];
		const scope = message.split('(')[1].split(')')[0];
		const commitMessage = message.split(': ')[1];
		let pullRequest = null;
		try {
			pullRequest = commitMessage.split(' (#')[1].split(')')[0];
		} catch (error) {}

		if (type === 'chore' || type === 'docs') {
			continue;
		}

		if (scope === 'disploy' || scope === 'framework' || scope === '*') {
			commits.push({
				type,
				scope,
				message: pullRequest ? commitMessage.split(' (#')[0] : commitMessage,
				pullRequest,
				hash,
				author,
			});
		}
	} catch {
		console.log(`Error parsing commit: ${commit}`);
	}
}

const types = new Set(commits.map((commit) => commit.type));

console.log('## Changelog');

for (const type of types) {
	console.log(`### ${type}`);
	for (const commit of commits) {
		if (commit.type === type) {
			console.log(
				`- [${commit.message}](https://github.com/Disploy/disploy/commit/${commit.hash}) by ${commit.author} ${
					commit.pullRequest ? `(#${commit.pullRequest})` : ''
				}`,
			);
		}
	}
	console.log('');
}
