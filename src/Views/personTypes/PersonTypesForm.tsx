import React, { useState } from "react";
//import toBase64 from "../toBase64";
import { PersonTypes } from "../../types/personTypes";

type Args = {
  personTypes: PersonTypes;
  submitted: (personTypes: PersonTypes) => void;
  parent:string |null
};

const PersonTypesForm = ({ personTypes, submitted ,parent}: Args) => {
  const [personTypeState, setPersonTypeState] = useState({ ...personTypes });
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    personTypeState.modal=parent
    submitted(personTypeState);
   
    //console.log("state: ", personTypeState);
  };

  // const onFileSelected = async (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ): Promise<void> => {
  //   e.preventDefault();
  //   e.target.files &&
  //     e.target.files[0] &&
  //     setPersonTypeState({
  //       ...personTypeState,
  //      // photo: await toBase64(e.target.files[0]),
  //     });
  // };

  return (
    <div className="mt-2">
      <div className="form-group">
        <label htmlFor="address">Nombre</label>
        {personTypeState!=null?
         <input
         type="text"
         className="form-control"
         placeholder="Nombre"
         value={personTypeState.name}
         onChange={(e) =>
           setPersonTypeState({ ...personTypeState, name: e.target.value })
         }
       />
        :
        null}
       
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Description</label>
        {personTypeState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Descripción"
         value={personTypeState.description}
         onChange={(e) =>
           setPersonTypeState({ ...personTypeState, description: e.target.value })
         }
       />
        : 
        null}
       
      </div>
      
      
      {/* <div className="form-group mt-2">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          className="form-control"
          onChange={onFileSelected}
        />
      </div> */}
      {/* <div className="mt-2">
        <img src={personTypeState.photo}></img>
      </div> */}
      <button
        className="btn btn-primary mt-2"
        disabled={!personTypeState.name}
        onClick={onSubmit}
      >
        Guardar
      </button>
    </div>
  );
};

export default PersonTypesForm;
