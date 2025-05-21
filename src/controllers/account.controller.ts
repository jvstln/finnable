import { Request, Response } from "express";
import { accountService } from "../services/account.service";

class AccountController {
  async createAccount(req: Request, res: Response) {
    const createdAccount = await accountService.createAccount(req.body);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: createdAccount,
    });
  }

  async getAllAccounts(req: Request, res: Response) {
    const accounts = await accountService.getAllAccounts();

    res.status(200).json({
      success: true,
      message: "Accounts retrieved successfully",
      data: accounts,
    });
  }
}

export const accountController = new AccountController();
