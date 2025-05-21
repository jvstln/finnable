import express from "express";
import { accountRouter } from "./account.route";
import { indexController } from "../controllers/index.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { recursiveObjectSchema } from "../schemas/index.schema";

export const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.json({ message: "Welcome to finnable" });
});

indexRouter.use("/accounts", accountRouter);

indexRouter.post(
  "/decryptions",
  validationMiddleware.validate({
    path: "body",
    schema: recursiveObjectSchema,
  }),
  indexController.getDecryptions.bind(indexController)
);
