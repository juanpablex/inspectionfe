import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddModels } from '../hooks/ModelsHooks';
import { Models } from '../types/models';
import ModelsForm from '../Views/Models/ModelsForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent:string | null
}



const ModelsModal: FC<ModalProps> = ({ open, onClose ,parent}): JSX.Element => {
    const addModelsMutation = useAddModels();

    const models: Models = {
      id:0,
      name: "",
      modal : parent
    };
  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Modelo</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <ModelsForm
                        entity={models}
                        submitted={(models) => {addModelsMutation.mutate(models);onClose()}}     
                        parent = {parent}              />
                </div>
            </div>
        </div>
    );
};

export default ModelsModal;