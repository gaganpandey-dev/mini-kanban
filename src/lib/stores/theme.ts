import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';


export const theme = writable<'light' | 'dark'>('light');
