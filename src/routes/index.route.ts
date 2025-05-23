import express from "express";
import { accountRouter } from "./account.route.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { recursiveObjectSchema } from "../schemas/account.schema.js";
import { accountController } from "../controllers/account.controller.js";

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
  accountController.getDecryptions
);
