import { model, Schema, Types } from "mongoose";
import { decrypt, encrypt } from "./utils/util.js";

const THREE_YEARS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 365 * 3;

export interface AccountCreation {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string | Date;
}

interface Account extends AccountCreation {
  accountNumber: string;
}

interface AccountVirtualMap {
  virtualCards: VirtualCard[];
}

export type AccountVirtual<T extends keyof AccountVirtualMap> = {
  [key in keyof AccountVirtualMap]: AccountVirtualMap[key];
};

export interface VirtualCard {
  accountId: Types.ObjectId;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const accountSchema = new Schema<Account>(
  {
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
      set: (phoneNumber: string) => encrypt(phoneNumber),
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
      set: (dateOfBirth: Date) => encrypt(dateOfBirth.toString()),
    },

    accountNumber: {
      type: String,
      required: [true, "Account number is required"],
      unique: [true, "Account number already exists"],
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

const virtualCardSchema = new Schema<VirtualCard>(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Account ID is required"],
    },
    cardNumber: {
      type: String,
      required: [true, "Card number is required"],
      set: (cardNumber: string) => encrypt(cardNumber),
    },
    expiryDate: {
      type: String,
      required: [true, "Expiry date is required"],
      default: new Date(Date.now() + THREE_YEARS_IN_MILLISECONDS).toString(),
      set: (expiryDate: unknown) =>
        encrypt(new Date(expiryDate as string).toString()),
    },
    cvv: {
      type: String,
      required: [true, "CVV is required"],
      min: [3, "CVV must be 3 digits"],
      max: [3, "CVV must be 3 digits"],
      set: (cvv: string) => encrypt(cvv),
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

// Decrypt encrypted fields using virtuals
virtualCardSchema.virtual("cardNumberDecrypted").get(function () {
  return decrypt(this.cardNumber);
});

virtualCardSchema.virtual("expiryDateDecrypted").get(function () {
  return new Date(decrypt(this.expiryDate));
});

virtualCardSchema.virtual("cvvDecrypted").get(function () {
  return decrypt(this.cvv);
});

export const virtualCardModel = model("VirtualCard", virtualCardSchema);

// Decrypt encrypted fields using virtuals
accountSchema.virtual("phoneNumberDecrypted").get(function () {
  return decrypt(this.phoneNumber);
});

accountSchema.virtual("dateOfBirthDecrypted").get(function () {
  return new Date(decrypt(this.dateOfBirth as string));
});

accountSchema.virtual("virtualCards", {
  ref: "VirtualCard",
  localField: "_id",
  foreignField: "accountId",
});

export const accountModel = model("Account", accountSchema);
