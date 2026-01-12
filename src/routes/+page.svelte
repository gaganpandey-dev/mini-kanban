<script lang="ts">
  import { onMount } from 'svelte';
  import { cardsStore } from '$lib/stores/cards';
  import type { Card } from '$lib/types';
  import { get } from 'svelte/store';

  let newTitle = '';
  let newDesc = '';

  let editingCard: Card | null = null;
  let editTitle = '';
  let editDesc = '';

  let loading = true;
  let errorMsg = '';

  const STATUSES: Card['status'][] = ['todo', 'doing', 'done'];

  onMount(loadCards);

  async function loadCards() {
    loading = true;
    errorMsg = '';
    try {
      const res = await fetch('/api/cards');
      if (!res.ok) throw new Error();
      cardsStore.set(await res.json());
    } catch {
      errorMsg = 'Failed to load cards';
    } finally {
      loading = false;
    }
  }

  async function createCard() {
    if (!newTitle.trim()) return;

    await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle,
        description: newDesc || null
      })
    });

    newTitle = '';
    newDesc = '';
    await loadCards();
  }

  async function updateCard(card: Card, updates: Partial<Card>) {
    await fetch(`/api/cards/${card.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    editingCard = null;
    await loadCards();
  }

  async function deleteCard(id: string) {
    await fetch(`/api/cards/${id}`, { method: 'DELETE' });
    await loadCards();
  }

  function handleDragStart(e: DragEvent, card: Card) {
    e.dataTransfer?.setData('text/plain', card.id);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  async function handleDrop(e: DragEvent, status: Card['status']) {
    const cardId = e.dataTransfer?.getData('text/plain');
    const card = get(cardsStore).find(c => c.id === cardId);
    if (card && card.status !== status) {
      await updateCard(card, { status });
    }
  }
</script>

<svelte:head>
  <title>Mini Kanban</title>
</svelte:head>

<div class="container">
  <div class="new-card">
    <input bind:value={newTitle} placeholder="Card title..." />
    <input bind:value={newDesc} placeholder="Description (optional)" />
    <button on:click={createCard} disabled={!newTitle.trim()}>
      Add Card
    </button>
  </div>

  {#if errorMsg}
    <p class="error">{errorMsg}</p>
  {/if}

  {#if loading}
    <p class="loading">Loading…</p>
  {:else}
    <div class="kanban">
      {#each STATUSES as status}
        <div
          class={`column ${status}`}
          on:dragover={handleDragOver}
          on:drop={(e) => handleDrop(e, status)}
        >
          <h2>{status.toUpperCase()}</h2>

          {#each $cardsStore.filter(c => c.status === status) as card (card.id)}
            <div
              class="card"
              draggable="true"
              on:dragstart={(e) => handleDragStart(e, card)}
            >
              {#if editingCard?.id === card.id}
                <input bind:value={editTitle} />
                <textarea bind:value={editDesc}></textarea>

                <button
                  on:click={() =>
                    updateCard(card, {
                      title: editTitle,
                      description: editDesc || null,
                      status
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
  {/if}
</div>

<style>
  .container {
    max-width: 1400px;
    margin: auto;
  }

  .new-card {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .kanban {
    display: flex;
    gap: 20px;
  }

  .column {
    flex: 1;
    padding: 16px;
    border-radius: 12px;
    min-height: 300px;
    background: #f9fafb;
  }

  .column.todo { background: #f1f5f9; }
  .column.doing { background: #fff7ed; }
  .column.done { background: #ecfdf5; }

  .card {
    background: white;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 8px;
    cursor: grab;
  }

  .error { color: red; }
  .loading { color: gray; }
</style>
