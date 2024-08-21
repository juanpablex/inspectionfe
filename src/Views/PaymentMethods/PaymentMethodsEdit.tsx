import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchPaymentMethod, useUpdatePaymentMethods } from "../../hooks/PaymentMethodsHooks";
import ValidationSummary from "../../ValidationSummary";
import PaymentMethodsForm from "./PaymentMethodsForm";

const PaymentMethodsEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a paymentMethod id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchPaymentMethod(entityId);
  const updateEntityMutation = useUpdatePaymentMethods();

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <PaymentMethodsForm
        entity={data}
        submitted={(paymentMethod) => {
          updateEntityMutation.mutate(paymentMethod);
        } } parent={null}      />
    </>
  );
};

export default PaymentMethodsEdit;
