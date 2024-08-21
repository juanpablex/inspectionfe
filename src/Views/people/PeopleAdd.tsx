import { useLocation } from "react-router-dom";
import { useAddPeople } from "../../hooks/PeopeHooks";
import { People } from "../../types/people";
import ValidationSummary from "../../ValidationSummary";
import PeopleForm from "./PeopleForm";

const PeopleAdd = () => {
  const addPeopleMutation = useAddPeople();
  const {search} = useLocation();
  const params = new URLSearchParams(search);
  const modal = params.get('modal');
  const people: People = {
    id:0,
    ci:"",
    name: "",
    personTypeId:0,
    lat:"",
    lon:"",
    modal:""
  };

  return (
    <>
      {addPeopleMutation.isError && (
        <ValidationSummary error={addPeopleMutation.error} />
      )}
      <PeopleForm
        entity={people}
        submitted={(people) => addPeopleMutation.mutate(people)}
        parent = {modal}
      />
    </>
  );
};

export default PeopleAdd;
