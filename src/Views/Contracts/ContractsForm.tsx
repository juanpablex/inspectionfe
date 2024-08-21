import React, {  useState } from "react";
import { Contracts } from "../../types/contracts";
import { useFetchPaymentMethods } from '../../hooks/PaymentMethodsHooks';
import { useFetchStates } from '../../hooks/StatesHooks';
import { useFetchPeople } from '../../hooks/PeopeHooks';
import { useFetchRanges} from '../../hooks/RangesHooks';
import { useFetchProducts } from '../../hooks/ProductsHooks';
import { PaymentMethods } from '../../types/paymentMethods';
import {  States} from '../../types/states';
import { People } from '../../types/people';
import { Ranges } from '../../types/ranges';
import Select from "../../components/Select";
import ProductsModal from "../../modals/ProductsModal";
import PeopleModal from "../../modals/PeopleModal";
import StatesModal from "../../modals/StatesModal";
import RangesModal from "../../modals/RangesModal";
import PaymentsModal from "../../modals/PaymentsModal";
import { useFetchBrands } from "../../hooks/BrandsHooks";
import { useFetchColors } from "../../hooks/ColorsHooks";
import { useFetchModels } from "../../hooks/ModelsHooks";


type Args = {
  entity: Contracts;
  submitted: (entity: Contracts) => void;
  parent: string | null
};

const ContractsForm = ({ entity, submitted ,parent}: Args) => {
  const [entityState, setEntityState] = useState({ ...entity });
  const {data: dataMethod/*, status:statusMethod,isSuccess:isSuccessMethod*/} = useFetchPaymentMethods();
  const {data: dataPeople/*, status:statusPeople,isSuccess:isSuccessPeople*/} = useFetchPeople();
  const {data: dataRanges/*, status:statusRanges,isSuccess:isSuccessRanges*/} = useFetchRanges();
  const {data: dataProducts/*, status:statusProducts,isSuccess:isSuccessProducts*/} = useFetchProducts();
  const {data: dataStates/*, status:statusStates,isSuccess:isSuccessStates*/} = useFetchStates();

  const {data: dataBrands/*, status:statusBrand,isSuccess:isSuccessBrand*/} = useFetchBrands();
  const {data: dataColors/*, status:statusColor,isSuccess:isSuccessColor*/} = useFetchColors();
  const {data: dataModels/*, status:statusModel,isSuccess:isSuccessModel*/} = useFetchModels();

  const[getMethodId/*,setGetMethodId*/]=useState<(item: PaymentMethods)=>number>(()=>(item: { id: number; })=>item.id);
  const[getPeopleId/*,setGetPeopleMethodId*/]=useState<(item: People)=>number>(()=>(item: { id: number; })=>item.id);
  const[getRangeId/*,setGetRangeId*/]=useState<(item: Ranges)=>number>(()=>(item: { id: number; })=>item.id);
 // const[getProductId,setGetProductId]=useState<(item: Products)=>number>(()=>(item: { id: number; })=>item.id);
  const[getStateId/*,setGetStateId*/]=useState<(item: States)=>number>(()=>(item: { id: number; })=>item.id);



console.log("peoples Ids: ", getPeopleId);

  // const[idMethodState,setIdMethodState]=useState(0);
  // const[idPeopleState,setIdPeopleState]=useState(0);
  // const[idRangeState,setIdRangeState]=useState(0);
  // const[idProductState,setIdProductState]=useState(0);
  // const[idStateState,setIdStateState]=useState(0);



  //console.log("datatype: ", dataType);
const [selectedValueMethod,setSelectedValueMethod]=useState<string | number | "">("");
const [selectedValuePeople,setSelectedValuePeople]=useState<string | number | "">("");
const [selectedValueRange,setSelectedValueRange]=useState<string | number | "">("");
const [selectedValueProduct/*,setSelectedValueProduct*/]=useState<string | number | "">("");
const [selectedValueState,setSelectedValueState]=useState<string | number | "">("");

const [showModalPeople, setShowModalPeople]=useState<boolean>(false);
const toggleModalPeople=(): void=>{
  setShowModalPeople(!showModalPeople);
  console.log("modal",showModalPeople);
}

const [showModalProduct, setShowModalProduct]=useState<boolean>(false);
const toggleModalProduct=(): void=>{
  setShowModalProduct(!showModalProduct);
  //console.log("modal",showModalPeople);
}

//const [showChooseProductModal, setShowChooseProductModal]=useState<boolean>(false);
// const toogleModalChooseProduct=(): void=>{
//   setShowChooseProductModal(!showChooseProductModal);
// }

const [showModalMethod, setShowModalMethod]=useState<boolean>(false);
const toggleModalMethod=(): void=>{
  setShowModalMethod(!showModalMethod);
  //console.log("modal",showModalPeople);
}

const [showModalState, setShowModalState]=useState<boolean>(false);
const toggleModalState=(): void=>{
  setShowModalState(!showModalState);
  //console.log("modal",showModalPeople);
}

const [showModalRange, setShowModalRange]=useState<boolean>(false);
const toggleModalRange=(): void=>{
  setShowModalRange(!showModalRange);
  //console.log("modal",showModalPeople);
}

const getProducts=(id: any)=>{
  const entity: string[] = [];
  dataProducts?.forEach((element: { id: any; name: string; }) => {
      if(element.id == id){
          entity.push(element.name);
      }
  }); 
  return entity[0];
}

const getChasis=(id: any)=>{
  const entity: string[] = [];
  dataProducts?.forEach((element: { id: any; chasis: string;}) => {
      if(element.id == id){
          entity.push(element.chasis);
      }
  }); 
  return entity[0];
}

const getBrands=(id: any)=>{
  const entity: string[] = [];
  var idBrand = dataProducts?.find((element)=> element.id == id)?.brandId;
  dataBrands?.forEach((element: { id: any; name: string; }) => {
      if(element.id == idBrand){
          entity.push(element.name);
      }
  }); 
  return entity[0];
}

const getColors=(id: any)=>{
  const entity: string[] = [];
  var idColor = dataProducts?.find((element)=> element.id == id)?.colorId;
  dataColors?.forEach((element: { id: any; name: string; }) => {
      if(element.id == idColor){
          entity.push(element.name);
      }
  }); 
  return entity[0];
}

const getModels=(id: any)=>{
  const entity: string[] = [];
  var idModel = dataProducts?.find((element)=> element.id == id)?.modelId;
  dataModels?.forEach((element: { id: any; name: string; }) => {
      if(element.id == idModel){
          entity.push(element.name);
      }
  }); 
  return entity[0];
}





  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    entityState.modal=parent;
    submitted(entityState);
    console.log("state: ", entityState);
  };

