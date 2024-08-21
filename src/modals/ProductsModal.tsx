import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddProducts } from '../hooks/ProductsHooks';
import { Products } from '../types/products';
import ProductsForm from '../Views/Products/ProductsForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent: string | null
}



const ProductsModal: FC<ModalProps> = ({ open, onClose, parent }): JSX.Element => {
    const addProductsMutation = useAddProducts();

    const products: Products = {
        id: 0,
        name: "",
        supplier: "",
        brandId: 0,
        colorId: 0,
        modelId: 0,
        chasis: "",
        modal: parent
    };
  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Producto</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <ProductsForm
                        entity ={products}
                        submitted={(products) => {addProductsMutation.mutate(products);onClose()}}      
                        parent = {parent}             />
                </div>
            </div>
        </div>
    );
};

export default ProductsModal;