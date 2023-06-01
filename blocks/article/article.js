import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the article
 * @param {Element} block The article block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch article content
  const articlePath = cfg.article || '/article';
  const resp = await fetch(`${articlePath}.plain.html`, window.location.pathname.endsWith('/article') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate article DOM
    const article = document.createElement('div');
    article.innerHTML = html;

    decorateIcons(article);
    block.append(article);
  }
}
