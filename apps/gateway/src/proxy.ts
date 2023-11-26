import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';
import { IPROXYROUTE } from './routes';

export const setupProxies = (app: Express, routes: IPROXYROUTE[]) => {
  routes.forEach((route) => {
    app.use(route.url, createProxyMiddleware(route.proxy));
  });
};
