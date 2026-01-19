<script>
  let { progress = 0 } = $props();
</script>

<div class="loading-container">
  <div class="loading-text">[ INITIALIZING SYSTEM... ]</div>
  <div class="progress-bar">
    <div class="progress-fill" style="width: {progress}%"></div>
  </div>
  <div class="progress-text">{progress}%</div>
</div>

<style>
  .loading-container {
    padding: 40px 20px;
    text-align: center;
  }

  .loading-text {
    color: var(--term-color);
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 30px;
    text-shadow: var(--text-shadow-md);
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .progress-bar {
    width: 100%;
    max-width: 400px;
    height: 20px;
    border: 2px solid var(--term-color);
    border-radius: 4px;
    margin: 0 auto;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: var(--shadow-md), inset 0 0 10px rgba(0, 255, 0, 0.1);
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #00cc00 0%, #00ff00 50%, #33ff33 100%);
    box-shadow: 0 0 20px #00ff00, 0 0 40px rgba(0, 255, 0, 0.5);
    transition: width 0.1s ease;
  }

  .progress-text {
    color: var(--term-color);
    margin-top: 15px;
    font-size: 16px;
    text-shadow: var(--text-shadow-sm);
  }
</style>
