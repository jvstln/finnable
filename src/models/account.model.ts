import { model, Schema } from "mongoose";
import { Account } from "../types/account.type";

const accountSchema = new Schema<Account>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: [true, "Phone number must be unique"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },

  accountNumber: {
    type: String,
    required: [true, "Account number is required"],
    unique: [true, "Account number must be unique"],
  },
});

export const accountModel = model("Account", accountSchema);
