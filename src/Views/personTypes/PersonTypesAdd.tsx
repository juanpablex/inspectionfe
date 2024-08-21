
import { useAddPersonTypes } from "../../hooks/PersonTypesHooks";
import { PersonTypes } from "../../types/personTypes";
import ValidationSummary from "../../ValidationSummary";
import PersonTypesForm from "./PersonTypesForm";

const PersonTypesAdd = () => {
  const addPersonTypesMutation = useAddPersonTypes();
  const personTypes: PersonTypes = {
    id:0,
    name: "",
    description: "",
    modal: ""
  };

  return (
    <>
      {addPersonTypesMutation.isError && (
        <ValidationSummary error={addPersonTypesMutation.error} />
      )}
      <PersonTypesForm
        personTypes={personTypes}
        submitted={(personTypes) => addPersonTypesMutation.mutate(personTypes)}   
        parent ={personTypes.modal}   />
    </>
  );
};

export default PersonTypesAdd;
