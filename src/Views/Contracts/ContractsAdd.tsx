import { useLocation } from "react-router-dom";
import { useAddContracts } from "../../hooks/ContractsHooks";
import { Contracts } from "../../types/contracts";
import ValidationSummary from "../../ValidationSummary";
import ContractsForm from "./ContractsForm";

const ContractsAdd = () => {
  const addContractsMutation = useAddContracts();
  const {search} = useLocation();
  const params = new URLSearchParams(search);
  const modal = params.get('modal');
  const contracts: Contracts = {
    id: 0,
    saleDate:new Date(),
    number: 0,
    totalEffectivePayment: 0,
    effectiveInitialPayment:0,
    deferredInitialPayment:0,
    deferredInitialPaymentTime:0,
    quantity:0,
    creditSalesTerm:0,
    statedPriceCharged:0,
    totalSalesAmount:0,
    netAmount:0,
    baseAmountForCommission:0,
    paymentMethodId:0,
    stateId:0,
    commission:0,
    rangeId:0,
    authsAndObservations:"",
    clientId:0,
    garante:"",
    garantePhone:"",
    productId:0,
    productoId:0,
    promocion:"",
    modal : ""
  };

  return (
    <>
      {addContractsMutation.isError && (
        <ValidationSummary error={addContractsMutation.error} />
      )}
      <ContractsForm
        entity={contracts}
        submitted={(contracts) => addContractsMutation.mutate(contracts)}
        parent={modal}
      />
    </>
  );
};

export default ContractsAdd;
