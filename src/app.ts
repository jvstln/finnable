import "dotenv/config";
import express from "express";
import { indexRouter } from "./routes/index.route.js";
import { connectToDb } from "./utils/db.util.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { indexMiddleware } from "./middlewares/index.middleware.js";

const app = express();

app.use(indexMiddleware);

app.use("/api/v1", indexRouter);

app.use("", (req, res) => {
  res.json({ message: `Route ${req.method}: ${req.url} Not Found` });
});

app.use(errorMiddleware);

const PORT = process.env.PORT ?? 5000;
startApp();

function startApp() {
  try {
    connectToDb();
    app.listen(PORT, () => console.log("App listening on", PORT));
  } catch (error) {
    console.log("Error connecting to Express: ", error);
  }
}
