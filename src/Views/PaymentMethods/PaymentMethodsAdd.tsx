import { useAddPaymentMethods } from "../../hooks/PaymentMethodsHooks";
import { PaymentMethods } from "../../types/paymentMethods";
import ValidationSummary from "../../ValidationSummary";
import PaymentMethodsForm from "./PaymentMethodsForm";

const PaymentMethodsAdd = () => {
  const addPaymentMethodsMutation = useAddPaymentMethods();

  const paymentMethods: PaymentMethods = {
    id:0,
    name: "",
    modal:""
  };

  return (
    <>
      {addPaymentMethodsMutation.isError && (
        <ValidationSummary error={addPaymentMethodsMutation.error} />
      )}
      <PaymentMethodsForm
        entity={paymentMethods}
        submitted={(paymentMethods) => addPaymentMethodsMutation.mutate(paymentMethods)}
        parent = {paymentMethods.modal}
      />
    </>
  );
};

export default PaymentMethodsAdd;
