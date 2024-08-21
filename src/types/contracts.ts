export type Contracts = {
    id: number;
    saleDate:Date;
    number: number;
    totalEffectivePayment: number;
    effectiveInitialPayment:number;
    deferredInitialPayment:number;
    deferredInitialPaymentTime:number;
    quantity:number;
    creditSalesTerm:number;
    statedPriceCharged:number;
    totalSalesAmount:number;
    netAmount:number;
    baseAmountForCommission:number;
    paymentMethodId:number;
    stateId:number;
    commission:number;
    rangeId:number;
    authsAndObservations:string;
    clientId:number;
    garante:string;
    garantePhone:string;
    productId:number;
    productoId:number;
    promocion:string;
    modal : string | null
}