import {AngularNodeAppEngine, writeResponseToNodeResponse} from '@angular/ssr/node';
import express from 'express';
import {fileURLToPath} from 'node:url';
import {dirname, resolve} from 'node:path';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  const engine = new AngularNodeAppEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.use('*', (req, res, next) => {
    // taken from https://angular.dev/guide/ssr#nodejs on 04-06-2026
    engine
      .handle(req)
      .then(async (response) => {
        if (response) {
          await writeResponseToNodeResponse(response, res);
        } else {
          next(); // Pass control to the next middleware
        }
      })
      .catch(next);
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
