
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { containerStyle} from "../../config";
import { useFetchProducts } from "../../hooks/ProductsHooks";
import { useFetchBrands } from "../../hooks/BrandsHooks";
import { useFetchColors } from "../../hooks/ColorsHooks";
import { useFetchModels } from "../../hooks/ModelsHooks";
import { Products } from "../../types/products";

const ProductsShortList = () => {
  const nav = useNavigate();
  const { data: dataProducts, status:statusProducts, isSuccess:isSuccessProducts } = useFetchProducts();
  const { data: dataBrands/*, status:statusBrands, isSuccess:isSuccessBrands*/ } = useFetchBrands();
  const { data: dataColors/*, status:statusColors, isSuccess:isSuccessColors*/ } = useFetchColors();
  const { data: dataModels/*, status:statusModels, isSuccess:isSuccessModels*/ } = useFetchModels();
  // const getDescriptions = async()=>{
  //   dataProducts.forEach(element => {
      
  //   });
  //   console.log("dataProducts: ",dataProducts);
  // }
 //console.log("products: ",dataProducts);
   if (!isSuccessProducts) return <ApiStatus status={statusProducts}></ApiStatus>;

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

  return (
    <div>
        <div style={containerStyle}>
            <table className="table table-hover">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Color</th>
                <th>Modelo</th>
                <th>Chasis</th>
            </tr>
            </thead>
            <tbody>
            {
                dataProducts.map((h: Products) => {
                return(
                 <tr key={h.id} onClick={() => nav(`/products/${h.id}`)}>
                <td>{h.name}</td>
                <td>{getBrands(h.id)}</td>
                <td>{getColors(h.id)}</td>
                <td>{getModels(h.id)}</td>
                <td>{h.chasis}</td>
                </tr>)
                })} 
            </tbody>
        </table>
        </div>
        <Link className="btn btn-primary" to="/products/add?modal=products">
        Agregar
      </Link>         
    </div>
  );
};

export default ProductsShortList;
