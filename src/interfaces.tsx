export interface IMerchantInvoice {
    id: string | number;
    merchantName: string;
    itemName: string;
    amountCharged: string | number;
    purchaseCurrency: string;
    defiValueToFiat: string | number;
    amountOwed: string | number;    
  }

  
export interface IBitPayCurencyObj {
  code: string;
  name: string;
  rate: number | string;
}