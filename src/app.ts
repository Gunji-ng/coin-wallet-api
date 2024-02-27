import "express-async-errors";
import express, { Application } from "express";
import { authMiddleware } from "./middleware/authenticationMiddleware";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware";
import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware";
import authRouter from "./routes/authRouter";
import connectToMongoDB from "./db/connectToMongoDB";
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Href link to swagger document');
});

app.use('/api/v1', authRouter);

// app.use(authMiddleware);

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