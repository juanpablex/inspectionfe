import React, { useState } from "react";
import { Models } from "../../types/models";

type Args = {
  entity: Models;
  submitted: (entity: Models) => void;
  parent: string | null
};

const ModelsForm = ({ entity, submitted, parent }: Args) => {
  const [entityState, setEntityState] = useState({ ...entity });
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    entityState.modal=parent
    submitted(entityState);
    console.log("state: ", entityState);
  };

  return (
    <form className="mt-2">
      <div className="form-group mt-2">
        <label htmlFor="country">Nombre</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Nombre"
         value={entityState.name}
         onChange={(e) =>
            setEntityState({ ...entityState, name: e.target.value })
         }
       />
        : 
        null}
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={!entityState.name}
        onClick={onSubmit}
      >
        Guardar
      </button>
    </form>
  );
};

export default ModelsForm;
