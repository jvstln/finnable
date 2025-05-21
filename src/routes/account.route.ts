import express from "express";
import { accountController } from "../controllers/account.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { createAccountSchema } from "../schemas/account.schema";

export const accountRouter = express.Router();

accountRouter.post(
  "/all",
  validationMiddleware.validate({
    path: "body",
    schema: createAccountSchema,
  }),
  accountController.createAccount
);

accountRouter.get("/", accountController.getAllAccounts);
