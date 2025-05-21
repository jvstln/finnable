import { accountModel } from "../models/account.model";
import { AccountCreation } from "../types/account.type";
import { APIError } from "../utils/error";
import { generateAccountNumber } from "../utils/finance";

class AccountService {
  async createAccount(data: AccountCreation) {
    const accountNumber = generateAccountNumber();
    const account = await accountModel.create({
      ...data,
      accountNumber,
    });

    return account;
  }
}

export const accountService = new AccountService();
