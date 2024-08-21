import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchColor, useUpdateColors } from "../../hooks/ColorsHooks";
import ValidationSummary from "../../ValidationSummary";
import ColorsForm from "./ColorsForm";

const ColorsEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a color id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchColor(entityId);
  const updateEntityMutation = useUpdateColors();

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <ColorsForm
        entity={data}
        submitted={(color) => {
          updateEntityMutation.mutate(color);
        } } parent={null}      />
    </>
  );
};

export default ColorsEdit;
