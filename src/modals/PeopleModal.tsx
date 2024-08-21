import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddPeople } from '../hooks/PeopeHooks';
import { People } from '../types/people';
import PeopleForm from '../Views/people/PeopleForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent: string| null
}



const PeopleModal: FC<ModalProps> = ({ open, onClose , parent}): JSX.Element => {
    const addPeopleMutation = useAddPeople();

    const people: People = {
        id: 0,
        ci: "",
        name: "",
        personTypeId: 0,
        lat: "",
        lon: "",
        modal: parent
    };
  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Persona</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <PeopleForm
                        entity ={people}
                        submitted={(people) => {addPeopleMutation.mutate(people);onClose()}}            
                        parent ={parent}       />
                </div>
            </div>
        </div>
    );
};

export default PeopleModal;