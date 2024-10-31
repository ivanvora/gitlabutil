export const endpoints = {
  getReleases: (v: string) => `/api/v4/projects/${v}/releases?per_page=100`,
};
