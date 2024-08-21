
import { Link, useParams } from "react-router-dom";
import {  useFetchModel,useDeleteModels } from "../../hooks/ModelsHooks";
import ApiStatus from "../../apiStatus";
import ModelsList from "./ModelsList";

const ModelsDetail = () => {
  const { id} = useParams();

  const tableName="Models";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataModels, status: statusModels, isSuccess:isSuccessModels } = useFetchModel(entityId);
  const deleteEntityMutation = useDeleteModels();

  if (!isSuccessModels) return <ApiStatus status={statusModels} />;

  if (!dataModels) return <div>Model not found.</div>;

  return (
    <div className="row">
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Modelos
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <ModelsList/>
        </div>
       
      </div>
      <div className="col-6">
        <div className="row">
          <h3 className="col-12">{dataModels.name}</h3>
        </div>
        <div className="row mt-3">
          <div className="col-2">
            <Link
              className="btn btn-primary w-100"
              to={`/models/edit/${dataModels.id}`}
            >
              Editar
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                if (window.confirm("¿Estás seguro?"))
                deleteEntityMutation.mutate(dataModels);
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

export default ModelsDetail;
