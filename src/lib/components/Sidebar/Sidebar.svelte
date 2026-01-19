<script>
  import { appState } from '../../state.svelte.js';
  import { fade, fly } from 'svelte/transition';

  let menuOpen = $state(false);

  function go(sectionKey) {
    appState.navigateToSection(sectionKey);
    menuOpen = false;
  }
</script>

<aside class="sidebar">
  <nav class="sidebar-nav desktop-nav">
    {#each appState.content.sectionKeys as sectionKey}
      <button
        class="nav-item"
        class:active={appState.activeSection === sectionKey}
        onclick={() => appState.navigateToSection(sectionKey)}
        type="button"
      >
        <span class="nav-arrow" class:visible={appState.activeSection === sectionKey}></span>
        {appState.content.sectionLabels[sectionKey]}
      </button>
    {/each}
  </nav>

  <div class="mobile-nav">
    <button
      class="hamburger"
      class:open={menuOpen}
      type="button"
      onclick={() => (menuOpen = !menuOpen)}
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
        {#each appState.content.sectionKeys as sectionKey}
          <button
            class="dropdown-item"
            class:active={appState.activeSection === sectionKey}
            onclick={() => go(sectionKey)}
            type="button"
            role="menuitem"
          >
            {appState.content.sectionLabels[sectionKey]}
          </button>
        {/each}
      </div>

      <button
        class="backdrop"
        type="button"
        aria-label="Close menu"
        onclick={() => (menuOpen = false)}
      ></button>
    {/if}
  </div>
</aside>

<style>
  .sidebar {
    width: 200px;
    flex-shrink: 0;
    background: var(--term-bg-panel);
    border: 2px solid var(--term-color);
    border-right: none;
    display: flex;
    flex-direction: column;
    box-shadow:
      0 0 40px var(--term-color-dim),
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
    color: var(--term-color);
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-size: 17px;
    font-weight: 500;
    transition: all 0.2s;
    gap: 12px;
    text-shadow: var(--text-shadow-sm);
  }

  .nav-item:hover {
    background: rgba(0, 255, 0, 0.15);
    text-shadow: var(--text-shadow-md);
  }

  .nav-item.active {
    background: linear-gradient(90deg, rgba(0, 255, 0, 0.25) 0%, rgba(0, 255, 0, 0.05) 100%);
    text-shadow: 0 0 25px var(--term-color), 0 0 50px var(--term-color);
    border-right: 3px solid var(--term-color);
    margin-right: -2px;
  }

  .nav-arrow {
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 12px solid var(--term-color);
    opacity: 0;
    transition: all 0.2s;
    filter: drop-shadow(0 0 8px var(--term-color));
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
    background: var(--term-color);
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
    background: var(--term-bg-panel);
    border: 1px solid rgba(0, 255, 0, 0.35);
    box-shadow: 0 0 24px rgba(0, 255, 0, 0.22);
    padding: 8px;
    z-index: 50;
  }

  .dropdown-item {
    width: 100%;
    background: transparent;
    border: none;
    color: var(--term-color);
    text-align: left;
    padding: 10px 10px;
    cursor: pointer;
    font-size: 16px;
    text-shadow: var(--text-shadow-sm);
  }

  .dropdown-item:hover {
    background: rgba(0, 255, 0, 0.15);
    text-shadow: var(--text-shadow-md);
  }

  .dropdown-item.active {
    background: linear-gradient(90deg, rgba(0, 255, 0, 0.25) 0%, rgba(0, 255, 0, 0.05) 100%);
    text-shadow: 0 0 25px var(--term-color), 0 0 50px var(--term-color);
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
      border: 2px solid var(--term-color);
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
