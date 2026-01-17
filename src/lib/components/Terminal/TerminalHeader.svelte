<script>
  import { lang, activeSection } from '../../stores/index.js';
  import { navigateToSection, hideTerminal, showAbout } from '../../utils/navigation.js';

  function switchLang(newLang) {
    if ($lang === newLang) return;
    const currentSection = $activeSection;
    lang.set(newLang);
    
    if (currentSection) {
      setTimeout(() => navigateToSection(currentSection), 0);
    } else {
      setTimeout(() => showAbout(), 0);
    }
  }

  function handleMinimize(e) {
    e.stopPropagation();
    hideTerminal();
  }
</script>

<div class="terminal-header">
  <div class="header-left">
    <div class="terminal-dots">
      <div class="dot dot-red"></div>
      <button class="dot dot-yellow" on:click={handleMinimize}></button>
      <div class="dot dot-green"></div>
    </div>
  </div>
  
  <div class="header-right">
    <div class="lang-switch">
      <button 
        class="lang-btn" 
        class:active={$lang === 'en'} 
        on:click={() => switchLang('en')}
      >
        EN
      </button>
      <span class="lang-separator">|</span>
      <button 
        class="lang-btn" 
        class:active={$lang === 'es'} 
        on:click={() => switchLang('es')}
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
    border-bottom: 2px solid #00ff00;
    box-shadow: 0 2px 20px rgba(0, 255, 0, 0.3);
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
    color: #00ff00;
    padding: 6px 12px;
    cursor: pointer;
    font-family: inherit;
    font-size: 15px;
    transition: all 0.2s;
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
    opacity: 0.6;
  }

  .lang-btn:hover {
    opacity: 1;
    text-shadow: 0 0 15px rgba(0, 255, 0, 0.8);
  }

  .lang-btn.active {
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-shadow: 0 0 15px rgba(0, 255, 0, 0.8);
  }

  .lang-separator {
    color: #00ff00;
    opacity: 0.6;
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
  }
</style>