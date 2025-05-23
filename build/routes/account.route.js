import express from "express";
import { accountController } from "../controllers/account.controller.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { createAccountSchema, recursiveObjectSchema, } from "../schemas/account.schema.js";
export const accountRouter = express.Router();
accountRouter.post("/", validationMiddleware.validate({
    path: "body",
    schema: createAccountSchema,
}), accountController.createAccount);
accountRouter.get("/all", accountController.getAllAccounts);
accountRouter.get("/decryptions", validationMiddleware.validate({
    path: "query",
    schema: recursiveObjectSchema,
}), accountController.getDecryptions);
