<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';

  // SSR safe: browser code only inside onMount
  onMount(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;

    if (saved) {
      theme.set(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    }
  });

  function toggleTheme() {
    theme.update((t) => {
      const next = t === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  }
</script>

<nav class="navbar">
  <div class="logo">MiniKanban</div>

  <div class="actions">
    <a href="/">Board</a>
    <a href="/creator">Creator</a>

    <button on:click={toggleTheme} class="theme-btn">
      Toggle Theme
    </button>
  </div>
</nav>

<slot />

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 24px;
    background: var(--nav-bg);
    color: var(--text);
    border-radius: 12px;
    margin-bottom: 20px;
  }

  .actions {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
  }

  .theme-btn {
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }
</style>
