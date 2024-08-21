import {FC, ReactElement} from 'react';
import   './Modal.css';
import ProductsShortList from '../Views/Products/ProductsShortList';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
}

// type Props<Products>={
//     getId:(item:Products)=>number;
//     onChange:(value:number)=>void;
// }

const ProductsModal: FC<ModalProps> = ({ open, onClose }): JSX.Element => {
    // const addProductsMutation = useAddProducts();

    // const products: Products = {
    //     id: 0,
    //     name: "",
    //     supplier: "",
    //     brandId: 0,
    //     colorId: 0,
    //     modelId: 0,
    //     chasis: ""
    // };
  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Escoger un Producto</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <ProductsShortList
                        // modal={false}
                        
                            />
                </div>
            </div>
        </div>
    );
};

export default ProductsModal;