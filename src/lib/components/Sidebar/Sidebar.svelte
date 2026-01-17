<script>
  import { t, activeSection } from '../../stores/index.js';
  import { navigateToSection } from '../../utils/navigation.js';
  import { fade, fly } from 'svelte/transition';

  let menuOpen = false;

  function go(sectionKey) {
    navigateToSection(sectionKey);
    menuOpen = false;
  }
</script>

  <aside class="sidebar">
    <nav class="sidebar-nav desktop-nav">
      {#each $t.sectionKeys as sectionKey}
        <button
          class="nav-item"
          class:active={$activeSection === sectionKey}
          on:click={() => navigateToSection(sectionKey)}
          type="button"
        >
          <span class="nav-arrow" class:visible={$activeSection === sectionKey}></span>
          {$t.sectionLabels[sectionKey]}
        </button>
      {/each}
    </nav>

    <div class="mobile-nav">
      <button
        class="hamburger"
        class:open={menuOpen}
        type="button"
        on:click={() => (menuOpen = !menuOpen)}
        aria-label="Open menu"
        aria-expanded={menuOpen}
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      {#if menuOpen}
        <div
          class="dropdown"
          role="menu"
          in:fly={{ y: -8, duration: 160 }}
          out:fade={{ duration: 140 }}
        >
          {#each $t.sectionKeys as sectionKey}
            <button
              class="dropdown-item"
              class:active={$activeSection === sectionKey}
              on:click={() => go(sectionKey)}
              type="button"
              role="menuitem"
            >
              {$t.sectionLabels[sectionKey]}
            </button>
          {/each}
        </div>

        <button
          class="backdrop"
          type="button"
          aria-label="Close menu"
          on:click={() => (menuOpen = false)}
        ></button>
      {/if}
    </div>
  </aside>

<style>
  .sidebar {
    width: 200px;
    flex-shrink: 0;
    background: rgba(0, 5, 0, 0.98);
    border: 2px solid #0f0;
    border-right: none;
    display: flex;
    flex-direction: column;
    box-shadow:
      0 0 40px rgba(0, 255, 0, 0.4),
      inset 0 0 60px rgba(0, 255, 0, 0.03);
    position: relative;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    padding: 24px 0;
    height: 100%;
  }

  .nav-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 20px 24px;
    background: transparent;
    border: none;
    color: #0f0;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-size: 17px;
    font-weight: 500;
    transition: all 0.2s;
    gap: 12px;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  .nav-item:hover {
    background: rgba(0, 255, 0, 0.15);
    text-shadow: 0 0 20px #0f0, 0 0 40px #0f0;
  }

  .nav-item.active {
    background: linear-gradient(90deg, rgba(0, 255, 0, 0.25) 0%, rgba(0, 255, 0, 0.05) 100%);
    text-shadow: 0 0 25px #0f0, 0 0 50px #0f0;
    border-right: 3px solid #0f0;
    margin-right: -2px;
  }

  .nav-arrow {
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 12px solid #0f0;
    opacity: 0;
    transition: all 0.2s;
    filter: drop-shadow(0 0 8px #0f0);
  }

  .nav-arrow.visible {
    opacity: 1;
  }

  .mobile-nav {
    display: none;
    padding: 12px;
  }

  .hamburger {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 10px;
    cursor: pointer;

    display: inline-flex;
    flex-direction: column;
    gap: 6px;
  }

  .hamburger .bar {
    width: 26px;
    height: 2px;
    background: #0f0;
    box-shadow: 0 0 12px rgba(0, 255, 0, 0.35);
    transition: transform 180ms ease, opacity 140ms ease;
    transform-origin: center;
  }

  .hamburger.open .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger.open .bar:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .dropdown {
    position: absolute;
    top: 58px;
    left: 12px;
    width: 220px;
    background: rgba(0, 8, 0, 0.98);
    border: 1px solid rgba(0, 255, 0, 0.35);
    box-shadow: 0 0 24px rgba(0, 255, 0, 0.22);
    padding: 8px;
    z-index: 50;
  }

  .dropdown-item {
    width: 100%;
    background: transparent;
    border: none;
    color: #0f0;
    text-align: left;
    padding: 10px 10px;
    cursor: pointer;
    font-size: 16px;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  .dropdown-item:hover {
    background: rgba(0, 255, 0, 0.15);
    text-shadow: 0 0 20px #0f0, 0 0 40px #0f0;
  }

  .dropdown-item.active {
    background: linear-gradient(90deg, rgba(0, 255, 0, 0.25) 0%, rgba(0, 255, 0, 0.05) 100%);
    text-shadow: 0 0 25px #0f0, 0 0 50px #0f0;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background: transparent;
    border: none;
    z-index: 40;
  }

  @media (max-width: 768px) {
    .sidebar {
      width: 100%;
      border: 2px solid #0f0;
      border-bottom: none;
    }

    .desktop-nav {
      display: none;
    }

    .mobile-nav {
      display: block;
    }
  }
</style>
