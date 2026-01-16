export type CardStatus = 'todo' | 'doing' | 'done';

export interface Card {
  id: string;
  title: string;
  description?: string | null;
  status: CardStatus;
  createdAt: string;
  updatedAt: string;
}
