import type { Card } from '$lib/types';

const KEY = 'kanban-cards';

export function getCards(): Card[] {
  if (typeof localStorage === 'undefined') return [];
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function saveCards(cards: Card[]) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(cards));
}