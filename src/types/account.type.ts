import { VirtualCard } from "./virtualCard.type";

export interface AccountCreation {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
}

export interface Account extends AccountCreation {
  accountNumber: string;
}

interface VirtualCardVirtualMap {
  virtualCards: VirtualCard[];
}

export type AccountVirtual<T extends keyof VirtualCardVirtualMap> = {
  [key in T]: VirtualCardVirtualMap[key];
};
