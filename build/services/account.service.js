var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { accountModel } from "../models/account.model.js";
import { decrypt } from "../utils/crypto.util.js";
import { generateAccountNumber } from "../utils/finance.util.js";
import { virtualCardService } from "./virtualCard.service.js";
class AccountService {
    createAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountNumber = generateAccountNumber();
            const account = yield accountModel.create(Object.assign(Object.assign({}, data), { accountNumber }));
            // Create a virtual card for the account
            yield virtualCardService.createVirtualCard(account._id);
            return account.populate("virtualCards");
        });
    }
    getAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return accountModel
                .find()
                .populate("virtualCards");
        });
    }
    /**
     * Returns decrypted values of all keys provided in the body
     * If an invalid encryption is found, it becomes null
     */
    getRecursiveDecryptions(obj) {
        const results = {};
        for (const prop in obj) {
            const originalValue = obj[prop];
            const decryptedValue = typeof originalValue === "string"
                ? decrypt(originalValue)
                : Array.isArray(originalValue)
                    ? originalValue.map((item) => typeof item === "string"
                        ? decrypt(item)
                        : this.getRecursiveDecryptions(item))
                    : this.getRecursiveDecryptions(originalValue);
            results[prop] = originalValue === decryptedValue ? null : decryptedValue;
        }
        return results;
    }
}
export const accountService = new AccountService();
