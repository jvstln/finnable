import express from "express";
import "dotenv/config";
import { connectToDb } from "./utils/util.js";
import { appMiddlewareRoute } from "./middlewares/validator.middleware.js";
import { appRoute } from "./app.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
const app = express();
app.use(appMiddlewareRoute);
app.use("/api/v1", appRoute);
// Handle Errors
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;
connectToDb();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
