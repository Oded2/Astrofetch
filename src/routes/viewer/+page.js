export function load({ url }) {
  const item = {};
  url.searchParams.forEach((value, key) => (item[key] = value));
  return { item };
}
