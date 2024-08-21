
import { Link, useParams } from "react-router-dom";
import {  useFetchProduct,useDeleteProducts } from "../../hooks/ProductsHooks";
import { useFetchBrands } from '../../hooks/BrandsHooks';
import { useFetchColors } from '../../hooks/ColorsHooks';
import { useFetchModels } from '../../hooks/ModelsHooks';
import { Brands } from '../../types/brands';
import { Colors } from '../../types/colors';
import { Models } from '../../types/models';
import ApiStatus from "../../apiStatus";
import ProductsShortList from "./ProductsShortList";
import { containerStyleDetails} from "../../config";

const ProductsDetail = () => {
  const { id} = useParams();

  const tableName="Products";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataProducts, status: statusProducts, isSuccess:isSuccessProducts } = useFetchProduct(entityId);
  const {data: dataBrands/*, status:statusBrands,isSuccess:isSuccessBrands*/} = useFetchBrands();
  const {data: dataColors/*, status:statusColors,isSuccess:isSuccessColors*/} = useFetchColors();
  const {data: dataModels/*, status:statusModels,isSuccess:isSuccessModels*/} = useFetchModels();
  //console.log("detalles: ", data);
  const deleteEntityMutation = useDeleteProducts();

  if (!isSuccessProducts) return <ApiStatus status={statusProducts} />;

  if (!dataProducts) return <div>Product not found.</div>;

  return (
    <div className="row">
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Productos
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          {/* <img
            className="img-fluid"
            src={data.photo ? data.photo : defaultImage}
            alt="House pic"
          /> */}
          <ProductsShortList />
        </div>
       
      </div>
      <div className="col-6">
        <div className="col-6" style={containerStyleDetails}>
          <div className="row">
            <h4>Producto:</h4>
            <h3 className="col-12" style={{marginLeft:'30px'}}>{dataProducts.name}</h3>
          </div>
          <div className="row">
            <h4>Proveedor:</h4>
            <h3 className="col-12" style={{marginLeft:'30px'}}>{dataProducts.supplier}</h3>
          </div>
          <div className="row">
            <h4>Marca:</h4>
            <h3 className="col-12" style={{marginLeft:'30px'}}>{dataBrands?.find((t:Brands)=>(dataProducts.brandId == t.id))?.name}</h3>
          </div>
          <div className="row">
            <h4>Color:</h4>  
            <h3 className="col-12" style={{marginLeft:'30px'}}>{dataColors?.find((t:Colors)=>(dataProducts.colorId == t.id))?.name}</h3>
          </div>
          <div className="row">
            <h4>Modelo:</h4>
            <h3 className="col-12" style={{marginLeft:'30px'}}>{dataModels?.find((t:Models)=>(dataProducts.modelId == t.id))?.name}</h3>
          </div>
          <div className="row">
            <h4>Chasis:</h4>
            <h3 className="col-12" style={{marginLeft:'30px'}}>{dataProducts.chasis}</h3>
          </div>
        </div>
        
        <div className="row mt-3">
          <div className="col-2">
            <Link
              className="btn btn-primary w-100"
              to={`/products/edit/${dataProducts.id}`}
            >
              Editar
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                if (window.confirm("¿Estás seguro?"))
                deleteEntityMutation.mutate(dataProducts);
              }}
            >
              Borrar
            </button>
          </div>
        </div>
        {/* <Bids house={data} /> */}
      </div>
    </div>
  );
};

export default ProductsDetail;
