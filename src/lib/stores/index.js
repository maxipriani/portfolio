import { writable, derived } from 'svelte/store';
import { getContent } from '../content/index.js';

function detectDefaultLang() {
  if (typeof window === 'undefined') return 'en';

  const stored = localStorage.getItem('portfolio-lang');
  if (stored === 'en' || stored === 'es') return stored;

  const browserLang = navigator.language || navigator.userLanguage || '';
  if (browserLang.startsWith('es')) return 'es';

  return 'en';
}

function createLangStore() {
  const { subscribe, set } = writable(detectDefaultLang());

  return {
    subscribe,
    set: (value) => {
      if (value === 'en' || value === 'es') {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('portfolio-lang', value);
        }
        set(value);
      }
    },
  };
}

export const lang = createLangStore();
export const loading = writable(true);
export const progress = writable(0);
export const activeSection = writable(null);
export const lines = writable([]);
export const inputValue = writable('');
export const terminalHidden = writable(false);

export const t = derived(lang, ($lang) => getContent($lang));
