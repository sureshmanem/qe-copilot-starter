/** All environment-specific values. Secrets come from the pipeline or a local .env, never from code. */
export const config = {
  baseUrl: process.env.BASE_URL ?? 'http://localhost:3000',
  /** Must end with a slash so relative client paths resolve under it. */
  apiBaseUrl: withTrailingSlash(process.env.API_BASE_URL ?? 'http://localhost:3000/api/'),
  apiToken: process.env.API_TOKEN ?? '',
  user: {
    username: process.env.TEST_USER ?? '',
    password: process.env.TEST_PASSWORD ?? '',
  },
  seed: Number(process.env.TEST_SEED ?? 20261013),
  authFile: '.auth/user.json',
};

function withTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}
