import type { GithubRepoStats } from "./types";

const GITHUB_URL =
  "https://api.github.com/repos/s-pyadyshev/sleeping-dogs-super-hacker";

export const getGithubStats = async (): Promise<GithubRepoStats> => {
  try {
    const response = await fetch(GITHUB_URL);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    throw error;
  }
};
