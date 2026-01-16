export type Card = {
  id: string;
  title: string;
  description?: string | null;
  status: 'todo' | 'doing' | 'done';
};

