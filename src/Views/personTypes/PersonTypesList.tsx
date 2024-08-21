
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import  { containerStyle } from "../../config";
import { useFetchPersonTypes } from "../../hooks/PersonTypesHooks";
import { PersonTypes } from "../../types/personTypes";

const PersonTypesList = () => {
  const nav = useNavigate();
  const { data, status, isSuccess } = useFetchPersonTypes();
console.log("datos: ",data);
   if (!isSuccess) return <ApiStatus status={status}></ApiStatus>;
  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Tipos de Personas
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {data && Array.isArray(data) &&
              data.map((h: PersonTypes) => (
                <tr key={h.id} onClick={() => nav(`/personTypes/${h.id}`)}>
                  <td>{h.name}</td>
                  <td>{h.description}</td>
                </tr>
            

              ))} 
            
          </tbody>
      
        </table>
      </div>
      <Link className="btn btn-primary" to="/personTypes/add">
        Agregar
      </Link>
    </div>
  );
};

export default PersonTypesList;
