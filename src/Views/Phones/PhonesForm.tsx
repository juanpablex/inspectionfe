import React, {  useState } from "react";
import { Phones } from "../../types/phones";


type Args = {
  entity: Phones;
  personId: number;
  submitted: (entity: Phones) => void;
  parent:string |null
};

const PhonesForm = ({ entity,personId, submitted ,parent}: Args) => {
  const [entityState, setEntityState] = useState({ ...entity });
  if(personId === null){
    return <div>personId is null</div>
  }
 //setEntityState({ ...entityState, personId:personId})
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    entityState.modal=parent
    submitted(entityState);
    console.log("state: ", entityState);
  };

  return (
    <form className="mt-2">
      <div className="form-group">
        <label htmlFor="address">Número</label>
        {entityState!=null?
         <input
         type="text"
         className="form-control"
         placeholder="Número"
         value={entityState.number}
         onChange={(e) =>
            setEntityState({ ...entityState, number: e.target.value ,personId:personId})
           
         }
       />
        :
        null}
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={!entityState.number}
        onClick={onSubmit}
      >
        Guardar
      </button>
    </form>
  );
};

export default PhonesForm;
