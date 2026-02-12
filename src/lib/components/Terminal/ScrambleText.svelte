<script>
  let { text = '', speed = 30, iterations = 3 } = $props();
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  
  let displayText = $state(text);
  let isHovering = $state(false);
  let intervalId = null;
  
  function scramble() {
    if (intervalId) return;
    
    let iteration = 0;
    
    intervalId = setInterval(() => {
      displayText = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      iteration += 1;
      
      if (iteration >= text.length * iterations) {
        clearInterval(intervalId);
        intervalId = null;
        displayText = text;
      }
    }, speed);
  }
  
  function handleMouseEnter() {
    isHovering = true;
    scramble();
  }
  
  function handleMouseLeave() {
    isHovering = false;
  }
</script>

<span 
  class="scramble-text"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  role="text"
>
  {displayText}
</span>

<style>
  .scramble-text {
    display: inline-block;
  }
</style>