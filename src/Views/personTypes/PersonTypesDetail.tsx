
import { Link, useParams } from "react-router-dom";
import {  useFetchPersonType,useDeletePersonTypes } from "../../hooks/PersonTypesHooks";
import ApiStatus from "../../apiStatus";
import PersonTypesShortList from "./PersonTypesShortList";
//import defaultImage from "./defaultPhoto";
//import { useFetchBids } from "../hooks/BidHooks";

const PersonTypesDetail = () => {
  const { id } = useParams();
  const tableName="Person Type";
  if (!id) throw Error(`${tableName} id not found`);
  const personTypesId = parseInt(id);

  const { data, status, isSuccess } = useFetchPersonType(personTypesId);
  console.log("detalles: ", data);
  const deletePersonTypesMutation = useDeletePersonTypes();

  if (!isSuccess) return <ApiStatus status={status} />;

  if (!data) return <div>Person Types not found.</div>;

  return (
    <div className="row">
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Tipos de Personas
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          {/* <img
            className="img-fluid"
            src={data.photo ? data.photo : defaultImage}
            alt="House pic"
          /> */}
          <PersonTypesShortList/>
        </div>
       
      </div>
      <div className="col-6">
        <div className="row mt-2">
          <h5 className="col-12">{data.name}</h5>
        </div>
        <div className="row">
          <h3 className="col-12">{data.description}</h3>
        </div>
        <div className="row mt-3">
          <div className="col-2">
            <Link
              className="btn btn-primary w-100"
              to={`/personTypes/edit/${data.id}`}
            >
              Editar
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                if (window.confirm("¿Estás seguro?"))
                  deletePersonTypesMutation.mutate(data);
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

export default PersonTypesDetail;
