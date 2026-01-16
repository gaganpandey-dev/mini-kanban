<script lang="ts">
  import './creator.css';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let isHovered = false;

  onMount(() => {
    if (!browser) return;
  });
</script>

<section class="portfolio-hero">
  <!-- Floating background particles -->
  <div class="floating-particles">
    <span class="particle" style="--x:10%;--y:20%"></span>
    <span class="particle" style="--x:80%;--y:70%"></span>
    <span class="particle" style="--x:20%;--y:90%"></span>
    <span class="particle" style="--x:90%;--y:30%"></span>
  </div>

  <div class="hero-content">
    <div
      class={`profile-card ${isHovered ? 'hovered' : ''}`}
      role="region"
      on:mouseenter={() => (isHovered = true)}
      on:mouseleave={() => (isHovered = false)}
    >
      <!-- Profile Image -->
      <div class="profile-image">
        <img src="/creator.jpeg" alt="Gagan Millionaire" />
        <div class="badge">
          <span class="dot"></span>
          Available for Hire
        </div>
      </div>

      <!-- Name & Role -->
      <h1 class="name">
        Gagan <span>Millionaire</span>
      </h1>

      <h2 class="title">Full Stack Developer</h2>

      <!-- About -->
      <p class="about">
        Passionate Full-Stack Developer focused on building clean,
        scalable and high-impact web applications.
        <br /><br />
        This Kanban application reflects my engineering mindset —
        simplicity, performance, and real-world usability.
      </p>

      <!-- Stats -->
      <div class="stats">
        <!-- GitHub -->
        <div>
          <strong>
            <a
              href="https://github.com/gaganpandey-dev"
              target="_blank"
              rel="noopener noreferrer"
              class="stat-link"
            >
              Projects
            </a>
          </strong>
          <span>GitHub</span>
        </div>

        <!-- Live Project -->
        <div>
          <strong>
            <a
              href="https://us-academy-website-vercel.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              class="stat-link"
            >
              Live Project
            </a>
          </strong>
          <span>US Academy</span>
        </div>

        <!-- ✅ RESPONSE / EMAIL (FULLY CLICKABLE) -->
        <div>
          <strong>
            <a
              href="mailto:pandeygagan7398@gmail.com?subject=Contact%20from%20Kanban%20App&body=Hi%20Gagan,%0A%0AI%20visited%20your%20Kanban%20application%20and%20would%20like%20to%20connect.%0A%0ARegards,"
              class="stat-link"
            >
              Response
            </a>
          </strong>
          <span>Email Me</span>
        </div>
      </div>

      <!-- Highlighted Live Project -->
    <a href="/about-project" class="project-card" aria-label="About this project">
  📘 About This Project
</a>


      <!-- Skills -->
      <div class="skills">
        <span>Frontend</span>
        <span>Backend</span>
        <span>Databases</span>
        <span>DevOps</span>
        <span>TypeScript</span>
      </div>

      <!-- CTA Buttons -->
      <div class="actions">
        <a href="/" class="primary">Go to Kanban</a>

        <a
          href="https://linkedin.com/in/gagan-pandey-84296722a"
          target="_blank"
          rel="noopener noreferrer"
          class="secondary"
        >
          Contact Me
        </a>
      </div>

      <!-- Footer -->
      <footer>
        Designed & Developed by <strong>Gagan Millionaire</strong>
      </footer>
    </div>
  </div>
</section>
