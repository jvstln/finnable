import { accountModel } from "../models/account.model";
import { AccountCreation, AccountVirtual } from "../types/account.type";
import { generateAccountNumber } from "../utils/finance.util";
import { virtualCardService } from "./virtualCard.service";

class AccountService {
  async createAccount(data: AccountCreation) {
    const accountNumber = generateAccountNumber();
    const account = await accountModel.create({
      ...data,
      accountNumber,
    });

    // Create a virtual card for the account
    await virtualCardService.createVirtualCard(account._id);

    return account.populate<AccountVirtual<"virtualCards">>("virtualCards");
  }

  async getAllAccounts() {
    return accountModel
      .find()
      .populate<AccountVirtual<"virtualCards">>("virtualCards");
  }
}

export const accountService = new AccountService();
