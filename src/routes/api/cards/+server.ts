import { json } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const cards = await prisma.card.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return json(cards);
};

export const POST: RequestHandler = async ({ request }) => {
  const { title, description } = await request.json();

  if (!title) {
    return json({ error: 'Title required' }, { status: 400 });
  }

  const card = await prisma.card.create({
    data: {
      title,
      description,
      status: 'todo'
    }
  });

  return json(card, { status: 201 });
};

