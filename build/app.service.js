import { accountModel, virtualCardModel, } from "./app.model.js";
import { decrypt, generateAccountNumber, generateCardNumber, generateCVV, } from "./utils/util.js";
export async function createVirtualCard(accountId) {
    await virtualCardModel.create({
        accountId,
        cardNumber: generateCardNumber(),
        cvv: generateCVV(),
    });
}
export async function createAccount(data) {
    const accountNumber = generateAccountNumber();
    const account = await accountModel.create({
        ...data,
        accountNumber,
    });
    // Create a virtual card for the account
    await createVirtualCard(account._id);
    return account.populate("virtualCards");
}
export async function getAllAccounts() {
    return accountModel
        .find()
        .populate("virtualCards");
}
/**
 * Returns decrypted values of all keys provided in the body
 * If an invalid encryption is found, it becomes null
 */
export async function getRecursiveDecryptions(obj) {
    const results = {};
    for (const prop in obj) {
        const originalValue = obj[prop];
        const decryptedValue = typeof originalValue === "string"
            ? decrypt(originalValue)
            : Array.isArray(originalValue)
                ? originalValue.map((item) => typeof item === "string"
                    ? decrypt(item)
                    : getRecursiveDecryptions(item))
                : getRecursiveDecryptions(originalValue);
        results[prop] = originalValue === decryptedValue ? null : decryptedValue;
    }
    return results;
}
