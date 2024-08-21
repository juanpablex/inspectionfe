import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchPhone, useUpdatePhones } from "../../hooks/PhonesHooks";
import ValidationSummary from "../../ValidationSummary";
import PhonesForm from "./PhonesForm";

const PhonesEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a people id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchPhone(entityId);
  const updateEntityMutation = useUpdatePhones();

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <PhonesForm
        entity={data}
        personId={data.personId}
        submitted={(person) => {
          updateEntityMutation.mutate(person);
        } } parent={null}      />
    </>
  );
};

export default PhonesEdit;
