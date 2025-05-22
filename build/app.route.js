import express from "express";
import * as appController from "./app.controller.js";
import { validator } from "./middlewares/validator.middleware.js";
import { createAccountSchema } from "./app.schema.js";
export const appRoute = express.Router();
appRoute.post("/", validator({
    path: "body",
    schema: createAccountSchema,
})
// appController.createAccount(req.body);
);
appRoute.get("/all", appController.getAllAccounts);
appRoute.get("/decryptions", 
// validationMiddleware.validate({
//   path: "query",
//   schema: recursiveObjectSchema,
// }),
appController.getDecryptions);
