import express from "express";
import * as appController from "./app.controller.js";
import { validator } from "./middlewares/validator.middleware.js";
import { createAccountSchema, decryptionRequestSchema } from "./app.schema.js";

export const appRoute = express.Router();

appRoute.post(
  "/",
  validator({
    path: "body",
    schema: createAccountSchema,
  }),
  appController.createAccount
);

appRoute.get("/all", appController.getAllAccounts);
appRoute.get(
  "/decryptions",
  validator({
    path: "query",
    schema: decryptionRequestSchema,
  }),
  appController.getDecryptions
);
