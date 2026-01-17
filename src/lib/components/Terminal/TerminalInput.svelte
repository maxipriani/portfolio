<script>
  import { onMount } from 'svelte';
  import { CONFIG } from '../../config/index.js';
  import { t, inputValue } from '../../stores/index.js';
  import { runCommand } from '../../utils/navigation.js';

  let inputRef;

  function handleSubmit() {
    if (!$inputValue.trim()) return;
    runCommand($inputValue);
    inputValue.set('');
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  onMount(() => {
    if (inputRef) {
      inputRef.focus();
    }
  });

</script>

<div class="terminal-input-area">
  <span class="prompt">{CONFIG.user}:~$</span>
  <input
    bind:this={inputRef}
    type="text"
    class="terminal-input"
    bind:value={$inputValue}
    placeholder={$t.inputPlaceholder}
    autocomplete="off"
    on:keydown={handleKeydown}
  />
</div>

<style>
  .terminal-input-area {
    border-top: 2px solid #00ff00;
    background: linear-gradient(180deg, rgba(0, 30, 0, 0.8) 0%, rgba(0, 20, 0, 0.95) 100%);
    padding: 16px 32px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 -5px 20px rgba(0, 255, 0, 0.1);
  }

  .prompt {
    color: #00ff00;
    white-space: nowrap;
    font-size: 17px;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
  }

  .terminal-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #00ff00;
    font-family: inherit;
    font-size: 17px;
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
    caret-color: #00ff00;
  }

  .terminal-input::placeholder {
    color: #006622;
    text-shadow: none;
  }

  .terminal-input:focus {
    text-shadow: 0 0 12px rgba(0, 255, 0, 0.7);
  }
</style>