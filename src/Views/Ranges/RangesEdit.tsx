import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchRange, useUpdateRanges } from "../../hooks/RangesHooks";
import ValidationSummary from "../../ValidationSummary";
import RangesForm from "./RangesForm";

const RangesEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a range id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchRange(entityId);
  const updateEntityMutation = useUpdateRanges();

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <RangesForm
        entity={data}
        submitted={(range) => {
          updateEntityMutation.mutate(range);
        } } parent={null}      />
    </>
  );
};

export default RangesEdit;
