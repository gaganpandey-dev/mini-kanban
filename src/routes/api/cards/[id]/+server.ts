import { json, error } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ params, request }) => {
  const updates = await request.json();

  if (
    updates.status &&
    !['todo', 'doing', 'done'].includes(updates.status)
  ) {
    return json({ error: 'Invalid status' }, { status: 400 });
  }

  const allowed = {
    title: updates.title,
    description: updates.description,
    status: updates.status
  };

  try {
    const card = await prisma.card.update({
      where: { id: params.id },
      data: allowed
    });

    return json(card);
  } catch {
    throw error(404, 'Card not found');
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    await prisma.card.delete({
      where: { id: params.id }
    });

    return json({ success: true });
  } catch {
    throw error(404, 'Card not found');
  }
};
