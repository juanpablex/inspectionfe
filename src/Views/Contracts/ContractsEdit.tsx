import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchContract, useUpdateContracts } from "../../hooks/ContractsHooks";
import ValidationSummary from "../../ValidationSummary";
import ContractsForm from "./ContractsForm";

const ContractsEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a contracts id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchContract(entityId);
  const updateEntityMutation = useUpdateContracts();

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <ContractsForm
        entity={data}
        submitted={(contract) => {
          updateEntityMutation.mutate(contract);
        } } parent={null}      />
    </>
  );
};

export default ContractsEdit;
