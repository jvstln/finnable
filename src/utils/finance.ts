import { customAlphabet } from "nanoid";
const customNanoid = customAlphabet("0123456789", 10);

export function generateAccountNumber() {
  return customNanoid();
}
