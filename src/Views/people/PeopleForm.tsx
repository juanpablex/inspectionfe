import React, { useState } from "react";
//import toBase64 from "../toBase64";
import { People } from "../../types/people";
import { useFetchPersonTypes } from '../../hooks/PersonTypesHooks';
import { PersonTypes } from '../../types/personTypes';
import Select from "../../components/Select";
import PersonTypeModal from "../../modals/PersonTypeModal";

type Args = {
  entity: People;
  submitted: (entity: People) => void;
  parent: string | null
};

const PeopleForm = ({ entity, submitted , parent}: Args) => {
  const [entityState, setEntityState] = useState({ ...entity });
 // const [selectedState,setSelectedState]=useState('');
  const {data: dataType} = useFetchPersonTypes();
  const[getId/*,setGetId*/]=useState<(item: PersonTypes)=>number>(()=>(item: { id: number; })=>item.id);
  const[idTypeState/*,setIdTypeState*/]=useState(0);
  console.log("datatype: ", dataType);
const [selectedValue,setSelectedValue]=useState<string | number | "">("");
const [showModal, setShowModal]=useState<boolean>(false);
const toggleModal=(): void=>{
  setShowModal(!showModal);
  console.log("modal",showModal);
}




  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    entityState.modal=parent;
    submitted(entityState);
    console.log("state: ", entityState);
  };

const handleChange=(value: any)=>{
  const parsedValue = value ? value: "";
  setSelectedValue(parsedValue);
  const id = parsedValue;
  setEntityState({...entityState,personTypeId:id});
  console.log("entityState: ",entityState);
  console.log("idTYpeState: ",idTypeState);
}



  // const onFileSelected = async (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ): Promise<void> => {
  //   e.preventDefault();
  //   e.target.files &&
  //     e.target.files[0] &&
  //     setEntityState({
  //       ...entityState,
  //      // photo: await toBase64(e.target.files[0]),
  //     });
  // };

  return (
    <form className="mt-2">
      <div className="form-group">
        <label htmlFor="address">Ci</label>
        {entityState!=null?
         <input
         type="text"
         className="form-control"
         placeholder="Ci"
         value={entityState.ci}
         onChange={(e) =>
            setEntityState({ ...entityState, ci: e.target.value })
         }
       />
        :
        null}
       
      </div>
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
      <div className="form-group mt-2" >
      <label htmlFor="country">Tipo de Persona</label>
   
      <div style={{display:'flex',flexDirection:'row'}}>
      <Select
            data={dataType}
            value={selectedValue}
            optionLabel= {new Array("name")}
            //optionLabel2=""
            onChange={handleChange}
            getId={getId}
          />      
           <button style={{marginLeft:'10px'}}
              type = "button"
            className="btn btn-primary mt-2"
            onClick={toggleModal}
            > Nuevo Tipo de Persona 
            </button>
     
      </div>
        
        </div>   
 
      <button
        className="btn btn-primary mt-2"
        disabled={!entityState.name}
        onClick={onSubmit}
      >
        Guardar
      </button>
      <PersonTypeModal open={showModal} onClose={toggleModal} parent={parent}>
                <div>
                    Main Content goes here!
                </div>
      </PersonTypeModal>
    </form>
  );
};

export default PeopleForm;
