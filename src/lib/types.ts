export interface Card {
  id: string;
  title: string;
  description?: string | null;
  status: 'todo' | 'doing' | 'done'; // ✅ lowercase
  createdAt: string;
  updatedAt: string;
}
