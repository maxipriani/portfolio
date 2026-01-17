import { en } from './en.js';
import { es } from './es.js';

export const CONTENT = { en, es };

export function getContent(lang) {
  return CONTENT[lang] || CONTENT.en;
}
