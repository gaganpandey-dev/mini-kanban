import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/cards');
  const cards = await res.json();

  return { cards };
};
