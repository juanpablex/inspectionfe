import { useAddModels } from "../../hooks/ModelsHooks";
import { Models } from "../../types/models";
import ValidationSummary from "../../ValidationSummary";
import ModelsForm from "./ModelsForm";

const ModelsAdd = () => {
  const addModelsMutation = useAddModels();

  const models: Models = {
    id:0,
    name: "",
    modal:""
  };

  return (
    <>
      {addModelsMutation.isError && (
        <ValidationSummary error={addModelsMutation.error} />
      )}
      <ModelsForm
        entity={models}
        submitted={(models) => addModelsMutation.mutate(models)}
        parent = {models.modal}
      />
    </>
  );
};

export default ModelsAdd;
