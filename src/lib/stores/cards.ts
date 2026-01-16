import { writable } from 'svelte/store';
import type { Card } from '$lib/types';

export const cardsStore = writable<Card[]>([]);
