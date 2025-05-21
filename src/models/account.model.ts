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
    unique: [true, "Email already exists"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: [true, "Phone number already exists"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },

  accountNumber: {
    type: String,
    required: [true, "Account number is required"],
    unique: [true, "Account number already exists"],
  },
});

accountSchema.virtual("virtualCards", {
  ref: "VirtualCard",
  localField: "_id",
  foreignField: "accountId",
});

export const accountModel = model("Account", accountSchema);
