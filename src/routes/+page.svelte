<script lang="ts">
  import { onMount } from 'svelte';
  import { cardsStore } from '$lib/stores/cards';
  import type { Card } from '$lib/types';
  import { get } from 'svelte/store';
  import { getCards, saveCards } from '$lib/utils/storage';

  let newTitle = '';
  let newDesc = '';
  let editingCard: Card | null = null;
  let editTitle = '';
  let editDesc = '';

  const STATUSES: Card['status'][] = ['todo', 'doing', 'done'];

  onMount(() => {
    cardsStore.set(getCards());
  });

  function createCard() {
    if (!newTitle.trim()) return;

    const cards = getCards();

    const card: Card = {
      id: crypto.randomUUID(),
      title: newTitle,
      description: newDesc || null,
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [card, ...cards];
    saveCards(updated);
    cardsStore.set(updated);

    newTitle = '';
    newDesc = '';
  }

  function updateCard(card: Card, updates: Partial<Card>) {
    const updated = getCards().map(c =>
      c.id === card.id ? { ...c, ...updates } : c
    );

    saveCards(updated);
    cardsStore.set(updated);
    editingCard = null;
  }

  function deleteCard(id: string) {
    const updated = getCards().filter(c => c.id !== id);
    saveCards(updated);
    cardsStore.set(updated);
  }

  function handleDragStart(e: DragEvent, card: Card) {
    e.dataTransfer?.setData('text/plain', card.id);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: DragEvent, status: Card['status']) {
    const cardId = e.dataTransfer?.getData('text/plain');
    const card = get(cardsStore).find(c => c.id === cardId);
    if (card && card.status !== status) {
      updateCard(card, { status });
    }
  }
</script>

<div class="container">
  <div class="new-card">
    <input bind:value={newTitle} placeholder="Card title..." />
    <input bind:value={newDesc} placeholder="Description (optional)" />
    <button on:click={createCard} disabled={!newTitle.trim()}>
      Add Card
    </button>
  </div>

  <div class="kanban">
    {#each STATUSES as status}
    <div
  class="column {status}"
  role="list"
  aria-label={`${status} column`}
  on:dragover|preventDefault={handleDragOver}
  on:drop={(e) => handleDrop(e, status)}
>
  <h2>{status.toUpperCase()}</h2>

  {#each $cardsStore.filter(c => c.status === status) as card (card.id)}
    <div
      class="card"
      role="listitem"
      draggable="true"
      aria-grabbed="false"
      on:dragstart={(e) => handleDragStart(e, card)}
    >
      {#if editingCard?.id === card.id}
        <input bind:value={editTitle} />
        <textarea bind:value={editDesc}></textarea>

        <button
          on:click={() =>
            updateCard(card, {
              title: editTitle,
              description: editDesc || null
            })
          }
        >
          Save
        </button>

        <button on:click={() => (editingCard = null)}>
          Cancel
        </button>
      {:else}
        <h3>{card.title}</h3>

        {#if card.description}
          <p>{card.description}</p>
        {/if}

        <button
          on:click={() => {
            editingCard = card;
            editTitle = card.title;
            editDesc = card.description || '';
          }}
        >
          Edit
        </button>

        <button on:click={() => deleteCard(card.id)}>
          Delete
        </button>
      {/if}
    </div>
  {/each}
</div>

    {/each}
  </div>
</div>
