
import { Link, useParams } from "react-router-dom";
import {  useFetchBrand,useDeleteBrands } from "../../hooks/BrandsHooks";
import ApiStatus from "../../apiStatus";
import BrandsList from "./BrandsList";

const BrandsDetail = () => {
  const { id} = useParams();

  const tableName="Brands";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataBrands, status: statusBrands, isSuccess:isSuccessBrands } = useFetchBrand(entityId);
  const deleteEntityMutation = useDeleteBrands();

  if (!isSuccessBrands) return <ApiStatus status={statusBrands} />;

  if (!dataBrands) return <div>Brand not found.</div>;

  return (
    <div className="row">
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Marcas
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <BrandsList/>
        </div>
       
      </div>
      <div className="col-6">
        <div className="row">
          <h3 className="col-12">{dataBrands.name}</h3>
        </div>
        <div className="row mt-3">
          <div className="col-2">
            <Link
              className="btn btn-primary w-100"
              to={`/brands/edit/${dataBrands.id}`}
            >
              Editar
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                if (window.confirm("¿Estás seguro?"))
                deleteEntityMutation.mutate(dataBrands);
              }}
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsDetail;
