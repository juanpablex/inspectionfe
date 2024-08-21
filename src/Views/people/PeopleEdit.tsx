import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchPerson, useUpdatePeople } from "../../hooks/PeopeHooks";
import ValidationSummary from "../../ValidationSummary";
import PeopleForm from "./PeopleForm";

const PeopleEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a people id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchPerson(entityId);
  const updateEntityMutation = useUpdatePeople();

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <PeopleForm
        entity={data}
        submitted={(person) => {
          updateEntityMutation.mutate(person);
        } } parent={null}      />
    </>
  );
};

export default PeopleEdit;
