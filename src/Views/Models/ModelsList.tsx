import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { useFetchModels } from "../../hooks/ModelsHooks";
import { Models } from "../../types/models";

const ModelsList = () => {
  const nav = useNavigate();
  const { data: dataModels, status:statusModels, isSuccess:isSuccessModels } = useFetchModels();

   if (!isSuccessModels) return <ApiStatus status={statusModels}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Modelos
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>
            <tbody >
            {dataModels &&
            dataModels.map((h: Models) => (
              <tr key={h.id} onClick={() => nav(`/models/${h.id}`)}>
                <td>{h.name}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to="/models/add">
        Agregar
      </Link>
    </div>
  );
};

export default ModelsList;