const handleChangeMethod=(value: any)=>{
  const parsedValue = value ? value: "";
  setSelectedValueMethod(parsedValue);
  const id = parsedValue;
  setEntityState({...entityState,paymentMethodId:id});
  
}

const handleChangePeople=(value: any)=>{
    const parsedValue = value ? value: "";
    setSelectedValuePeople(parsedValue);
    const id = parsedValue;
    setEntityState({...entityState,clientId:id});
    
  }

  const handleChangeRange=(value: any)=>{
    const parsedValue = value ? value: "";
    setSelectedValueRange(parsedValue);
    const id = parsedValue;
    setEntityState({...entityState,rangeId:id});
    
  }

  // const handleChangeProduct=(value: any)=>{
  //   const parsedValue = value ? value: "";
  //   setSelectedValueProduct(parsedValue);
  //   const id = parsedValue;
  //   setEntityState({...entityState,productId:id});
    
  // }

  const handleChangeState=(value: any)=>{
    const parsedValue = value ? value: "";
    setSelectedValueState(parsedValue);
    const id = parsedValue;
    setEntityState({...entityState,stateId:id});
    
  }


  return (
    <form className="mt-2">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      <div className="form-group">
        <label htmlFor="address">Fecha de Venta</label>
        {entityState!=null?
         <input
         type="text"
         className="form-control"
         placeholder="Fecha de Venta"
         value={entityState.saleDate.toString()}
         onChange={(e) =>
            setEntityState({ ...entityState, saleDate: new Date(e.target.value) })
         }
       />
        :
        null}
       
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Número Contrato</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Número Contrato"
         value={entityState.number}
         onChange={(e) =>
            setEntityState({ ...entityState, number: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>

      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Persona</label>
      
          <div style={{display:'flex',flexDirection:'row'}}>
            <Select
                  data={dataPeople}
                  value={selectedValuePeople}
                  optionLabel={new Array("ci","name")}
                  onChange={handleChangePeople}
                  getId={getPeopleId}
            />      
                <button style={{marginLeft:'10px'}}
                    type = "button"
                  className="btn btn-primary mt-2"
                  onClick={toggleModalPeople}
                  > Nueva Persona
                  </button>
        
          </div>
          
        </div>   
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Garante</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Garante"
         value={entityState.garante}
         onChange={(e) =>
            setEntityState({ ...entityState, garante: e.target.value })
         }
       />
        : 
        null}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Celulares Garante</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Celulares Garante"
         value={entityState.garantePhone}
         onChange={(e) =>
            setEntityState({ ...entityState, garantePhone: e.target.value })
         }
       />
        : 
        null}
      </div>

      <div className="form-group mt-2" >
      <label htmlFor="country">Producto</label>
      <div style={{display:'flex',flexDirection:'row'}}>
      {/* <Select
            data={dataProducts}
            value={selectedValueProduct}
            optionLabel={new Array("name")}
            onChange={handleChangeProduct}
            getId={getProductId}
          />       */}
            {/* <button  style={{marginLeft:'10px'}}
              type = "button"
            className="btn btn-primary mt-2"
            onClick={toogleModalChooseProduct}
            >Buscar un Producto 
            < i className="fas fa-search" style={{marginLeft:'10px'}}></i>
            </button> */}
           <button style={{marginLeft:'10px'}}
              type = "button"
            className="btn btn-primary mt-2"
            onClick={toggleModalProduct}
            > Nuevo Producto
            </button>
     
      </div>
        
        </div>   

      <div style={{marginLeft:"40px"}}>
        {selectedValueProduct?
        <>
            <div className="form-group mt-2">
              <label htmlFor="country">Producto</label>
              {selectedValueProduct!=null? 
              <input
              readOnly
              type="text"
              className="form-control"
              value={getProducts(selectedValueProduct)}
            />
              : 
              null}
            </div>

            <div className="form-group mt-2">
              <label htmlFor="country">Marca</label>
              {selectedValueProduct!=null? 
              <input
              readOnly
              type="text"
              className="form-control"
              value={getBrands(selectedValueProduct)}
            />
              : 
              null}
            </div>

            <div className="form-group mt-2">
              <label htmlFor="country">Color</label>
              {selectedValueProduct!=null? 
              <input
              readOnly
              type="text"
              className="form-control"
              value={getColors(selectedValueProduct)}
            />
              : 
              null}
            </div>

            <div className="form-group mt-2">
              <label htmlFor="country">Modelo</label>
              {selectedValueProduct!=null? 
              <input
              readOnly
              type="text"
              className="form-control"
              value={getModels(selectedValueProduct)}
            />
              : 
              null}
            </div>

            <div className="form-group mt-2">
              <label htmlFor="country">Chasis</label>
              {selectedValueProduct!=null? 
              <input
              readOnly
              type="text"
              className="form-control"
              value={getChasis(selectedValueProduct)}
            />
              : 
              null}
            </div>
        </>
        :
          null
        }
       
      </div>   
       

      <div className="form-group mt-2">
        <label htmlFor="country">Total Cuota Inicial</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Total Cuota Inicial"
         value={entityState.totalEffectivePayment}
         onChange={(e) =>
            setEntityState({ ...entityState, totalEffectivePayment: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Cuota Total Efectiva</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Cuota Total Efectiva"
         value={entityState.effectiveInitialPayment}
         onChange={(e) =>
            setEntityState({ ...entityState, effectiveInitialPayment: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Cuota Total Diferida</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Cuota Total Diferida"
         value={entityState.deferredInitialPayment}
         onChange={(e) =>
            setEntityState({ ...entityState, deferredInitialPayment: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Tiempo de Cuota Inicial Diferida</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Tiempo de Cuoto Inicial Diferida"
         value={entityState.deferredInitialPaymentTime}
         onChange={(e) =>
            setEntityState({ ...entityState, deferredInitialPaymentTime: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Cantidad</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Cantidad"
         value={entityState.quantity}
         onChange={(e) =>
            setEntityState({ ...entityState, quantity: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Plazo de Ventas a Crédito</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Plazo de Ventas a Crédito"
         value={entityState.creditSalesTerm}
         onChange={(e) =>
            setEntityState({ ...entityState, creditSalesTerm: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Precio Cobrado Emplacado</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Precio Cobrado Emplacado"
         value={entityState.statedPriceCharged}
         onChange={(e) =>
            setEntityState({ ...entityState, statedPriceCharged: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Importe Total de Ventas</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Importe Total de Ventas"
         value={entityState.totalSalesAmount}
         onChange={(e) =>
            setEntityState({ ...entityState, totalSalesAmount: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Cantidad Neta</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Cantidad Neta"
         value={entityState.netAmount}
         onChange={(e) =>
            setEntityState({ ...entityState, netAmount: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Importe Base para Comisión</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Importe Base para Comisión"
         value={entityState.baseAmountForCommission}
         onChange={(e) =>
            setEntityState({ ...entityState, baseAmountForCommission: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>

      <div className="form-group mt-2" >
      <label htmlFor="country">Modalidad de Pago</label>
      <div style={{display:'flex',flexDirection:'row'}}>
      <Select
            data={dataMethod}
            value={selectedValueMethod}
            optionLabel={new Array("name")}
            onChange={handleChangeMethod}
            getId={getMethodId}
          />      
           <button style={{marginLeft:'10px'}}
              type = "button"
            className="btn btn-primary mt-2"
            onClick={toggleModalMethod}
            > Nueva Modalidad de Pago
            </button>
     
      </div>
        
        </div>   

        <div className="form-group mt-2" >
      <label htmlFor="country">Estado</label>
      <div style={{display:'flex',flexDirection:'row'}}>
      <Select
            data={dataStates}
            value={selectedValueState}
            optionLabel={new Array("name")}
            onChange={handleChangeState}
            getId={getStateId}
          />      
           <button style={{marginLeft:'10px'}}
              type = "button"
            className="btn btn-primary mt-2"
            onClick={toggleModalState}
            > Nuevo Estado
            </button>
     
      </div>
        
        </div>   

        <div className="form-group mt-2" >
      <label htmlFor="country">Rango</label>
      <div style={{display:'flex',flexDirection:'row'}}>
      <Select
            data={dataRanges}
            value={selectedValueRange}
            optionLabel={new Array("name")}
            onChange={handleChangeRange}
            getId={getRangeId}
          />      
           <button style={{marginLeft:'10px'}}
              type = "button"
            className="btn btn-primary mt-2"
            onClick={toggleModalRange}
            > Nuevo Rango
            </button>
     
      </div>
        
        </div>   

        <div className="form-group mt-2">
        <label htmlFor="country">Comisión</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Comisión"
         value={entityState.commission}
         onChange={(e) =>
            setEntityState({ ...entityState, commission: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Auth y Obs</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Auth y Obs"
         value={entityState.authsAndObservations}
         onChange={(e) =>
            setEntityState({ ...entityState, authsAndObservations: e.target.value })
         }
       />
        : 
        null}
      </div>
     
      <button
        className="btn btn-primary mt-2"
        disabled={!entityState.saleDate || !entityState.number || !entityState.totalEffectivePayment || !entityState.effectiveInitialPayment
          || !entityState.deferredInitialPayment || !entityState.deferredInitialPaymentTime || !entityState.quantity
          || !entityState.creditSalesTerm || !entityState.statedPriceCharged || !entityState.totalSalesAmount || !entityState.netAmount
          || !entityState.baseAmountForCommission || !entityState.paymentMethodId || !entityState.stateId
          || !entityState.commission || !entityState.rangeId || !entityState.clientId || !entityState.productId}
        onClick={onSubmit}
      >
        Guardar
      </button>
      <ProductsModal open={showModalProduct} onClose={toggleModalProduct} parent={parent}>
                <div>
                    Main Content goes here!
                </div>
      </ProductsModal>

      {/* <ProductChooseModal open={showChooseProductModal} onClose={toogleModalChooseProduct}  >

          <div>
            Main Content goes here!
          </div>
      </ProductChooseModal> */}

      <PeopleModal open={showModalPeople} onClose={toggleModalPeople} parent={parent}>
                <div>
                    Main Content goes here!
                </div>
      </PeopleModal>

      <StatesModal open={showModalState} onClose={toggleModalState} parent={parent}>
                <div>
                    Main Content goes here!
                </div>
      </StatesModal>

      <RangesModal open={showModalRange} onClose={toggleModalRange} parent={parent}>
                <div>
                    Main Content goes here!
                </div>
      </RangesModal>

      <PaymentsModal open={showModalMethod} onClose={toggleModalMethod} parent={parent}>
                <div>
                    Main Content goes here!
                </div>
      </PaymentsModal>
    </form>
  );
};

export default ContractsForm;
