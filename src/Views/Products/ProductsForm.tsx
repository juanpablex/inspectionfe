
//import toBase64 from "../toBase64";

import { Products } from '../../types/products';
import Select from "../../components/Select";
import { useState } from 'react';
import { useFetchBrands } from '../../hooks/BrandsHooks';
import { useFetchColors } from '../../hooks/ColorsHooks';
import { useFetchModels } from '../../hooks/ModelsHooks';
import { Brands } from '../../types/brands';
import { Colors } from '../../types/colors';
import { Models } from '../../types/models';
import BrandsModal from '../../modals/BrandsModal';
import ColorsModal from '../../modals/ColorsModal';
import ModelsModal from '../../modals/ModelsModal';


type Args = {
  entity: Products;
  submitted: (entity: Products) => void;
  parent: string | null;
};

const ProductsForm = ({ entity, submitted ,parent}: Args)=> {
  const [entityState, setEntityState] = useState({ ...entity });//product
  const {data: dataBrands} = useFetchBrands();
  const {data: dataColors} = useFetchColors();
  const {data: dataModels} = useFetchModels();
  const[getIdBrands]=useState<(item: Brands)=>number>(()=>(item: { id: number; })=>item.id);
  const[getIdColors]=useState<(item: Colors)=>number>(()=>(item: { id: number; })=>item.id);
  const[getIdModels]=useState<(item: Models)=>number>(()=>(item: { id: number; })=>item.id);
const [selectedBrandsValue,setSelectedBrandsValue]=useState<string | number | "">("");
const [selectedColorsValue,setSelectedColorsValue]=useState<string | number | "">("");
const [selectedModelsValue,setSelectedModelsValue]=useState<string | number | "">("");

const [showModalBrand, setShowModalBrand]=useState<boolean>(false);
const toggleModalBrand=(): void=>{
  setShowModalBrand(!showModalBrand);
  //console.log("modal",showModalBrand);
}

const [showModalColor, setShowModalColor]=useState<boolean>(false);
const toggleModalColor=(): void=>{  
  setShowModalColor(!showModalColor);
 // console.log("showModalColor ",showModalColor);
}

const [showModalModel, setShowModalModel]=useState<boolean>(false);
const toggleModalModel=(): void=>{
  setShowModalModel(!showModalModel);
  //console.log("modal",showModalModel);
}

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    entityState.modal=parent;
    submitted(entityState);
   // console.log("state: ", entityState);
  };

const handleChangeBrands=(value: any)=>{
  const parsedValue = value ? value: "";
  setSelectedBrandsValue(parsedValue);
  const id = parsedValue;
  setEntityState({...entityState,brandId:id});
  //console.log("entityState: ",entityState);
}
const handleChangeColors=(value: any)=>{
    const parsedValue = value ? value: "";
    setSelectedColorsValue(parsedValue);
    const id = parsedValue;
    setEntityState({...entityState,colorId:id});
   //console.log("entityState: ",entityState);
  }
  const handleChangeModels=(value: any)=>{
    const parsedValue = value ? value: "";
    setSelectedModelsValue(parsedValue);
    const id = parsedValue;
    setEntityState({...entityState,modelId:id});
  //  console.log("entityState: ",entityState);
  }

  return (
    <div className="mt-2">
      <div className="form-group">
        <label htmlFor="address">Nombre</label>
        {entityState!=null?
         <input
         type="text"
         className="form-control"
         placeholder="Nombre"
         value={entityState.name}
         onChange={(e) =>
            setEntityState({ ...entityState, name: e.target.value })
         }
       />
        :
        null}
       
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Proveedor</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Proveedor"
         value={entityState.supplier}
         onChange={(e) =>
            setEntityState({ ...entityState, supplier: e.target.value })
         }
       />
        : 
        null}
      </div>
      <div className="form-group mt-2">
      <label htmlFor="country">Marca</label>
      <div style={{display:'flex',flexDirection:'row'}}>
          <Select
            data={dataBrands}
            value={selectedBrandsValue}
            optionLabel={new Array("name")}
            onChange={handleChangeBrands}
            getId={getIdBrands}
          />     
           <button style={{marginLeft:'10px'}}
              type = "button"
            className="btn btn-primary mt-2"
            onClick={toggleModalBrand}
            > Nueva Marca
            </button> 
      </div>
        </div>   
        <div className="form-group mt-2">
      <label htmlFor="country">Color</label>
      <div style={{display:'flex',flexDirection:'row'}}>
      <Select
            data={dataColors}
            value={selectedColorsValue}
            optionLabel={new Array("name")}
            onChange={handleChangeColors}
            getId={getIdColors}
          />      
           <button style={{marginLeft:'10px'}}
              type = "button"
            className="btn btn-primary mt-2"
            onClick={toggleModalColor}
            > Nuevo Color
            </button>
      </div>
          
        </div>   
        <div className="form-group mt-2">
      <label htmlFor="country">Modelo</label>
      <div style={{display:'flex',flexDirection:'row'}}>
          <Select
            data={dataModels}
            value={selectedModelsValue}
            optionLabel={new Array("name")}
            onChange={handleChangeModels}
            getId={getIdModels}
          />    
           <button style={{marginLeft:'10px'}}
              type = "button"
            className="btn btn-primary mt-2"
            onClick={toggleModalModel}
            > Nuevo Modelo
            </button> 
        </div> 
        </div>   
        <div className="form-group mt-2">
        <label htmlFor="country">Chasis</label>
        {entityState!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Chasis"
         value={entityState.chasis}
         onChange={(e) =>
            setEntityState({ ...entityState, chasis: e.target.value })
         }
       />
        : 
        null}
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={!entityState.name}
        onClick={onSubmit}
      >
        Guardar
      </button>
      <BrandsModal open={showModalBrand} onClose={toggleModalBrand} parent={parent}>
                <div>
                    Main Content goes here!
                </div>
      </BrandsModal>
      <ColorsModal open={showModalColor} onClose={toggleModalColor} parent={parent}>
                <div>
                    Main Content goes here!
                </div>
      </ColorsModal>
      <ModelsModal open={showModalModel} onClose={toggleModalModel} parent={parent}>
                <div>
                    Main Content goes here!
                </div>
      </ModelsModal>

    </div>
  );
};

export default ProductsForm;
