<script>
  import { CONFIG } from '../../config/index.js';
  import { appState } from '../../state.svelte.js';

  let { line } = $props();
  
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

  function openUrl(url) {
    if (url) window.open(url, '_blank');
  }
</script>

{#snippet projectName(text, url)}
  <span
    class="clickable-link project-title"
    onclick={() => openUrl(url)}
    onkeypress={() => openUrl(url)}
    role="link"
    tabindex="0"
  >
    {text}
  </span>
{/snippet}

{#snippet contactEmail(text)}
  <span
    class="contact-item"
    onclick={handleEmailClick}
    onkeypress={handleEmailClick}
    role="link"
    tabindex="0"
  >
    <span class="contact-icon-text">✉</span>
    <span class="contact-text">{text}</span>
  </span>
{/snippet}

{#snippet contactLink(text, url, icon)}
  <span
    class="contact-item"
    onclick={() => openUrl(url)}
    onkeypress={() => openUrl(url)}
    role="link"
    tabindex="0"
  >
    {#if contactIcons[icon]}
      <i class={contactIcons[icon]}></i>
    {/if}
    <span class="contact-text">{text}</span>
  </span>
{/snippet}

{#snippet workTitle(text, company, url)}
  <span>{text} @ </span>
  {#if url}
    <span
      class="company-link"
      role="link"
      tabindex="0"
      onclick={() => openUrl(url)}
      onkeypress={() => openUrl(url)}
    >
      {company}
    </span>
  {:else if company}
    <span>{company}</span>
  {/if}
{/snippet}

{#snippet projectTags(tags)}
  <div class="tags-container">
    {#each tags as tag}
      <span class="tag-badge">
        {#if techIcons[tag]}
          <i class={techIcons[tag]}></i>
        {/if}
        {tag}
      </span>
    {/each}
  </div>
{/snippet}

<div class="terminal-line line-{line.type}">
  {#if line.type === 'project-name' && line.url}
    {@render projectName(line.text, line.url)}

  {:else if line.type === 'contact-email'}
    {@render contactEmail(line.text)}

  {:else if line.type === 'contact-link' && line.url}
    {@render contactLink(line.text, line.url, line.icon)}

  {:else if line.type === 'work-title'}
    {@render workTitle(line.text, line.company, line.url)}

  {:else if line.type === 'cv-download'}
    <button class="cv-download-btn" onclick={() => appState.downloadCV()}>
      {line.text}
    </button>

  {:else if line.type === 'greeting'}
    <span class="greeting-text">{line.text}</span>

  {:else if line.type === 'project-tags' && Array.isArray(line.text)}
    {@render projectTags(line.text)}

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
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .line-system {
    color: var(--term-color);
    font-weight: 600;
    text-shadow: var(--text-shadow-md);
  }

  .line-greeting {
    font-size: 1.4em;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .greeting-text {
    color: var(--term-color);
    text-shadow: var(--text-shadow-md);
  }

  .line-paragraph {
    color: var(--term-color);
    line-height: 1.8;
    margin-bottom: 12px;
    text-shadow: var(--text-shadow-sm);
  }

  .line-command {
    color: var(--color-command);
    text-shadow: 0 0 15px rgba(255, 255, 0, 0.8);
  }

  .line-title {
    color: var(--term-color);
    font-weight: 700;
    font-size: 1.1em;
    margin-top: 10px;
    margin-bottom: 5px;
    text-shadow: var(--text-shadow-md);
    text-decoration: underline;
    text-underline-offset: 8px;
    text-decoration-color: var(--term-color-dim);
  }

  .line-project-name { margin-bottom: 6px; }

  .project-title {
    color: var(--color-link);
    text-shadow: 0 0 15px var(--color-link), 0 0 30px rgba(255, 176, 0, 0.5);
    font-weight: 700;
    font-size: 1.15em;
    text-decoration: underline;
    text-underline-offset: 4px;
    cursor: pointer;
  }

  .project-title:hover {
    color: var(--color-link-hover);
    text-shadow: 0 0 20px var(--color-link), 0 0 40px var(--color-link-hover);
  }

  .line-project-desc {
    color: var(--term-color);
    padding-left: 16px;
    margin-bottom: 6px;
    line-height: 1.6;
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
    border-left: 2px solid rgba(0, 255, 0, 0.3);
  }

  .line-project-tags { padding-left: 16px; margin-bottom: 28px; }

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
    color: var(--term-color);
    font-size: 0.85em;
    padding: 4px 12px;
    border: 1px solid var(--term-color-dim);
    background: rgba(0, 255, 0, 0.08);
    text-shadow: var(--text-shadow-sm);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.15);
  }

  .tag-badge i {
    font-size: 1.2em;
    color: var(--term-color);
    filter: drop-shadow(0 0 6px rgba(0, 255, 0, 0.6));
  }

  .cv-download-btn {
    display: inline-block;
    padding: 12px 24px;
    border: 2px solid var(--term-color);
    background: rgba(0, 255, 0, 0.1);
    color: var(--term-color);
    font-family: inherit;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-shadow: 0 0 15px var(--term-color);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.05);
  }

  .cv-download-btn:hover {
    background: rgba(0, 255, 0, 0.25);
    box-shadow: 0 0 30px var(--term-color-dim), 0 0 60px rgba(0, 255, 0, 0.3),
      inset 0 0 30px rgba(0, 255, 0, 0.1);
    text-shadow: var(--text-shadow-md);
    transform: translateY(-2px);
  }

  .line-work-title {
    color: var(--term-color);
    font-weight: 800;
    font-size: 1.15em;
    margin-top: 22px;
    margin-bottom: 8px;
    text-shadow: var(--text-shadow-md);
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
    color: var(--term-color);
    padding-left: 16px;
    margin-bottom: 10px;
    line-height: 1.6;
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
    border-left: 2px solid rgba(0, 255, 0, 0.25);
  }

  .work-title-link {
    color: var(--term-color);
    font-size: 0.9em;
    text-decoration: none;
    text-shadow: var(--text-shadow-md);
  }

  .company-link {
    color: var(--term-color);
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: rgba(0, 255, 0, 0.35);
    text-underline-offset: 4px;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.45);
    transition: text-shadow 0.25s ease, color 0.25s ease;
  }

  .company-link:hover {
    color: var(--term-color);
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
    color: var(--term-color);
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
