<script lang="ts">
  import { theme } from '$lib/stores/theme';

  function toggleTheme() {
    theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }
</script>

<nav class="navbar">
  <div class="left">
    <span class="logo">MiniKanban</span>
  </div>

  <div class="center">
    <a href="/">Kanban</a>
    <a href="/creator">Creator</a>
  </div>

  <div class="right">
    <button on:click={toggleTheme}>🌙</button>
  </div>
</nav>
