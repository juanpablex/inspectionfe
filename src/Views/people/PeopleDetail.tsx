
import { Link, useParams } from "react-router-dom";
import {  useFetchPerson,useDeletePeople } from "../../hooks/PeopeHooks";
import { useFetchPersonTypes } from '../../hooks/PersonTypesHooks';
import { PersonTypes } from '../../types/personTypes';
import ApiStatus from "../../apiStatus";
import PeopleShortList from "./PeopleShortList";
import PhonesList from "../Phones/PhonesList";
//import defaultImage from "./defaultPhoto";
//import { useFetchBids } from "../hooks/BidHooks";

const PeopleDetail = () => {
  const { id} = useParams();

  const tableName="People";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataPeople, status: statusPeople, isSuccess:isSuccessPeople } = useFetchPerson(entityId);
  const {data: dataType} = useFetchPersonTypes();
  //console.log("detalles: ", data);
  const deleteEntityMutation = useDeletePeople();

  if (!isSuccessPeople) return <ApiStatus status={statusPeople} />;

  if (!dataPeople) return <div>Person not found.</div>;

  return (
    <div className="row">
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Personas
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          {/* <img
            className="img-fluid"
            src={data.photo ? data.photo : defaultImage}
            alt="House pic"
          /> */}
          <PeopleShortList/>
        </div>
       
      </div>
      <div className="col-6">
        <div className="row mt-2">
          <h5 className="col-12">{dataPeople.ci}</h5>
        </div>
        <div className="row">
          <h3 className="col-12">{dataPeople.name}</h3>
        </div>
        <div className="row">
          <h3 className="col-12">{dataType?.find((t:PersonTypes)=>(dataPeople.personTypeId == t.id))?.name}</h3>
        </div>
        <div className="row mt-3">
          <div className="col-2">
            <Link
              className="btn btn-primary w-100"
              to={`/people/edit/${dataPeople.id}`}
            >
              Editar
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                if (window.confirm("¿Estás seguro?"))
                deleteEntityMutation.mutate(dataPeople);
              }}
            >
              Borrar
            </button>
          </div>
        </div>
        {/* <Bids house={data} /> */}
        {/* <Phones people={dataPeople} /> */}
        <PhonesList personId={dataPeople.id}/>
      </div>
    </div>
  );
};

export default PeopleDetail;
