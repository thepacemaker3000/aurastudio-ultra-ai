import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import {
  helmetMiddleware,
  corsMiddleware,
  compressionMiddleware,
  requestIdMiddleware,
} from './src/server/middleware/security';
import { centralErrorHandler } from './src/server/middleware/errorHandler';
import { apiRouter } from './src/server/routes/api.routes';
import { logger } from './src/server/utils/logger';
import { config } from './src/server/config';

dotenv.config();

const app = express();
const PORT = config.port;

// Security & Optimization Middlewares
app.use(requestIdMiddleware);
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(compressionMiddleware);

// Body parser with 5MB security limit
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode}`, {
      requestId: res.getHeader('X-Request-ID') as string,
      module: 'HTTP',
      durationMs: Date.now() - start,
    });
  });
  next();
});

// Mount API Router
app.use('/api', apiRouter);

// SEO Endpoints
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: ${req.protocol}://${req.get('host')}/sitemap.xml`);
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${req.protocol}://${req.get('host')}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
});

// Centralized Error Handler Middleware
app.use(centralErrorHandler);

// -------------------------------------------------------------
// Vite Middleware / Production Static Server Setup
// -------------------------------------------------------------
async function startServer() {
  if (!config.isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    logger.info(`[AuraStudio Enterprise Engine] Server listening on http://0.0.0.0:${PORT}`, {
      module: 'ServerInit',
    });
  });
}

startServer();
