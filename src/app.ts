import "express-async-errors";
import express, { Application } from "express";
import * as dotenv from 'dotenv';
import connectToMongoDB from "./db/connectToMongoDB";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware";
import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware";
import { authMiddleware } from "./middleware/authenticationMiddleware";
import authRouter from "./routes/authRouter";
import balanceRouter from "./routes/balanceRouter";
import transactionRouter from "./routes/transactionRouter";

dotenv.config();

const app: Application = express();

const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Href link to swagger document');
});

app.use('/api/v1', authRouter);

app.use(authMiddleware);

app.use('/api/v1/balance', balanceRouter);

app.use('/api/v1/transactions', transactionRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectToMongoDB(process.env.MONGODB_CONNECTION_STRING as string);
    app.listen(port, () =>
      console.log('connected to mongoDB', '\n', `Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();