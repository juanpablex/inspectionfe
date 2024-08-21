import {FC, ReactElement} from 'react';
import   './Modal.css';
import PersonTypesForm from '../Views/personTypes/PersonTypesForm';
import { PersonTypes } from '../types/personTypes';
import { useAddPersonTypes } from '../hooks/PersonTypesHooks';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent: string |null
}



const PersonTypeModal: FC<ModalProps> = ({ open, onClose ,parent}): JSX.Element => {
    const addPersonTypesMutation = useAddPersonTypes();

    const personTypes: PersonTypes = {
      id:0,
      name: "",
      description: "",
      modal : parent
    };
  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Tipo de Persona</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    {/* {children} */}
                    <PersonTypesForm
                        personTypes={personTypes}
                        submitted={(personTypes) => {addPersonTypesMutation.mutate(personTypes);onClose()}}    
                        parent ={parent}               />
                </div>
                {/* <div className="btn-container">
                    <button type="button" className="btn" onClick={onClose}>Close</button>
                </div> */}
            </div>
        </div>
    );
};

export default PersonTypeModal;