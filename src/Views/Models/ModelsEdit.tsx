import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchModel, useUpdateModels } from "../../hooks/ModelsHooks";
import ValidationSummary from "../../ValidationSummary";
import ModelsForm from "./ModelsForm";

const ModelsEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a model id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchModel(entityId);
  const updateEntityMutation = useUpdateModels();

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <ModelsForm
        entity={data}
        submitted={(model) => {
          updateEntityMutation.mutate(model);
        } } parent={null}      />
    </>
  );
};

export default ModelsEdit;
