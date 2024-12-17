import emojiRegex from 'emoji-regex';
import { log } from 'next-axiom';

import type { GitHubRepos, Project } from '~/types';

/**
 * Fetch Projects
 *
 * Make a GET request to the GitHub API to gather all repositories
 * under the `Givaa` username.
 */
export async function fetchProjects(): Promise<Array<Project> | null> {
	try {
		// Fetch the repositories from the GitHub API
		const response = await fetch('https://api.github.com/users/Givaa/repos', {
			headers: {
				...(process.env.GITHUB_PAT && {
					authorization: `token ${process.env.GITHUB_PAT}`,
				}),
			},
		});

		// Handle non-200 responses
		if (!response.ok) {
			const errorData = await response.json();
			console.error({ error: errorData });
			log.error('Failed to fetch projects', { error: errorData });
			return null;
		}

		const repositories = (await response.json()) as GitHubRepos;

		// Map the repositories to the Project type
		const projects: Array<Project> = repositories.map((repo) => {
			// Strip the emoji from the repo description
			const description = repo.description
				? repo.description.replace(emojiRegex(), '').trim()
				: '';

			// Extract the emoji icon from the description
			const iconMatch = repo.description?.match(emojiRegex());
			const icon = iconMatch ? iconMatch[0] : undefined;

			return {
				name: repo.name,
				description,
				icon,
				homepage: repo.homepage || undefined,
				url: repo.html_url.toLowerCase(),
				template: false,
			} as Project;
		});

		return projects;
	} catch (error) {
		// General error handling
		console.error('Error fetching projects:', error);
		log.error('Unexpected error while fetching projects', { error });
		return null;
	}
}
