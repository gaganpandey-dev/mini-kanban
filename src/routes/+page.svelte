<script lang="ts">
  import { onMount } from 'svelte';
  import { cardsStore } from '$lib/stores/cards';
  import type { Card } from '$lib/types';
  import { get } from 'svelte/store';
  import { getCards, saveCards } from '$lib/utils/storage';

  const STATUSES: Card['status'][] = ['todo', 'doing', 'done'];

  let newTitle = '';
  let newDesc = '';
  let editingCard: Card | null = null;
  let editTitle = '';
  let editDesc = '';

  onMount(() => {
    cardsStore.set(getCards());
  });

  function createCard() {
    if (!newTitle.trim()) return;

    const card: Card = {
      id: crypto.randomUUID(),
      title: newTitle,
      description: newDesc || null,
      status: 'todo'
    };

    const updated = [...get(cardsStore), card];
    cardsStore.set(updated);
    saveCards(updated);

    newTitle = '';
    newDesc = '';
  }

  function updateCard(card: Card, updates: Partial<Card>) {
    const updated = get(cardsStore).map((c: Card) =>
      c.id === card.id ? { ...c, ...updates } : c
    );
    cardsStore.set(updated);
    saveCards(updated);
    editingCard = null;
  }

  function deleteCard(id: string) {
    const updated = get(cardsStore).filter((c: Card) => c.id !== id);
    cardsStore.set(updated);
    saveCards(updated);
  }

  function handleDragStart(e: DragEvent, card: Card) {
    e.dataTransfer?.setData('text/plain', card.id);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: DragEvent, status: Card['status']) {
    const cardId = e.dataTransfer?.getData('text/plain');
    if (!cardId) return;

    const card = get(cardsStore).find((c: Card) => c.id === cardId);
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
