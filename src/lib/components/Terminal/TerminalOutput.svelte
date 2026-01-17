<script>
  import { lines } from '../../stores/index.js';
  import TerminalLine from './TerminalLine.svelte';

  let outputRef;

  $: if (outputRef && $lines) {
    outputRef.scrollTop = 0;
  }
</script>

<div bind:this={outputRef} class="terminal-output">
  {#each $lines as line (line.id)}
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
      rgba(0, 8, 0, 0.98);
  }

  .terminal-output::-webkit-scrollbar {
    width: 10px;
  }

  .terminal-output::-webkit-scrollbar-track {
    background: rgba(0, 20, 0, 0.8);
    border-left: 1px solid rgba(0, 255, 0, 0.3);
  }

  .terminal-output::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #0f0 0%, #0a0 100%);
    border-radius: 5px;
    box-shadow: 0 0 15px #0f0;
  }

  .terminal-output::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #3f3 0%, #0f0 100%);
  }

  .cursor {
    color: #0f0;
    animation: blink 1s step-end infinite;
    display: inline-block;
    margin-top: 15px;
    font-size: 22px;
    font-weight: 700;
    text-shadow: 0 0 20px #0f0, 0 0 40px #0f0;
  }

  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }
</style>