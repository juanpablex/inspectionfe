
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import  { containerStyle} from "../../config";
import { useFetchPeople } from "../../hooks/PeopeHooks";
import { People } from "../../types/people";
import { useFetchPersonTypes } from '../../hooks/PersonTypesHooks';

const PeopleList = () => {
  const nav = useNavigate();
  const { data: dataPeople, status:statusPeople, isSuccess:isSuccessPeople } = useFetchPeople();
  const {data: dataType/*, status:statusType,isSuccess:isSuccessType*/} = useFetchPersonTypes();
  // const getDescriptions = async()=>{
  //   dataPeople.forEach(element => {
      
  //   });
  //   console.log("dataPeople: ",dataPeople);
  // }
console.log("people: ",dataPeople);
console.log("types: ",dataType);
   if (!isSuccessPeople) return <ApiStatus status={statusPeople}></ApiStatus>;

  return (
    <div>
        <div style={containerStyle}>
            <table className="table table-hover">
            <thead>
            <tr>
                <th>Ci</th>
                <th>Nombre</th>
            </tr>
            </thead>
            <tbody>
            {
                dataPeople.map((h: People) => {
                return(<tr key={h.id} onClick={() => nav(`/people/${h.id}`)}>
                <td>{h.ci}</td>
                <td>{h.name}</td>
                </tr>)
                })} 
            </tbody>
        </table>
        </div>
        <Link className="btn btn-primary" to="/people/add">
        Agregar
      </Link>
    </div>
  );
};

export default PeopleList;
