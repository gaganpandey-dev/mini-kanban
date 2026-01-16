<script lang="ts">
  // no JS needed (static informational page)
</script>

<section class="about-project">
  <h1>Mini Kanban Board – Project Overview</h1>

  <p class="intro">
    This project is a lightweight Kanban-style task management application
    designed to demonstrate clean frontend architecture, state management,
    and user-centric design.
  </p>

  <h2>🚀 Core Functionality</h2>
  <ul>
    <li>Create, edit, and delete task cards</li>
    <li>Drag & drop cards across workflow stages</li>
    <li>Per-user isolated data using browser storage</li>
    <li>Responsive and accessible UI</li>
  </ul>

  <h2>🛠️ Tech Stack Used</h2>
  <ul>
    <li><strong>SvelteKit</strong> – frontend framework & routing</li>
    <li><strong>TypeScript</strong> – type safety and maintainability</li>
    <li><strong>Svelte Stores</strong> – centralized state management</li>
    <li><strong>LocalStorage</strong> – per-user persistence</li>
    <li><strong>CSS (custom)</strong> – responsive & modern UI</li>
  </ul>

  <h2>📐 Engineering Decisions</h2>
  <p>
    Instead of a shared backend database, browser-based storage is used
    to ensure each user has isolated data without authentication.
    This makes the app ideal for static deployment platforms like Vercel.
  </p>

  <h2>🔮 Future Scope</h2>
  <ul>
    <li>User authentication & cloud database integration</li>
    <li>Team-based boards & collaboration</li>
    <li>Search, filters, and analytics</li>
    <li>Offline-first IndexedDB support</li>
  </ul>

  <a href="/creator" class="back-btn">← Back to Creator</a>
</section>

<style>
  .about-project {
    max-width: 900px;
    margin: auto;
    padding: 4rem 1.5rem;
    color: #344972;
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  h2 {
    margin-top: 2.5rem;
    margin-bottom: 0.75rem;
    color: #7180c8;
  }

  p, li {
    line-height: 1.7;
    color: rgb(51, 85, 134);
  }

  ul {
    padding-left: 1.2rem;
  }

  .intro {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  .back-btn {
    display: inline-block;
    margin-top: 3rem;
    color: #93c5fd;
    text-decoration: none;
    font-weight: 600;
  }

  .back-btn:hover {
    text-decoration: underline;
  }
</style>
