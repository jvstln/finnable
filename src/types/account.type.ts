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
