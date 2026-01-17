<script>
  import { CONFIG } from '../../config/index.js';
  import { downloadCV } from '../../utils/navigation.js';

  export let line;

  const techIcons = {
    'Rust': 'devicon-rust-plain',
    'Go': 'devicon-go-original-wordmark',
    'C++': 'devicon-cplusplus-plain',
  };

  const contactIcons = {
    LinkedIn: 'devicon-linkedin-plain',
    GitHub: 'devicon-github-original',
  };

  function handleEmailClick() {
    window.location.href = `mailto:${CONFIG.email}`;
  }

  function handleProjectClick(url) {
    if (url) window.open(url, '_blank');
  }
</script>

<div class="terminal-line line-{line.type}">
  {#if line.type === 'project-name' && line.url}
    <span
      class="clickable-link project-title"
      on:click={() => handleProjectClick(line.url)}
      on:keypress={() => handleProjectClick(line.url)}
      role="link"
      tabindex="0"
    >
      {line.text}
    </span>

  {:else if line.type === 'contact-email'}
    <span
      class="contact-item"
      on:click={handleEmailClick}
      on:keypress={handleEmailClick}
      role="link"
      tabindex="0"
    >
      <span class="contact-icon-text">✉</span>
      <span class="contact-text">{line.text}</span>
    </span>

  {:else if line.type === 'contact-link' && line.url}
    <span
      class="contact-item"
      on:click={() => handleProjectClick(line.url)}
      on:keypress={() => handleProjectClick(line.url)}
      role="link"
      tabindex="0"
    >
      {#if contactIcons[line.icon]}
        <i class={contactIcons[line.icon]}></i>
      {/if}
      <span class="contact-text">{line.text}</span>
    </span>

  {:else if line.type === 'work-title'}
    <span>{line.text} @ </span>

    {#if line.url}
      <span
        class="company-link"
        role="link"
        tabindex="0"
        on:click={() => handleProjectClick(line.url)}
        on:keypress={() => handleProjectClick(line.url)}
      >
        {line.company}
      </span>
    {:else if line.company}
      <span>{line.company}</span>
    {/if}

  {:else if line.type === 'cv-download'}
    <button class="cv-download-btn" on:click={downloadCV}>
      {line.text}
    </button>

  {:else if line.type === 'greeting'}
    <span class="greeting-text">{line.text}</span>

  {:else if line.type === 'project-tags' && Array.isArray(line.text)}
    <div class="tags-container">
      {#each line.text as tag}
        <span class="tag-badge">
          {#if techIcons[tag]}
            <i class={techIcons[tag]}></i>
          {/if}
          {tag}
        </span>
      {/each}
    </div>

  {:else}
    {line.text}
  {/if}
</div>

<style>
  .terminal-line {
    animation: fadeIn 0.3s ease-out;
    font-weight: 500;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .line-system {
    color: #0f0;
    font-weight: 600;
    text-shadow: 0 0 10px #0f0, 0 0 20px #0f0;
  }

  .line-greeting {
    font-size: 1.4em;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .greeting-text {
    color: #0f0;
    text-shadow: 0 0 20px #0f0, 0 0 40px #0f0;
  }

  .line-paragraph {
    color: #0f0;
    line-height: 1.8;
    margin-bottom: 12px;
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
  }

  .line-command {
    color: #ff0;
    text-shadow: 0 0 15px rgba(255, 255, 0, 0.8);
  }

  .line-title {
    color: #0f0;
    font-weight: 700;
    font-size: 1.1em;
    margin-top: 10px;
    margin-bottom: 5px;
    text-shadow: 0 0 15px #0f0, 0 0 30px #0f0;
    text-decoration: underline;
    text-underline-offset: 8px;
    text-decoration-color: rgba(0, 255, 0, 0.5);
  }

  .line-project-name {
    margin-bottom: 6px;
  }

  .project-title {
    color: #0ff;
    font-weight: 700;
    font-size: 1.15em;
    text-shadow: 0 0 15px #0ff, 0 0 30px rgba(0, 255, 255, 0.5);
    text-decoration: underline;
    text-underline-offset: 4px;
    cursor: pointer;
  }

  .project-title:hover {
    color: #fff;
    text-shadow: 0 0 20px #0ff, 0 0 40px #0ff;
  }

  .line-project-desc {
    color: #0f0;
    padding-left: 16px;
    margin-bottom: 6px;
    line-height: 1.6;
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
    border-left: 2px solid rgba(0, 255, 0, 0.3);
  }

  .line-project-tags {
    padding-left: 16px;
    margin-bottom: 28px;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }

  .tag-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #0f0;
    font-size: 0.85em;
    padding: 4px 12px;
    border: 1px solid rgba(0, 255, 0, 0.5);
    background: rgba(0, 255, 0, 0.08);
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.15);
  }

  .tag-badge i {
    font-size: 1.2em;
    color: #0f0;
    filter: drop-shadow(0 0 6px rgba(0, 255, 0, 0.6));
  }

  .clickable-link {
    color: #ffd100;
    text-decoration: underline;
    text-underline-offset: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-shadow: 0 0 15px rgba(255, 255, 44, 0.8);
  }

  .clickable-link:hover {
    color: #ffffff;
  }

  .cv-download-btn {
    display: inline-block;
    padding: 12px 24px;
    border: 2px solid #0f0;
    background: rgba(0, 255, 0, 0.1);
    color: #0f0;
    font-family: inherit;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-shadow: 0 0 15px #0f0;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.05);
  }

  .cv-download-btn:hover {
    background: rgba(0, 255, 0, 0.25);
    box-shadow: 0 0 30px rgba(0, 255, 0, 0.5), 0 0 60px rgba(0, 255, 0, 0.3),
      inset 0 0 30px rgba(0, 255, 0, 0.1);
    text-shadow: 0 0 20px #0f0, 0 0 40px #0f0;
    transform: translateY(-2px);
  }

  .line-work-title {
    color: #0f0;
    font-weight: 800;
    font-size: 1.15em;
    margin-top: 22px;
    margin-bottom: 8px;
    text-shadow: 0 0 20px #0f0, 0 0 40px #0f0;
  }

  .line-work-period {
    font-style: italic;
    color: rgb(1, 206, 1);
    font-weight: 600;
    font-size: 0.95em;
    margin-bottom: 10px;
    padding-left: 16px;
    text-shadow: 0 0 10px rgba(0, 170, 0, 0.55);
  }

  .line-work-desc {
    color: #0f0;
    padding-left: 16px;
    margin-bottom: 10px;
    line-height: 1.6;
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
    border-left: 2px solid rgba(0, 255, 0, 0.25);
  }

  .work-title-link {
    color: #0f0;
    font-size: 0.9em;
    text-decoration: none;
    text-shadow: 0 0 20px #0f0, 0 0 40px #0f0;
  }

  .company-link {
    color: #0f0;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: rgba(0, 255, 0, 0.35);
    text-underline-offset: 4px;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.45);
    transition: text-shadow 0.25s ease, color 0.25s ease;
  }

  .company-link:hover {
    color: #0f0;
    text-shadow: 0 0 18px rgba(0, 255, 0, 0.85), 0 0 36px rgba(0, 255, 0, 0.55),
      0 0 60px rgba(0, 255, 0, 0.35);
  }

  .contact-item {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    font-size: 1em;
    font-weight: 650;
    letter-spacing: 0.2px;

    padding: 8px 12px;
    margin: 6px 0;

    width: 320px;
    max-width: 80%;
    box-sizing: border-box;

    border-left: 2px solid rgba(0, 255, 0, 0.22);
    background: rgba(0, 255, 0, 0.03);

    color: #0f0;
    cursor: pointer;

    text-shadow: 0 0 12px rgba(0, 255, 0, 0.55);
    transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  }

  .contact-item i,
  .contact-icon-text {
    font-size: 1.15em;
    width: 1.3em;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.6);
  }

  .contact-text {
    font-size: 1em;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .contact-item::before {
    content: ">";
    opacity: 0.75;
    margin-right: 2px;
    color: rgba(0, 255, 0, 0.85);
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.45);
  }

  .contact-item:hover {
    transform: translateX(2px);
    background: rgba(0, 255, 0, 0.07);
    border-left-color: rgba(0, 255, 0, 0.45);
    box-shadow: 0 0 14px rgba(0, 255, 0, 0.18);
  }

  .contact-item:hover .contact-text {
    color: #fff;
    text-shadow: 0 0 14px rgba(0, 255, 255, 0.5);
  }

  @media (max-width: 480px) {
    .contact-text {
      white-space: normal;
      overflow: visible;
      text-overflow: clip;
      word-break: break-all;
      overflow-wrap: anywhere;
    }
  }
</style>
