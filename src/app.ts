import "dotenv/config";
import express from "express";
import { indexRouter } from "./routes/index.route";
import { connectToDb } from "./utils/db";

const app = express();

app.use("/api/v1", indexRouter);

const PORT = process.env.PORT;

startApp();

function startApp() {
  try {
    connectToDb();
    app.listen(PORT, () => console.log("App listening on", PORT));
  } catch (error) {
    console.log("Error connecting to Express: ", error);
  }
}
