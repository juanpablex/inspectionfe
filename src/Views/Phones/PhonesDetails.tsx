
import { Link, useParams } from "react-router-dom";
import {  useFetchPhone,useDeletePhones } from "../../hooks/PhonesHooks";
import ApiStatus from "../../apiStatus";
//import defaultImage from "./defaultPhoto";
//import { useFetchBids } from "../hooks/BidHooks";

const PhonesDetail = () => {
  const { id} = useParams();

  const tableName="Phones";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataPhones, status: statusPhones, isSuccess:isSuccessPhones } = useFetchPhone(entityId);
  console.log("phonesss: ", dataPhones);
  const deleteEntityMutation = useDeletePhones();

  if (!isSuccessPhones) return <ApiStatus status={statusPhones} />;

  if (!dataPhones) return <div>Phone not found.</div>;

  return (
    <div className="row">
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
            Número
        </h5>
      </div>
     
      <div className="col-6">
        <div className="row mt-2">
          <h5 className="col-12">{dataPhones.number}</h5>
        </div>
       
        <div className="row mt-3">
          <div className="col-2">
            <Link
              className="btn btn-primary w-100"
              to={`/phones/edit/${dataPhones.id}`}
            >
              Editar
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                if (window.confirm("¿Estás seguro?"))
                deleteEntityMutation.mutate(dataPhones);
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

export default PhonesDetail;
