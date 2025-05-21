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
}

export const accountController = new AccountController();
