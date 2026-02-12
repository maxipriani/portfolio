<script>
  import { appState } from '../../state.svelte.js';
  import TerminalHeader from './TerminalHeader.svelte';
  import TerminalOutput from './TerminalOutput.svelte';
  import TerminalInput from './TerminalInput.svelte';
  import Loading from '../Loading/Loading.svelte';
</script>

<div class="terminal-wrapper">
  <div class="terminal-container">
    <div class="terminal-glow"></div>
    <TerminalHeader />
    
    <div class="terminal-body">
      {#if appState.loading}
        <div class="terminal-loading">
          <Loading progress={appState.progress} />
        </div>
      {:else}
        <TerminalOutput />
      {/if}
    </div>

    {#if !appState.loading}
      <TerminalInput />
    {/if}
  </div>
</div>

<style>
  .terminal-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    position: relative;
  }

  .terminal-container {
    background: var(--term-bg-panel);
    border: 2px solid var(--term-color);
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    position: relative;
    box-shadow: 
      0 0 30px var(--term-color-dim),
      0 0 60px rgba(0, 255, 0, 0.2),
      inset 0 0 80px rgba(0, 255, 0, 0.05);
  }

  .terminal-glow {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid var(--term-color);
    pointer-events: none;
    filter: blur(4px);
    opacity: 0.6;
  }

  .terminal-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  .terminal-body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(180deg, rgba(0, 255, 0, 0.03) 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
  }

  .terminal-loading {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--term-bg-translucent);
  }

  @media (max-width: 768px) {
    .terminal-wrapper {
      min-height: 100dvh;
    }

    .terminal-container {
      border-width: 1px;
    }
  }
</style>