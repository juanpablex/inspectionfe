// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import ApiStatus from "../../apiStatus";
// import  { containerStyle} from "../../config";
// import { useFetchContracts } from "../../hooks/ContractsHooks";
// import { Contracts } from "../../types/contracts";
// import { useFetchPaymentMethod } from '../../hooks/PaymentMethodsHooks';
// import { useFetchRange } from '../../hooks/RangesHooks';
// import { useFetchState } from '../../hooks/StatesHooks';
// import { useFetchProduct,useFetchProducts } from '../../hooks/ProductsHooks';

// import { useFetchBrand } from '../../hooks/BrandsHooks';
// import { useFetchColor } from '../../hooks/ColorsHooks';
// import { useFetchModel } from '../../hooks/ModelsHooks';
// import { Products } from '../../types/products';
// import { useFetchPerson } from "../../hooks/PeopeHooks";
// import { useFetchPhones } from "../../hooks/PhonesHooks";


import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ApiStatus from '../../apiStatus';
import { containerStyle } from '../../config';
import { useFetchContracts } from '../../hooks/ContractsHooks';
import { useFetchPhones } from '../../hooks/PhonesHooks';
import { useFetchProducts } from '../../hooks/ProductsHooks';


import { useFetchBrands } from '../../hooks/BrandsHooks';
import { useFetchModels } from '../../hooks/ModelsHooks';
import { useFetchColors } from '../../hooks/ColorsHooks';
import { useFetchPaymentMethods } from '../../hooks/PaymentMethodsHooks';
import { useFetchRanges } from '../../hooks/RangesHooks';
import { useFetchStates } from '../../hooks/StatesHooks';
import { Contracts } from '../../types/contracts';
import { useFetchPeople } from '../../hooks/PeopeHooks';
const ContractsList = () => {
  const nav = useNavigate();
  const { data: dataContracts, status:statusContracts, isSuccess:isSuccessContracts } = useFetchContracts();
  const {data: dataRanges/*, status:statusRanges,isSuccess:isSuccessRanges*/} = useFetchRanges();
  const {data: dataStates/*, status:statusStates,isSuccess:isSuccessStates*/} = useFetchStates();
  const {data: dataProducts/*, status:statusProducs,isSuccess:isSuccessProducts*/} = useFetchProducts();
  const {data: dataPeople/*, status:statusPeople,isSuccess:isSuccessPeople*/} = useFetchPeople();
   const {data: dataPhones/*, status:statusPhones,isSuccess:isSuccessPhones*/} = useFetchPhones();
   const {data: dataBrands/*, status:statusBrands,isSuccess:isSuccessBrands*/} = useFetchBrands();
   const {data: dataModels/*, status:statusModels,isSuccess:isSuccessModels*/} = useFetchModels();
   const {data: dataColors/*, status:statusColors,isSuccess:isSuccessColors*/} = useFetchColors();
   const {data: dataPaymentMethods/*, status:statusPaymentMethods,isSuccess:isPaymentMethods*/} = useFetchPaymentMethods();

   const getPhonesByPersonId =(id: any)=>{
    const phones: string[] = [];
    dataPhones?.forEach((element: { personId: any; number: string; }) => {
        if(element.personId == id){
            phones.push(element.number+ '\n');
        }
    }); 
    return phones;
  }
    const getPerson=(id:any)=>{
        const entity: string[] = [];
        dataPeople?.forEach((element: { id: any; name: string; }) => {
            if(element.id == id){
                entity.push(element.name);
            }
        }); 
        return entity;
    }
    const getProduct=(id:any)=>{
        const entity: string[] = [];
        dataProducts?.forEach((element: { id: any; name: string; }) => {
            if(element.id == id){
                entity.push(element.name);
            }
        }); 
        return entity;
    }
    const getBrand=(id:any)=>{
        const entity: string[] = [];
        dataBrands?.forEach((element: { id: any; name: string; }) => {
            if(element.id == id){
                entity.push(element.name);
            }
        }); 
        return entity;
    }
    const getColor=(id:any)=>{
        const entity: string[] = [];
        dataColors?.forEach((element: { id: any; name: string; }) => {
            if(element.id == id){
                entity.push(element.name);
            }
        }); 
        return entity;
    }
   
    const getModel=(id:any)=>{
        const entity: string[] = [];
        dataModels?.forEach((element: { id: any; name: string; }) => {
            if(element.id == id){
                entity.push(element.name);
            }
        }); 
        return entity;
    }

    const getPaymentMethod=(id:any)=>{
        const entity: string[] = [];
        dataPaymentMethods?.forEach((element: { id: any; name: string; }) => {
            if(element.id == id){
                entity.push(element.name);
            }
        }); 
        return entity;
    }
    const getRange=(id:any)=>{
        const entity: string[] = [];
        dataRanges?.forEach((element: { id: any; name: string; }) => {
            if(element.id == id){
                entity.push(element.name);
            }
        }); 
        return entity;
    }
    const getState=(id:any)=>{
        const entity: string[] = [];
        dataStates?.forEach((element: { id: any; name: string; }) => {
            if(element.id == id){
                entity.push(element.name);
            }
        }); 
        return entity;
    }
    const getChasis=(id:any)=>{
        const entity: string[] = [];
        dataProducts?.forEach((element: { id: any; chasis: string; }) => {
            if(element.id == id){
                entity.push(element.chasis);
            }
        }); 
        return entity;
    }
    const getCi=(id:any)=>{
        const entity: string[] = [];
        dataPeople?.forEach((element: { id: any; ci: string; }) => {
            if(element.id == id){
                entity.push(element.ci);
            }
        }); 
        return entity;
    }


   if (!isSuccessContracts) return <ApiStatus status={statusContracts}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Contractos
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Fecha de Venta</th>
              <th>Número Contrato</th>
              <th>Ci del Cliente</th>
              <th>Nombre del Cliente</th>
              <th>Celulares cliente</th>
              <th>Garante</th>
              <th>Celulares Garante</th>
              <th>Producto</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Motor</th>
              <th>Chasis</th>
              <th>En Promoción</th>
              <th>Total Cuota Inicial</th>
              <th>Cuota Total Efectiva</th>
              <th>Cuota Inicial Diferida</th>
              <th>Tiempo de Cuot Inicial Diferida</th>
              <th>Cantidad</th>
              <th>Plazo de Ventas a Crédito</th>
              <th>Precio Cobrado Emplacado</th>
              <th>Importe Total de Ventas</th>
              <th>Importe Neto</th>
              <th>Importe Base para Comisión</th>
              <th>Modalidad de Pago</th>
              <th>Estado</th>
              <th>Comisión</th>
              <th>Rango</th>
              <th>Auth y Obs</th>
            </tr>
          </thead>
            <tbody >
              {
                dataContracts.map((h: Contracts) => {
                  return(
                      <tr key={h.id} onClick={() => nav(`/contracts/${h.id}`)}>
                        <td>{h.saleDate.toString()}</td>
                        <td>{h.number}</td>
                        <td>{getCi(h.clientId)}</td>
                        <td>{getPerson(h.clientId)}</td>
                        <td>{getPhonesByPersonId(h.clientId)}</td>
                        <td>{h.garante}</td>
                        <td>{h.garantePhone}</td>
                        <td>{getProduct(h.productId)}</td>
                         <td>{getBrand(h.productId)}</td>
                         <td>{getModel(h.productId)}</td>
                         <td>{getColor(h.productId)}</td>
                        <td>motor</td>
                        <td>{getChasis(h.productId)}</td>
                        <td>{h.promocion}</td>
                        <td>{h.totalEffectivePayment}</td>
                        <td>{h.effectiveInitialPayment}</td>
                        <td>{h.deferredInitialPayment}</td>
                        <td>{h.deferredInitialPaymentTime}</td>
                        <td>{h.quantity}</td>
                        <td>{h.creditSalesTerm}</td>
                        <td>{h.statedPriceCharged}</td>
                        <td>{h.totalSalesAmount}</td>
                        <td>{h.netAmount}</td>
                        <td>{h.baseAmountForCommission}</td>
                        <td>{getPaymentMethod(h.paymentMethodId)}</td>
                        <td>{getState(h.stateId)}</td>
                        <td>{h.commission}</td>
                        <td>{getRange(h.rangeId)}</td>
                        <td>{h.authsAndObservations}</td>
                       
                      </tr>
                  )
                })} 
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to={`/contracts/add?modal=contracts` }>
        Agregar
      </Link>
    </div>
  );
};

export default ContractsList;
