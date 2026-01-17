<script>
  import { onMount } from 'svelte';
  import { loading, progress, t, terminalHidden } from './lib/stores/index.js';
  import { initFromHash, showTerminal } from './lib/utils/navigation.js';
  import { Background, Sidebar, Terminal } from './lib/components/index.js';

  let progressInterval;

  function handleShowTerminal() {
    showTerminal();
  }

  onMount(() => {
    progressInterval = setInterval(() => {
      progress.update((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(p + 3, 100);
      });
    }, 30);

    setTimeout(() => {
      loading.set(false);
      initFromHash($t.sectionKeys);
    }, 1200);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  });
</script>

<div class="app-container">
  <Background />

  {#if $terminalHidden}
    <div class="hidden-hint">
      <div class="hidden-hint-inner">
        <button class="show-btn" on:click={handleShowTerminal}>
          {$t.clickToShow}
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
    background: #000;
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
    color: #0f0;
    font-family: inherit;
    font-size: 16px;
    text-shadow: 0 0 20px #0f0, 0 0 40px #0f0;
    padding: 14px 28px;
    border: 2px solid #0f0;
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
    text-shadow: 0 0 30px #0f0, 0 0 60px #0f0;
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
