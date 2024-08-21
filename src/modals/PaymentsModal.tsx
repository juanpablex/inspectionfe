import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddPaymentMethods } from '../hooks/PaymentMethodsHooks';
import { PaymentMethods } from '../types/paymentMethods';
import PaymentMethodsForm from '../Views/PaymentMethods/PaymentMethodsForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent: string | null
}



const PaymentsModal: FC<ModalProps> = ({ open, onClose , parent}): JSX.Element => {
    const addPaymentMethodsMutation = useAddPaymentMethods();

    const paymentMethods: PaymentMethods = {
      id:0,
      name: "",
      modal : parent
    };
  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Métodos de Pago</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <PaymentMethodsForm
                        entity={paymentMethods}
                        submitted={(paymentMethods) => {addPaymentMethodsMutation.mutate(paymentMethods);onClose()}}  
                        parent ={parent}                 />
                </div>
            </div>
        </div>
    );
};

export default PaymentsModal;