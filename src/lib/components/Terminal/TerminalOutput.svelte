<script>
  import { tick } from 'svelte';
  import { appState } from '../../state.svelte.js';
  import TerminalLine from './TerminalLine.svelte';

  let outputRef;

  $effect(() => {
    if (appState.lines) {
      tick().then(() => {
        if (outputRef) outputRef.scrollTop = 0;
      });
    }
  });
</script>

<div bind:this={outputRef} class="terminal-output">
  {#each appState.lines as line (line.id)}
    <TerminalLine {line} />
  {/each}
</div>

<style>
  .terminal-output {
    flex: 1;
    overflow-y: auto;
    padding: 30px 36px;
    font-size: 18px;
    line-height: 2.1;
    background: 
      radial-gradient(ellipse at top, rgba(0, 255, 0, 0.05) 0%, transparent 70%),
      var(--term-bg-panel);
  }

  .terminal-output::-webkit-scrollbar {
    width: 10px;
  }

  .terminal-output::-webkit-scrollbar-track {
    background: rgba(0, 20, 0, 0.8);
    border-left: 1px solid rgba(0, 255, 0, 0.3);
  }

  .terminal-output::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--term-color) 0%, #0a0 100%);
    border-radius: 5px;
    box-shadow: 0 0 15px var(--term-color);
  }

  .terminal-output::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #3f3 0%, var(--term-color) 100%);
  }
</style>