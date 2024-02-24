import express, { Application } from "express";

const app: Application = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port: number = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();