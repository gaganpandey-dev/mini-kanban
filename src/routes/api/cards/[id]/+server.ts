import { json } from '@sveltejs/kit';
import { prisma } from '$lib/db';

export async function PATCH({ params, request }) {
  const updates = await request.json();

  if (
    updates.status &&
    !['todo', 'doing', 'done'].includes(updates.status)
  ) {
    return json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const card = await prisma.card.update({
      where: { id: params.id },
      data: updates
    });

    return json(card);
  } catch {
    return json({ error: 'Card not found' }, { status: 404 });
  }
}

export async function DELETE({ params }) {
  await prisma.card.delete({
    where: { id: params.id }
  });

  return json({ success: true });
}
