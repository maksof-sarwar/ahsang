import express from 'express';
import { createServer, Server as HttpServer } from 'http';
import { errorHandler, logErrors } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';
import cors from 'cors';
import { connectToDatabase } from './db';
import { routes } from './routes';

export class Server {
  private app: express.Application;
  private server: HttpServer;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
  }

  public async start(): Promise<void> {
    try {
      await connectToDatabase();

      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(cors({ origin: "*" }));
      // Public routes
      this.app.use('/api/auth', routes);

      // Protected routes
      this.app.use('/api', routes);
      this.app.use(logErrors);
      this.app.use(errorHandler);
      this.app.use(notFoundHandler);

      this.server.listen(3000, () => {
        console.log('Server is running on port 3000');
      });
    } catch (error) {
      console.error('Error starting server:', error);
    }
  }
}

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

async function bootstrap() {
  try {
    await new Server().start()
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

bootstrap();