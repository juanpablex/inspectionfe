import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddRanges } from '../hooks/RangesHooks';
import { Ranges } from '../types/ranges';
import RangesForm from '../Views/Ranges/RangesForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement
    parent: string |null
}



const RangesModal: FC<ModalProps> = ({ open, onClose ,parent}): JSX.Element => {
    const addRangesMutation = useAddRanges();

    const ranges: Ranges = {
      id:0,
      name: "",
      modal : parent
    };
  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Rango</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <RangesForm
                        entity={ranges}
                        submitted={(ranges) => {addRangesMutation.mutate(ranges);onClose()}}       
                        parent={parent}            />
                </div>
            </div>
        </div>
    );
};

export default RangesModal;