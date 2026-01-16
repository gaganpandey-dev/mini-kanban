import { json } from '@sveltejs/kit';
import { prisma } from '$lib/db';

export async function GET() {
  const cards = await prisma.card.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return json(cards);
}

export async function POST({ request }) {
  const body = await request.json();

  const card = await prisma.card.create({
    data: {
      title: body.title,
      description: body.description ?? null,
      status: 'todo'
    }
  });

  return json(card);
}
