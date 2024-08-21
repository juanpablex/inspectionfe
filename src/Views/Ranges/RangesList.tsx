import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { useFetchRanges } from "../../hooks/RangesHooks";
import { Ranges } from "../../types/ranges";

const RangesList = () => {
  const nav = useNavigate();
  const { data: dataRanges, status:statusRanges, isSuccess:isSuccessRanges } = useFetchRanges();

   if (!isSuccessRanges) return <ApiStatus status={statusRanges}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Rangos
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
            {dataRanges &&
            dataRanges.map((h: Ranges) => (
              <tr key={h.id} onClick={() => nav(`/ranges/${h.id}`)}>
                <td>{h.name}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to="/ranges/add">
        Agregar
      </Link>
    </div>
  );
};

export default RangesList;
