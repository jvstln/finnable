var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { accountService } from "../services/account.service.js";
class AccountController {
    createAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdAccount = yield accountService.createAccount(req.body);
            res.status(201).json({
                success: true,
                message: "Account created successfully",
                data: createdAccount,
            });
        });
    }
    getAllAccounts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = yield accountService.getAllAccounts();
            res.status(200).json({
                success: true,
                message: "Accounts retrieved successfully",
                data: accounts,
            });
        });
    }
    getDecryptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({
                sucess: true,
                message: "Encrypted values parsed successfully",
                data: accountService.getRecursiveDecryptions(req.body),
            });
        });
    }
}
export const accountController = new AccountController();
