import express, { Express } from 'express';

export const createExpressApp: () => Express = () => {
  const app = express();

  app.use(express.json());

  return app;
};

export const startServer = (app: Express, port: number, name?: string) => {
  try {
    app.listen(port, () => {
      console.log(`${name || ''} listening on port ${port}`);
    });
  } catch (e) {
    console.log('Error starting server.');
  }
};
