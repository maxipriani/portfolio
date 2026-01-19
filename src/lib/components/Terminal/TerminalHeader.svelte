<script>
  import { appState } from '../../state.svelte.js';

  function handleMinimize(e) {
    e.stopPropagation();
    appState.hideTerminal();
  }
</script>

<div class="terminal-header">
  <div class="header-left">
    <div class="terminal-dots">
      <div class="dot dot-red"></div>
      <button class="dot dot-yellow" onclick={handleMinimize}></button>
      <div class="dot dot-green"></div>
    </div>
  </div>
  
  <div class="header-right">
    <div class="lang-switch">
      <button 
        class="lang-btn" 
        class:active={appState.lang === 'en'} 
        onclick={() => appState.setLang('en')}
      >
        EN
      </button>
      <span class="lang-separator">|</span>
      <button 
        class="lang-btn" 
        class:active={appState.lang === 'es'} 
        onclick={() => appState.setLang('es')}
      >
        ES
      </button>
    </div>
  </div>
</div>

<style>
  .terminal-header {
    background: linear-gradient(180deg, rgba(0, 40, 0, 0.9) 0%, rgba(0, 20, 0, 0.95) 100%);
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid var(--term-color);
    box-shadow: 0 2px 20px var(--term-color-dim);
  }

  .header-left {
    display: flex;
    align-items: center;
  }

  .terminal-dots {
    display: flex;
    gap: 10px;
  }

  .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    transition: all 0.3s ease;
    border: none;
    padding: 0;
  }

  .dot-red {
    background: radial-gradient(circle at 30% 30%, #ff6b6b, #ff0000);
    box-shadow: 0 0 12px #ff0000, 0 0 24px rgba(255, 0, 0, 0.5);
  }

  .dot-yellow {
    background: radial-gradient(circle at 30% 30%, #ffff6b, #ffff00);
    box-shadow: 0 0 12px #ffff00, 0 0 24px rgba(255, 255, 0, 0.5);
    cursor: pointer;
  }

  .dot-yellow:hover {
    transform: scale(1.2);
    box-shadow: 0 0 16px #ffff00, 0 0 32px rgba(255, 255, 0, 0.7);
  }

  .dot-green {
    background: radial-gradient(circle at 30% 30%, #6bff6b, #00ff00);
    box-shadow: 0 0 12px #00ff00, 0 0 24px rgba(0, 255, 0, 0.5);
  }

  .header-right {
    display: flex;
    align-items: center;
  }

  .lang-switch {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lang-btn {
    background: transparent;
    border: none;
    color: var(--term-color);
    padding: 6px 12px;
    cursor: pointer;
    font-family: inherit;
    font-size: 15px;
    transition: all 0.2s;
    text-shadow: var(--text-shadow-sm);
    opacity: 0.6;
  }

  .lang-btn:hover {
    opacity: 1;
    text-shadow: var(--text-shadow-md);
  }

  .lang-btn.active {
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-shadow: var(--text-shadow-md);
  }

  .lang-separator {
    color: var(--term-color);
    opacity: 0.6;
    text-shadow: var(--text-shadow-sm);
  }
</style>
