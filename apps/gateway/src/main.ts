import express from 'express';

import { startServer } from '@minex/lib/server';
import { setupProxies } from './proxy';
import { PROXY_ROUTES } from './routes';

const app = express();

setupProxies(app, PROXY_ROUTES);

startServer(app, Number(process.env.PORT) || 3000, 'Gateway');
