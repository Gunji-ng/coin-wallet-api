import 'express-async-errors';
import express from 'express';
import * as dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import connectToMongoDB from './db/connectToMongoDB';
import { notFoundMiddleware } from './middleware/notFoundMiddleware';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';
import { authMiddleware } from './middleware/authenticationMiddleware';
import authRouter from './routes/authRouter';
import balanceRouter from './routes/balanceRouter';
import transactionRouter from './routes/transactionRouter';
import profileRouter from './routes/profileRouter';
import roleRouter from './routes/roleRouter';
import serveSwaggerDocs from './utils/swagger';

dotenv.config();

const app = express();

const port: number = Number(process.env.PORT) || 3000;

serveSwaggerDocs(app);

app.set('trust proxy', 1);
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
  }),
);
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1><a href="/docs">Swagger docs</a></h1>');
});

app.use('/api/v1', authRouter);

app.use(authMiddleware);

app.use('/api/v1/profile', profileRouter);

app.use('/api/v1/balance', balanceRouter);

app.use('/api/v1/transactions', transactionRouter);

app.use('/api/v1/roles', roleRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectToMongoDB(process.env.MONGODB_CONNECTION_STRING as string);
    app.listen(port, () => {
      console.log(
        'connected to mongoDB',
        '\n',
        `Server is listening on port ${port}...`,
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
