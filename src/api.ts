const GITHUB_URL =
  "https://api.github.com/repos/s-pyadyshev/sleeping-dogs-super-hacker";

export const getGithubStats = async () => {
  try {
    const response = await fetch(GITHUB_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    throw error;
  }
};
