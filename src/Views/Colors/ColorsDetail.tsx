
import { Link, useParams } from "react-router-dom";
import {  useFetchColor,useDeleteColors } from "../../hooks/ColorsHooks";
import ApiStatus from "../../apiStatus";
import ColorsList from "./ColorsList";

const ColorsDetail = () => {
  const { id} = useParams();

  const tableName="Colors";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataColors, status: statusColors, isSuccess:isSuccessColors } = useFetchColor(entityId);
  const deleteEntityMutation = useDeleteColors();

  if (!isSuccessColors) return <ApiStatus status={statusColors} />;

  if (!dataColors) return <div>Color not found.</div>;

  return (
    <div className="row">
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Colores
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <ColorsList/>
        </div>
       
      </div>
      <div className="col-6">
        <div className="row">
          <h3 className="col-12">{dataColors.name}</h3>
        </div>
        <div className="row mt-3">
          <div className="col-2">
            <Link
              className="btn btn-primary w-100"
              to={`/models/edit/${dataColors.id}`}
            >
              Editar
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                if (window.confirm("¿Estás seguro?"))
                deleteEntityMutation.mutate(dataColors);
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

export default ColorsDetail;
