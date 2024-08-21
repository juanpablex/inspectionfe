
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import  { containerStylePhone} from "../../config";
import { useFetchPhones } from "../../hooks/PhonesHooks";
import { Phones } from "../../types/phones";
import { useFetchPerson } from '../../hooks/PeopeHooks';

const PhonesList = (props:any) => {
  const nav = useNavigate();
  const { data: dataPeople, status:statusPeople, isSuccess:isSuccessPeople } = useFetchPerson(props.personId);
  const {data: dataPhones} = useFetchPhones();
  console.log("phones people: ",dataPeople);
  console.log("phones phones: ",dataPhones);
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
      <div className="row mb-2" >
        <h5 className="themeFontColor text-center">
            Números de teléfono de {dataPeople.name}
        </h5>
      </div>
      <div style={containerStylePhone}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Número</th>
            </tr>
          </thead>
            <tbody >
              {
                dataPhones?.map((h: Phones) => {
                 if(h.personId == dataPeople.id){
                    return(
                      <tr key={h.id} onClick={() => nav(`/phones/${h.id}`)}>
                        <td>{h.number}</td>
                      </tr>
                    )
                 }
               
                })} 
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to={`/phones/add?personId=${dataPeople.id}` }>
        Agregar
      </Link>
    </div>
  );
};

export default PhonesList;
