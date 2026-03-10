import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Vite plugin that adds dev-server API endpoints for uploading assets.
 * DEV ONLY — remove when done managing assets.
 */
export default function assetManagerPlugin() {
  let projectRoot = '';

  return {
    name: 'asset-manager',
    configResolved(config) {
      projectRoot = config.root;
    },
    configureServer(server) {
      // POST /api/upload-asset — saves file to public/
      server.middlewares.use('/api/upload-asset', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const body = Buffer.concat(chunks);

        // Parse multipart form data (simple parser)
        const contentType = req.headers['content-type'] || '';
        if (!contentType.includes('multipart/form-data')) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Expected multipart/form-data' }));
          return;
        }

        const boundary = contentType.split('boundary=')[1];
        if (!boundary) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'No boundary found' }));
          return;
        }

        const parts = parseMultipart(body, boundary);
        const filePart = parts.find(p => p.name === 'file');
        const targetPath = parts.find(p => p.name === 'targetPath');

        if (!filePart || !targetPath) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Missing file or targetPath' }));
          return;
        }

        const target = targetPath.data.toString('utf-8').trim();
        // Security: ensure target stays within public/
        const safePath = path.resolve(projectRoot, 'public', target);
        if (!safePath.startsWith(path.resolve(projectRoot, 'public'))) {
          res.statusCode = 403;
          res.end(JSON.stringify({ error: 'Path traversal not allowed' }));
          return;
        }

        // Ensure directory exists
        fs.mkdirSync(path.dirname(safePath), { recursive: true });
        fs.writeFileSync(safePath, filePart.data);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          ok: true,
          path: '/' + target,
          size: filePart.data.length
        }));
      });

      // POST /api/upload-asset-src — saves file and returns new src path
      // For images/videos referenced from src/assets/ (bundled), saves to public/ with same name
      server.middlewares.use('/api/list-assets', (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        const publicDir = path.join(projectRoot, 'public');
        const assets = [];

        function walk(dir, prefix) {
          if (!fs.existsSync(dir)) return;
          for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
            if (entry.isDirectory()) {
              walk(path.join(dir, entry.name), rel);
            } else if (/\.(png|jpe?g|gif|svg|webp|avif|mp4|webm|mov)$/i.test(entry.name)) {
              assets.push('/' + rel);
            }
          }
        }
        walk(publicDir, '');

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(assets));
      });
    }
  };
}

/** Minimal multipart parser */
function parseMultipart(body, boundary) {
  const parts = [];
  const boundaryBuf = Buffer.from('--' + boundary);
  const endBuf = Buffer.from('--' + boundary + '--');

  let start = indexOf(body, boundaryBuf, 0);
  if (start === -1) return parts;

  while (true) {
    start += boundaryBuf.length;
    // Skip \r\n
    if (body[start] === 0x0d && body[start + 1] === 0x0a) start += 2;

    const nextBoundary = indexOf(body, boundaryBuf, start);
    if (nextBoundary === -1) break;

    const partData = body.slice(start, nextBoundary - 2); // -2 for \r\n before boundary
    const headerEnd = indexOf(partData, Buffer.from('\r\n\r\n'), 0);
    if (headerEnd === -1) { start = nextBoundary; continue; }

    const headerStr = partData.slice(0, headerEnd).toString('utf-8');
    const data = partData.slice(headerEnd + 4);

    const nameMatch = headerStr.match(/name="([^"]+)"/);
    const filenameMatch = headerStr.match(/filename="([^"]+)"/);

    parts.push({
      name: nameMatch ? nameMatch[1] : '',
      filename: filenameMatch ? filenameMatch[1] : '',
      data,
      headers: headerStr
    });

    // Check if this is the end
    if (indexOf(body, endBuf, nextBoundary) === nextBoundary) break;
    start = nextBoundary;
  }

  return parts;
}

function indexOf(buf, search, from) {
  for (let i = from; i <= buf.length - search.length; i++) {
    let found = true;
    for (let j = 0; j < search.length; j++) {
      if (buf[i + j] !== search[j]) { found = false; break; }
    }
    if (found) return i;
  }
  return -1;
}
