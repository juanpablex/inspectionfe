import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { useFetchColors } from "../../hooks/ColorsHooks";
import { Colors } from "../../types/colors";

const ColorsList = () => {
  const nav = useNavigate();
  const { data: dataColors, status:statusColors, isSuccess:isSuccessColors } = useFetchColors();

   if (!isSuccessColors) return <ApiStatus status={statusColors}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Colores
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
            {dataColors &&
            dataColors.map((h: Colors) => (
              <tr key={h.id} onClick={() => nav(`/colors/${h.id}`)}>
                <td>{h.name}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to="/colors/add">
        Agregar
      </Link>
    </div>
  );
};

export default ColorsList;
