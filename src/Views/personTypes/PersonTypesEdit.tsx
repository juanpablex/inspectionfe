import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchPersonType, useUpdatePersonTypes } from "../../hooks/PersonTypesHooks";
import ValidationSummary from "../../ValidationSummary";
import PersonTypesForm from "./PersonTypesForm";

const PersonTypesEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a person type id");
  const personTypeId = parseInt(id);

  const { data, status, isSuccess } = useFetchPersonType(personTypeId);
  const updatePersonTypeMutation = useUpdatePersonTypes();

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updatePersonTypeMutation.isError && (
        <ValidationSummary error={updatePersonTypeMutation.error} />
      )}
      <PersonTypesForm
        personTypes={data}
        submitted={(personType) => {
          updatePersonTypeMutation.mutate(personType);
        } } parent={null}      />
    </>
  );
};

export default PersonTypesEdit;
