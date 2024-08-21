import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddColors } from '../hooks/ColorsHooks';
import { Colors } from '../types/colors';
import ColorsForm from '../Views/Colors/ColorsForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent:string | null
}



const ColorsModal: FC<ModalProps> = ({ open, onClose ,parent}): JSX.Element => {
    const addColorsMutation = useAddColors();

    const colors: Colors = {
      id:0,
      name: "",
      modal : parent
    };
   //console.log("modal color: ", open);
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Color</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <ColorsForm
                        entity={colors}
                        submitted={(colors) => {addColorsMutation.mutate(colors);onClose();}}      
                        parent= {parent}             />
                </div>
            </div>
        </div>
    );
};

export default ColorsModal;