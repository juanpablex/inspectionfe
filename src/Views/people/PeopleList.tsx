
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchPeople } from "../../hooks/PeopeHooks";
import { People } from "../../types/people";
import { useFetchPersonTypes } from '../../hooks/PersonTypesHooks';
import { PersonTypes } from '../../types/personTypes';
//import "./people.css";
//import { containerStyle } from '../config';

const PeopleList = () => {
  const nav = useNavigate();
  const { data: dataPeople, status:statusPeople, isSuccess:isSuccessPeople } = useFetchPeople();
  const {data: dataType} = useFetchPersonTypes();
  
  // const getDescriptions = async()=>{
  //   dataPeople.forEach(element => {
      
  //   });
  //   console.log("dataPeople: ",dataPeople);
  // }
// console.log("people: ",dataPeople);
// console.log("types: ",dataType);
   if (!isSuccessPeople) return <ApiStatus status={statusPeople}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Personas
        </h5>
      </div>
      <div /*style={containerStyle}*/>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Ci</th>
              <th>Nombre</th>
              <th>Tipo</th>
            </tr>
          </thead>
            <tbody >
              {
                dataPeople.map((h: People) => {
                  const description  = dataType?.find((t:PersonTypes)=>(h.personTypeId == t.id));
                  return(
                      <tr key={h.id} onClick={() => nav(`/people/${h.id}`)}>
                        <td>{h.ci}</td>
                        <td>{h.name}</td>
                        <td>{description?.name}</td>
                      </tr>
                  )
                })} 
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to={`/people/add?modal=people`}>
        Agregar
      </Link>
    </div>
  );
};

export default PeopleList;
