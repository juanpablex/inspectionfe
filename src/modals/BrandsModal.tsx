import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddBrands } from '../hooks/BrandsHooks';
import { Brands } from '../types/brands';
import BrandsForm from '../Views/Brands/BrandsForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent:string | null
}



const BrandsModal: FC<ModalProps> = ({ open, onClose ,parent}): JSX.Element => {
    const addBrandsMutation = useAddBrands();

    const brands: Brands = {
      id:0,
      name: "",
      modal : parent
    };
  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Marca</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <BrandsForm
                        entity={brands}
                        submitted={(brands) => {addBrandsMutation.mutate(brands);onClose();}}      
                        parent={parent}             />
                </div>
            </div>
        </div>
    );
};

export default BrandsModal;