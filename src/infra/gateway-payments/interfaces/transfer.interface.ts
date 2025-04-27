export enum pixAddressKeyType {
  EVP = 'EVP',
  CPF = 'CPF',
  CNPJ = 'CNPJ',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

interface Bank {
  code: string;
  name: string;
  ispb: string;
}

interface BankAccount {
  bank: Bank;
  accountName: string | null;
  ownerName: string;
  cpfCnpj: string;
  type: string;
  agency: string;
  agencyDigit: string | null;
  account: string;
  accountDigit: string;
  pixAddressKey: string;
}

export interface Transfer {
  object: string;
  id: string;
  value: number;
  netValue: number;
  transferFee: number;
  dateCreated: string;
  status: string;
  effectiveDate: string | null;
  confirmedDate: string | null;
  endToEndIdentifier: string | null;
  transactionReceiptUrl: string | null;
  operationType: string;
  failReason: string | null;
  walletId: string | null;
  description: string;
  canBeCancelled: boolean;
  externalReference: string | null;
  authorized: boolean;
  scheduleDate: string;
  type: string;
  bankAccount: BankAccount;
  recurring: any;
}
