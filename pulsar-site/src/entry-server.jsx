import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { PassThrough } from 'node:stream';
import App from './App';

export function render(url) {
  return new Promise((resolve, reject) => {
    const stream = new PassThrough();
    let html = '';
    stream.on('data', chunk => { html += chunk.toString(); });
    stream.on('end', () => resolve(html));
    stream.on('error', reject);
    const { pipe } = renderToPipeableStream(<StaticRouter location={url}><App /></StaticRouter>, {
      onAllReady() { pipe(stream); },
      onError(error) { reject(error); }
    });
  });
}
