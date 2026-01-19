<script>
  import { onMount } from 'svelte';
  import { appState } from './lib/state.svelte.js';
  import { Background, Sidebar, Terminal } from './lib/components/index.js';

  let progressInterval;

  onMount(() => {
    progressInterval = setInterval(() => {
      if (appState.progress >= 100) {
        clearInterval(progressInterval);
        appState.progress = 100;
        return;
      }
      appState.progress = Math.min(appState.progress + 3, 100);
    }, 30);

    setTimeout(() => {
      appState.loading = false;
      appState.initFromHash(appState.content.sectionKeys);
    }, 1200);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  });
</script>

<div class="app-container">
  <Background />

  {#if appState.terminalHidden}
    <div class="hidden-hint">
      <div class="hidden-hint-inner">
        <button class="show-btn" onclick={() => appState.showTerminal()}>
          {appState.content.clickToShow}
        </button>
      </div>
    </div>
  {:else}
    <div class="main-layout">
      <div class="terminal-with-sidebar">
        <Sidebar />
        <Terminal />
      </div>
    </div>
  {/if}

  <div class="scanlines"></div>
  <div class="vignette"></div>
</div>

<style>
  .app-container {
    position: relative;
    min-height: 100dvh;
    background: var(--term-bg);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .main-layout {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    z-index: 10;
  }

  .terminal-with-sidebar {
    display: flex;
    width: 100%;
    max-width: 1200px;
    height: 85vh;
  }

  .hidden-hint {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 40px;
    z-index: 100;
    display: flex;
    justify-content: center;
    padding: 0 16px;
  }

  .hidden-hint-inner {
    animation: fadeInUp 0.5s ease-out;
    will-change: transform, opacity;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .show-btn {
    color: var(--term-color);
    font-family: inherit;
    font-size: 16px;
    text-shadow: var(--text-shadow-md);
    padding: 14px 28px;
    border: 2px solid var(--term-color);
    background: rgba(0, 20, 0, 0.9);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.4), inset 0 0 20px rgba(0, 255, 0, 0.1);
    width: 100%;
    max-width: 420px;
    text-align: center;
  }

  .show-btn:hover {
    background: rgba(0, 255, 0, 0.2);
    box-shadow: 0 0 30px rgba(0, 255, 0, 0.6), inset 0 0 30px rgba(0, 255, 0, 0.2);
    text-shadow: 0 0 30px var(--term-color), 0 0 60px var(--term-color);
  }

  .scanlines {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 50;
    opacity: 0.1;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 0, 0.15) 2px,
      rgba(0, 255, 0, 0.15) 4px
    );
  }

  .vignette {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 40;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }

  @media (max-width: 768px) {
    .main-layout {
      padding: 1rem;
    }

    .terminal-with-sidebar {
      flex-direction: column;
      height: auto;
      min-height: 0;
    }
  }

  @media (max-width: 480px) {
    .show-btn {
      max-width: 320px;
    }
  }
</style>
