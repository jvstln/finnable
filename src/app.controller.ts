import { Request, Response } from "express";
import * as appController from "./app.service.js";
import { AccountCreation } from "./app.model.js";

export async function createAccount(
  req: Request<{}, {}, AccountCreation>,
  res: Response
) {
  const createdAccount = await appController.createAccount(req.body);

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: createdAccount,
  });
}

export async function getAllAccounts(_req: Request, res: Response) {
  const accounts = await appController.getAllAccounts();

  res.status(200).json({
    success: true,
    message: "Accounts retrieved successfully",
    data: accounts,
  });
}

export async function getDecryptions(req: Request, res: Response) {
  res.json({
    sucess: true,
    message: "Encrypted values parsed successfully",
    data: appController.getRecursiveDecryptions(req.body),
  });
}
