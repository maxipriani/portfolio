import { CONFIG } from './config/index.js';
import { getContent } from './content/index.js';

function generateId(index = 0) {
  return Date.now() + Math.random() + index;
}

class PortfolioState {
  lang = $state('en');
  loading = $state(true);
  progress = $state(0);
  activeSection = $state(null);
  lines = $state([]);
  inputValue = $state('');
  terminalHidden = $state(false);

  content = $derived(getContent(this.lang));

  cvInterval = null;

  sectionActions = {
    ABOUT: () => this.showAbout(),
    PROJECTS: () => this.showProjects(),
    WORK: () => this.showWork(),
    CONTACT: () => this.showContact(),
    CV: () => this.showCV(),
    HELP: () => this.showHelp(),
  };

  commandActions = {
    help: () => this.showHelp(),
    about: () => this.showAbout(),
    projects: () => this.showProjects(),
    work: () => this.showWork(),
    contact: () => this.showContact(),
    cv: () => this.downloadCV(),
    hide: () => this.hideTerminal(),
  };

  constructor() {
    this.initLang();
  }

  initLang() {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('portfolio-lang');
    if (stored === 'en' || stored === 'es') {
      this.lang = stored;
      return;
    }

    const browserLang = navigator.language || '';
    if (browserLang.startsWith('es')) this.lang = 'es';
  }

  buildLines(arr) {
    return arr.map((item, i) => ({
      text: item.text,
      type: String(item.type || 'output'),
      url: item.url || null,
      icon: item.icon || null,
      company: item.company || null,
      progress: item.progress || 0,
      id: generateId(i),
    }));
  }

  updateSection(section, contentItems, updateHash = true) {
    this.activeSection = section;
    this.lines = this.buildLines(contentItems);

    if (updateHash && typeof window !== 'undefined') {
      const newHash = section
        ? `#${section.toLowerCase()}`
        : window.location.pathname;
      window.history.replaceState(null, '', newHash);
    }
  }

  setLang(value) {
    if (value !== 'en' && value !== 'es') return;

    this.lang = value;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('portfolio-lang', value);
    }

    setTimeout(() => {
      if (this.activeSection) this.navigateToSection(this.activeSection);
      else this.showAbout();
    }, 0);
  }

  toggleTerminal() {
    this.terminalHidden = !this.terminalHidden;
  }

  hideTerminal() {
    this.terminalHidden = true;
  }

  showTerminal() {
    this.terminalHidden = false;
  }

  showHelp() {
    const items = Object.entries(this.content.commands).map(([cmd, desc]) => ({
      text: `  ${cmd.padEnd(10)} – ${String(desc)}`,
      type: 'output',
    }));
    this.updateSection('HELP', items);
  }

  showAbout() {
    const c = this.content.about;
    const items = [
      { text: c.title, type: 'greeting' },
      { text: '', type: 'output' },
    ];
    c.lines.forEach((line) => items.push({ text: line, type: 'paragraph' }));
    this.updateSection('ABOUT', items);
  }

  showProjects() {
    const c = this.content.projects;
    const items = c.items.flatMap((project, index) => {
      const chunk = [
        { text: String(project.name), type: 'project-name', url: project.url },
        { text: String(project.description), type: 'project-desc' },
        { text: project.tags, type: 'project-tags' },
      ];
      if (index < c.items.length - 1) chunk.push({ text: '', type: 'output' });
      return chunk;
    });
    this.updateSection('PROJECTS', items);
  }

  showWork() {
    const c = this.content.work;
    const items = c.items.flatMap((job, index) => {
      const chunk = [
        {
          type: 'work-title',
          text: String(job.role),
          company: String(job.company),
          url: job.companyUrl || null,
        },
        { text: String(job.period), type: 'work-period' },
        { text: String(job.description), type: 'work-desc' },
      ];
      if (index < c.items.length - 1) chunk.push({ text: '', type: 'output' });
      return chunk;
    });
    this.updateSection('WORK', items);
  }

  showContact() {
    this.updateSection('CONTACT', [
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

  showCV() {
    this.updateSection('CV', [
      { text: this.content.cv.downloadText, type: 'cv-download' },
    ]);
  }

  downloadCV() {
    if (typeof window === 'undefined') return;

    if (this.cvInterval) {
      clearInterval(this.cvInterval);
      this.cvInterval = null;
    }

    this.updateSection('CV', [
      {
        type: 'progress-bar',
        text: '[ DOWNLOADING CV... ]',
        progress: 0,
      },
    ]);

    const currentLineId = this.lines[0].id;

    const totalSteps = 20;
    let step = 0;

    this.cvInterval = setInterval(() => {
      step++;
      const percent = Math.round((step / totalSteps) * 100);

      const lineIndex = this.lines.findIndex((l) => l.id === currentLineId);
      if (lineIndex !== -1) {
        this.lines[lineIndex].progress = percent;
      }

      if (step >= totalSteps) {
        clearInterval(this.cvInterval);
        this.cvInterval = null;

        this.lines.push({ text: 'OK', type: 'output' });

        const link = document.createElement('a');
        link.href = CONFIG.cvPath;
        link.download = 'cv.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 50);
  }

  showError(command) {
    this.lines = this.buildLines([
      { text: `${this.content.errorNotFound} ${command}`, type: 'error' },
      { text: `${this.content.errorHint}`, type: 'hint' },
    ]);
  }

  navigateToSection(sectionKey) {
    (this.sectionActions[sectionKey] || this.sectionActions.ABOUT)();
  }

  runCommand(cmd) {
    const key = cmd.trim().toLowerCase();
    if (!key) return;
    const action = this.commandActions[key];
    action ? action() : this.showError(key);
  }

  initFromHash(sectionKeys) {
    const hash = window.location.hash.replace('#', '').toUpperCase();
    if (hash && sectionKeys.includes(hash)) this.navigateToSection(hash);
    else this.showAbout();
  }
}

export const appState = new PortfolioState();
