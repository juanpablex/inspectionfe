import { useLocation } from "react-router-dom";
import { useAddPhones } from "../../hooks/PhonesHooks";
import { Phones } from "../../types/phones";
import ValidationSummary from "../../ValidationSummary";
import PhonesForm from "./PhonesForm";

const PhonesAdd = () => {
  const addPhoneMutation = useAddPhones();
  const {search} = useLocation();
  const params = new URLSearchParams(search);
  const personaId = params.get('personId');
  if(personaId === null){
    return <div>personId is null</div>
  }
  const phones: Phones = {
    id:0,
    number:"",
    personId:0,
    modal:""
  };

  return (
    <>
      {addPhoneMutation.isError && (
        <ValidationSummary error={addPhoneMutation.error} />
      )}
      
      
      <PhonesForm
        entity={phones}
        personId={parseInt(personaId)}
        submitted={(phones) => addPhoneMutation.mutate(phones)}
        parent={phones.modal}
      />
    </>
  );
};

export default PhonesAdd;
