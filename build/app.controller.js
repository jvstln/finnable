import * as appController from "./app.service.js";
export async function createAccount(req, res) {
    const createdAccount = await appController.createAccount(req.body);
    res.status(201).json({
        success: true,
        message: "Account created successfully",
        data: createdAccount,
    });
}
export async function getAllAccounts(_req, res) {
    const accounts = await appController.getAllAccounts();
    res.status(200).json({
        success: true,
        message: "Accounts retrieved successfully",
        data: accounts,
    });
}
export async function getDecryptions(req, res) {
    res.json({
        sucess: true,
        message: "Encrypted values parsed successfully",
        data: appController.getRecursiveDecryptions(req.body),
    });
}
