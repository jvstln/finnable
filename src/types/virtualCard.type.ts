export interface VirtualCard {
  accountId: ObjectId;
  cardNumber: string;
  expiryDate: Date;
  cvv: string;
}
