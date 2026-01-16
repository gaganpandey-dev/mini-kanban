import type { Card } from '$lib/types';

const KEY = 'kanban_cards';

export function getCards(): Card[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function saveCards(cards: Card[]) {
  localStorage.setItem(KEY, JSON.stringify(cards));
}
