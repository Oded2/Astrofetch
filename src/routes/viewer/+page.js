export function load({ url }) {
  let item = {};
  url.searchParams.forEach((value, key) => (item[key] = value));
  return { item };
}
