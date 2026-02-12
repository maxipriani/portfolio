<script>
  let { text = '', speed = 50, onComplete = () => {} } = $props();
  
  let displayText = $state('');
  let currentIndex = $state(0);
  let showCursor = $state(true);
  
  $effect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        displayText += text[currentIndex];
        currentIndex++;
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      onComplete();
      const cursorInterval = setInterval(() => {
        showCursor = !showCursor;
      }, 530);
      return () => clearInterval(cursorInterval);
    }
  });
</script>

<span class="typing-text">
  {displayText}<span class="typing-cursor" class:visible={showCursor}>_</span>
</span>

<style>
  .typing-text {
    color: var(--term-color);
    text-shadow: var(--text-shadow-md);
  }
  
  .typing-cursor {
    opacity: 0;
    margin-left: 2px;
  }
  
  .typing-cursor.visible {
    opacity: 1;
  }
</style>