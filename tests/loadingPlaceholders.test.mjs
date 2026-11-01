import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

test('initial page renders placeholders and working project links without loading embedded websites', async () => {
  const server = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
  });
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    const html = renderToStaticMarkup(createElement(App));
    assert.doesNotMatch(html, /<iframe/);
    assert.equal((html.match(/class="preview-placeholder /g) ?? []).length, 2);
    assert.match(html, /href="https:\/\/cultivatortech\.com\/"/);
    assert.match(html, /href="https:\/\/www\.okkysr\.me\/"/);
    assert.match(html, />GS<\/span>/);
    assert.match(html, /id="hero"/);
    assert.match(html, /id="kontak"/);
  } finally {
    await server.close();
  }
});
