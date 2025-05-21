import { model, Schema } from "mongoose";
import { VirtualCard } from "../types/virtualCard.type";

const THREE_YEARS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 365 * 3;

const virtualCardSchema = new Schema<VirtualCard>({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "Account ID is required"],
  },
  cardNumber: {
    type: String,
    required: [true, "Card number is required"],
  },
  expiryDate: {
    type: Date,
    required: [true, "Expiry date is required"],
    default: Date.now() + THREE_YEARS_IN_MILLISECONDS,
  },
  cvv: {
    type: String,
    required: [true, "CVV is required"],
    min: [3, "CVV must be 3 digits"],
    max: [3, "CVV must be 3 digits"],
  },
});

export const virtualCardModel = model("VirtualCard", virtualCardSchema);
