
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import  { containerStyle} from "../../config";
import { useFetchProducts } from "../../hooks/ProductsHooks";
import { Products } from "../../types/products";
import { Brands } from '../../types/brands';
import { Colors } from '../../types/colors';
import { Models } from '../../types/models';
import { useFetchBrands } from '../../hooks/BrandsHooks';
import { useFetchColors } from '../../hooks/ColorsHooks';
import { useFetchModels } from '../../hooks/ModelsHooks';

const ProductsList = () => {
  const nav = useNavigate();
  const { data: dataProducts, status:statusProducts, isSuccess:isSuccessProducts } = useFetchProducts();
  const {data: dataBrands/*, status:statusBrand,isSuccess:isSuccessBrand*/} = useFetchBrands();
  const {data: dataColors/*, status:statusColors,isSuccess:isSuccessColors*/} = useFetchColors();
  const {data: dataModels/*, status:statusModels,isSuccess:isSuccessModels*/} = useFetchModels();
  

   if (!isSuccessProducts) return <ApiStatus status={statusProducts}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Productos
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Proveedor</th>
              <th>Marca</th>             
              <th>Color</th>
              <th>Modelo</th>
              <th>Chasis</th>
            </tr>
          </thead>
            <tbody >
              {
                dataProducts.map((h: Products) => {
                  const descBrand  = dataBrands?.find((t:Brands)=>(h.brandId == t.id));
                  const descColor  = dataColors?.find((t:Colors)=>(h.colorId == t.id));
                  const descModel  = dataModels?.find((t:Models)=>(h.modelId == t.id));
                  return(
                      <tr key={h.id} onClick={() => nav(`/products/${h.id}`)}>
                        <td>{h.name}</td>
                        <td>{h.supplier}</td>
                        <td>{descBrand?.name}</td>
                        <td>{descColor?.name}</td>
                        <td>{descModel?.name}</td>
                        <td>{h.chasis}</td>
                      </tr>
                  )
                })} 
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to={`/products/add?modal=products` }>
        Agregar
      </Link>
    </div>
  );
};

export default ProductsList;
