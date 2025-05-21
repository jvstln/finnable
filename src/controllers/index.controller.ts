import { Request, Response } from "express";
import { decrypt } from "../utils/crypto.util";

interface RecursiveRecord {
  [key: string]: string | RecursiveRecord;
}

class IndexController {
  /**
   * Returns decrypted values of all keys provided in the body
   * If an invalid encryption is found, it becomes null
   */
  async getDecryptions(req: Request, res: Response) {
    res.json({
      sucess: true,
      message: "Encrypted values parsed successfully",
      data: this.getRecursiveDecryptions(req.body),
    });
  }

  private getRecursiveDecryptions(obj: RecursiveRecord) {
    const results: Record<string, unknown> = {};

    for (const prop in obj) {
      const originalValue = obj[prop];
      const decryptedValue =
        typeof originalValue === "string"
          ? decrypt(originalValue)
          : Array.isArray(originalValue)
          ? originalValue.map((item) =>
              typeof item === "string"
                ? decrypt(item)
                : this.getRecursiveDecryptions(item)
            )
          : this.getRecursiveDecryptions(originalValue);
      results[prop] = originalValue === decryptedValue ? null : decryptedValue;
    }

    return results;
  }
}

export const indexController = new IndexController();
