import { get } from 'svelte/store';
import { lines, activeSection, t, terminalHidden } from '../stores/index.js';
import { CONFIG } from '../config/index.js';

function buildLines(arr) {
  return arr.map((item, i) => ({
    text: item.text,
    type: String(item.type || 'output'),
    url: item.url || null,
    icon: item.icon || null,
    company: item.company || null,
    id: Date.now() + Math.random() + i,
  }));
}

function updateSection(section, content, updateHash = true) {
  activeSection.set(section);
  lines.set(buildLines(content));
  if (updateHash && typeof window !== 'undefined') {
    const newHash = section
      ? `#${section.toLowerCase()}`
      : window.location.pathname;
    window.history.replaceState(null, '', newHash);
  }
}

export function showHelp() {
  const content = get(t);
  updateSection('HELP', [
    ...Object.entries(content.commands).map(([cmd, desc]) => ({
      text: `  ${cmd.padEnd(10)} – ${String(desc)}`,
      type: 'output',
    })),
  ]);
}

export function showAbout() {
  const content = get(t);
  const items = [
    { text: content.about.title, type: 'greeting' },
    { text: '', type: 'output' },
  ];

  content.about.lines.forEach((line) => {
    items.push({ text: line, type: 'paragraph' });
  });

  updateSection('ABOUT', items);
}

export function showProjects() {
  const content = get(t);
  const items = [];
  content.projects.items.forEach((project, index) => {
    items.push({
      text: String(project.name),
      type: 'project-name',
      url: project.url,
    });
    items.push({ text: String(project.description), type: 'project-desc' });
    items.push({ text: project.tags, type: 'project-tags' });
    if (index < content.projects.items.length - 1) {
      items.push({ text: '', type: 'output' });
    }
  });
  updateSection('PROJECTS', items);
}

export function showWork() {
  const content = get(t);
  const items = [];

  content.work.items.forEach((job, index) => {
    items.push({
      type: 'work-title',
      text: String(job.role),
      company: String(job.company),
      url: job.companyUrl || null,
    });

    items.push({ text: String(job.period), type: 'work-period' });
    items.push({ text: String(job.description), type: 'work-desc' });

    if (index < content.work.items.length - 1) {
      items.push({ text: '', type: 'output' });
    }
  });

  updateSection('WORK', items);
}

export function showContact() {
  updateSection('CONTACT', [
    { text: CONFIG.email, type: 'contact-email' },
    {
      text: 'LinkedIn',
      type: 'contact-link',
      icon: 'LinkedIn',
      url: CONFIG.linkedin,
    },
    {
      text: 'GitHub',
      type: 'contact-link',
      icon: 'GitHub',
      url: CONFIG.github,
    },
  ]);
}

export function showCV() {
  const content = get(t);
  updateSection('CV', [{ text: content.cv.downloadText, type: 'cv-download' }]);
}

let cvInterval = null;

export function downloadCV() {
  if (typeof window === 'undefined') return;

  if (cvInterval) {
    clearInterval(cvInterval);
    cvInterval = null;
  }

  updateSection('CV', [{ text: 'Download started...', type: 'output' }]);

  const progressId = `cv-progress-${Date.now()}`;
  lines.update((prev) => [
    ...prev,
    {
      id: progressId,
      type: 'output',
      text: '[░░░░░░░░░░░░░░░░] 0%',
    },
  ]);

  const totalSteps = 16;
  let step = 0;

  cvInterval = setInterval(() => {
    step++;

    const filled = '█'.repeat(step);
    const empty = '░'.repeat(totalSteps - step);
    const percent = Math.round((step / totalSteps) * 100);
    const bar = `[${filled}${empty}] ${percent}%`;

    lines.update((prev) =>
      prev.map((line) =>
        line.id === progressId ? { ...line, text: bar } : line
      )
    );

    if (step >= totalSteps) {
      clearInterval(cvInterval);
      cvInterval = null;

      lines.update((prev) => [...prev, { text: 'OK', type: 'output' }]);

      const link = document.createElement('a');
      link.href = CONFIG.cvPath;
      link.download = 'cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, 80);
}

export function hideTerminal() {
  terminalHidden.set(true);
}

export function showTerminal() {
  terminalHidden.set(false);
}

export function toggleTerminal() {
  terminalHidden.update((v) => !v);
}

export function showError(command) {
  const content = get(t);
  lines.set(
    buildLines([
      { text: `${content.errorNotFound} ${command}`, type: 'error' },
      { text: `${content.errorHint}`, type: 'hint' },
    ])
  );
}

const SECTION_ACTIONS = {
  ABOUT: showAbout,
  PROJECTS: showProjects,
  WORK: showWork,
  CONTACT: showContact,
  CV: showCV,
  HELP: showHelp,
};

const COMMAND_ACTIONS = {
  help: showHelp,
  about: showAbout,
  projects: showProjects,
  work: showWork,
  contact: showContact,
  cv: downloadCV,
  hide: hideTerminal,
};

export function navigateToSection(section) {
  const action = SECTION_ACTIONS[section];
  if (action) action();
}

export function runCommand(cmd) {
  const trimmed = cmd.trim().toLowerCase();
  if (!trimmed) return;

  const action = COMMAND_ACTIONS[trimmed];
  if (action) action();
  else showError(trimmed);
}

export function initFromHash(sectionKeys) {
  const hash = window.location.hash.replace('#', '').toUpperCase();
  if (hash && sectionKeys.includes(hash)) {
    navigateToSection(hash);
  } else {
    showAbout();
  }
}
