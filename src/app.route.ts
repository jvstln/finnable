import express from "express";
import * as appController from "./app.controller.js";
import { validator } from "./middlewares/validator.middleware.js";
import { createAccountSchema, decryptionRequestSchema } from "./app.schema.js";

export const appRoute = express.Router();

appRoute.post(
  "accounts/",
  validator({
    path: "body",
    schema: createAccountSchema,
  }),
  appController.createAccount
);

appRoute.get("accounts/all", appController.getAllAccounts);
appRoute.post(
  "/decryptions",
  validator({
    path: "body",
    schema: decryptionRequestSchema,
  }),
  appController.getDecryptions
);
