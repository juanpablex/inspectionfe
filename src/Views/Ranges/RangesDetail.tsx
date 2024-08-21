
import { Link, useParams } from "react-router-dom";
import {  useFetchRange,useDeleteRanges } from "../../hooks/RangesHooks";
import ApiStatus from "../../apiStatus";
import RangesList from "./RangesList";

const RangesDetail = () => {
  const { id} = useParams();

  const tableName="Ranges";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataRanges, status: statusRanges, isSuccess:isSuccessRanges } = useFetchRange(entityId);
  const deleteEntityMutation = useDeleteRanges();

  if (!isSuccessRanges) return <ApiStatus status={statusRanges} />;

  if (!dataRanges) return <div>Range not found.</div>;

  return (
    <div className="row">
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Marcas
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <RangesList/>
        </div>
       
      </div>
      <div className="col-6">
        <div className="row">
          <h3 className="col-12">{dataRanges.name}</h3>
        </div>
        <div className="row mt-3">
          <div className="col-2">
            <Link
              className="btn btn-primary w-100"
              to={`/ranges/edit/${dataRanges.id}`}
            >
              Editar
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                if (window.confirm("¿Estás seguro?"))
                deleteEntityMutation.mutate(dataRanges);
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

export default RangesDetail;
